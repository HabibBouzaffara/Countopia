import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    adminId:{type:mongoose.Types.ObjectId, ref: "User" },
    clients: Array,
  },
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;