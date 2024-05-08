import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  adminId: { type: mongoose.Types.ObjectId, ref: "User" },
  adminName: { type: String, default: "" },
  items: [Object],
});
const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
