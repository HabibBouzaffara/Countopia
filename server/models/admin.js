import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    adminId:{type:mongoose.Types.ObjectId, ref: "User" },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  },
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;