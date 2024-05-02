import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  date_facture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nom_unite: String,
  nombre_unit: String,
  prix_unit: String,
  total_unit: String,
  total_net: {
    type: String, // Update type to String or whatever is appropriate
    default: "", // Use a default value if needed
  },
  taxe: {
    type: String, // Update type to String or whatever is appropriate
    default: "0", // Use a default value if needed
  },
  total: {
    type: String,
    required: true,
  },
  num_facture: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  assigned: {
    type: Boolean,
    default: false,
  },
});

const invoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  adminId: { type: mongoose.Types.ObjectId, ref: "User" },
  adminName: { type: String, default: "" },
  items: [invoiceItemSchema],
});
const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
