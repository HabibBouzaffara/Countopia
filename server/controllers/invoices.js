import User from "../models/user.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn } from "child_process";
import path from "path";
import csvtojson from "csvtojson";
import Invoice from "../models/invoice.js";
import mongoose from "mongoose";
export const getInvoices = async (req, res) => {
  try {
    const { _id } = req.query;
    const user = await User.findOne({ _id: _id });
    res.status(200).json(user.factures);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const receivePythonResult = async (req, res) => {
  try {
    const pythonFilePath = path.join(__dirname, "../python/invoice.py");
    const selectedCells = JSON.parse(req.body.selectedCells); // Parse selectedCells array
    const jsonResult = await sendToPythonScript(
      pythonFilePath,
      req.file.path,
      selectedCells
    );
    const responseData = JSON.parse(jsonResult);

    res.status(200).json({ responseData: responseData });
  } catch (err) {
    if (err.stderr) {
      // If there's a stderr message, return it as part of the response
      res.status(500).json({ message: err.stderr.toString() });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

const sendToPythonScript = (pythonFilePath, filePath, selectedCells) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      pythonFilePath,
      filePath,
      JSON.stringify(selectedCells),
    ]);

    let jsonResult = "";
    let stderr = ""; // Variable to capture stderr output

    pythonProcess.stdout.on("data", (data) => {
      jsonResult += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      stderr += data.toString(); // Append stderr output
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(jsonResult);
      } else {
        reject({ message: "Error executing Python script", stderr: stderr }); // Pass stderr as part of rejection
      }
    });
  });
};

export const uploadInvoice = async (req, res) => {
  await receivePythonResult(req, res);
};

export const convertToCsv = async (req, res) => {
  try {
    const convertCsvToJson = async () => {
      try {
        const response = await csvtojson().fromFile(req.file.path);
        return response;
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const responseData = await convertCsvToJson();
    // console.log(responseData);
    res.status(200).json({ responseData });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const uploadJournal = async (req, res) => {
  try {
    const { adminId, adminName } = req.query; // Access adminId from req.query
    const { journal } = req.body; // Access journal from req.body
    const invoice = new Invoice();

    // Function to add '_id' and 'assigned' field with default value to each item
    const addIdAndAssignedField = (itemData) => {
      const newItemData = { ...itemData, assigned: false };
      newItemData._id = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      return newItemData;
    };

    for (const itemData of journal) {
      const itemWithIdAndAssigned = addIdAndAssignedField(itemData); // Add '_id' and 'assigned' field to item
      invoice.items.push(itemWithIdAndAssigned); // Push modified item to items array
    }

    invoice.adminId = adminId;
    invoice.adminName = adminName;

    await invoice.save(); // Don't forget to save the invoice to the database

    res.status(200).json({ message: "Journal uploaded successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getJournal = async (req, res) => {
  try {
    const { userId, userRole } = req.query; // Access userId from req.query
    if (userRole === "superadmin") {
      const journals = await Invoice.find();
      res.status(200).json({ journals });
    } else if (userRole === "admin") {
      const journals = await Invoice.find({ adminId: userId });
      res.status(200).json({ journals });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const { journalId } = req.query;
    await Invoice.findByIdAndDelete(journalId);
    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const assignInvoices = async (req, res) => {
  try {
    const { invoices, clientId, invoiceId } = req.body;

    for (const invoice of invoices) {
      await User.findByIdAndUpdate(clientId, { $push: { factures: invoice } });
    }

    // Find the invoice with the given invoiceId
    const invoice = await Invoice.findById(invoiceId);
    // If invoice is found
    if (invoice) {
      // Collect IDs of matching items
      const matchingItemIds = [];
      for (const invoiceItem of invoice.items) {
        const matchingInvoice = invoices.find(
          (invoice) => invoice._id == invoiceItem._id
        );

        if (matchingInvoice) {
          matchingItemIds.push(invoiceItem._id);
        }
      }

      // Update the 'assigned' field of matching items
      for (const matchingItemId of matchingItemIds) {
        await Invoice.updateOne(
          { _id: invoiceId, "items._id": matchingItemId },
          { $set: { "items.$.assigned": true } }
        );
      }
    }

    res.status(200).json({ message: "Invoices assigned successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getClientJournal = async (req, res) => {
  try {
    const { clientId } = req.query;
    const client = await User.findOne({ _id: clientId });
    const journal = client.factures;
    res.status(200).json({ journal });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllJournal = async (req, res) => {
  try {
    const userRole = req.user.role; // Get the role from the token
    const userId = req.user.id; // Get the user ID from the token
    const allInvoices = [];
    if (userRole === "superadmin") {
      const journals = await Invoice.find();
      for (const journal of journals) {
        for (const item of journal.items) {
          allInvoices.push(item);
        }
      }
      res.status(200).json({ allInvoices });
    } else if (userRole === "admin") {
      // const journals = await Invoice.find({ adminId: userId });
      // console.log(journals);
      const journals = await Invoice.find();
      for (const journal of journals) {
        for (const item of journal.items) {
          allInvoices.push(item);
        }
      }
      res.status(200).json({ allInvoices });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
