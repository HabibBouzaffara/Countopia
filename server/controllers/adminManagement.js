import Admin from "../models/admin.js";
import User from "../models/user.js";

export const deleteAdmin = async (req, res) => {
  try {
    const { _id } = req.body;
    const admin = await User.findById(_id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    await User.findByIdAndDelete(_id);
    await Admin.findOneAndDelete({ adminId: _id });
    return res.status(200).json({ msg: "Admin deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const { adminId } = req.query;
    const admin = await Admin.findOne({ adminId: adminId }).populate('clients'); // Populate the 'clients' field
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const allClients = await User.find({ role: "client" });

    res.status(200).json({ admin: admin, client:allClients });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const assignClient = async (req, res) => {
    console.log(req.body);
    try {
      const { adminId, clientsId } = req.body;
      // console.log(adminId, clientsId);
      const admin = await Admin.findOneAndUpdate(
        { adminId: adminId },
        { $set: { clients: { $each: clientsId }} },
        { new: true }
      );

      res.status(200).json({ msg: "Client assigned successfully"  });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
