import User from "../models/user.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn } from "child_process";
import path from "path";
import csvtojson from "csvtojson";
import Invoice from "../models/invoice.js";
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

const sendToPythonScript = (pythonFilePath, filePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [pythonFilePath, filePath]);

    let jsonResult = "";
    let errorOccurred = false;

    pythonProcess.stdout.on("data", (data) => {
      jsonResult += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      errorOccurred = true;
    });

    pythonProcess.on("close", (code) => {
      if (!errorOccurred) {
        if (code === 0) {
          resolve(jsonResult);
        } else {
          reject(new Error("Error executing Python script"));
        }
      } else {
        reject(new Error("Error occurred while running Python script"));
      }
    });
  });
};

const receivePythonResult = async (req, res) => {
  try {
    const pythonFilePath = path.join(__dirname, "../python/invoice.py");
    const jsonResult = await sendToPythonScript(pythonFilePath, req.file.path);
    const responseData = JSON.parse(jsonResult);

    res.status(200).json({ responseData: responseData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
    for (const itemData of journal) {
      const year = parseInt(itemData.date_facture.substring(0, 4));
      const month = parseInt(itemData.date_facture.substring(5, 7)) - 1; // Month is 0-indexed in Date object
      const day = parseInt(itemData.date_facture.substring(8, 10));
      const date_facture = new Date(year, month, day);
      itemData.date_facture = date_facture;
      // console.log("strats" + itemData.date_facture);
      invoice.items.push(itemData);
      invoice.adminId = adminId;
      invoice.adminName = adminName;
    }

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
    // console.log(invoices, clientId);

    // Push invoices to the user's factures array
    await User.findByIdAndUpdate(clientId, { $push: { factures: invoices } });

    // Find the invoice with the given invoiceId
    const invoice = await Invoice.findById(invoiceId);
    // console.log("lguina l journal" + invoice.items);

    // If invoice is found
    if (invoice) {
      // Iterate over each item in the invoice's items array
      for (const item of invoice.items) {
        // Find the corresponding item in the invoices array
        const matchingInvoice = invoices.find(
          (invoice) => invoice._id == item._id
        );

        // If a matching item is found, set its assigned field to true
        if (matchingInvoice) {
          item.assigned = true;
        }
      }

      // Save the updated invoice
      await invoice.save();
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
