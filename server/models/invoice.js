import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  date_facture: {
    type: Date,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  nom_unite: String,
  nombre_unit: String,
  prix_unit: String,
  total_unit: String,
  total_net: {
    type: Number,
    required: true,
  },
  taxe: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  num_facture: {
    type: String,
    required: true,
  },
});
const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
