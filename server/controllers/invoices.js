import User from "../models/user.js";
import Invoice from "../models/invoice.js";
import csvtojson from "csvtojson";

export const getInvoices = async (req, res) => {
  try {
    const { _id } = req.query;
    const user = await User.findOne({ _id: _id });
    res.status(200).json(user.factures);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const uploadInvoice = async (req, res) => {
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

    for (const item of responseData) {
      const newInvoice = new Invoice({
        client_id: item.client_id,
        date_facture: new Date(item.date_facture),
        Description: item.Description,
        nom_unite: item.nom_unite,
        nombre_unit: item.nombre_unit,
        prix_unit: item.prix_unit,
        total_unit: item.total_unit,
        total_net: parseFloat(item.total_net),
        taxe: parseFloat(item.taxe),
        total: parseFloat(item.total),
        num_facture: item.num_facture,
      });

      await newInvoice.save();
    }
    res.status(200).json({ responseData });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
