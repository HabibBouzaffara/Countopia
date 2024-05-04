import Admin from "../models/admin.js";
import User from "../models/user.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const adminClientsStats = async (req, res) => {
  try {
    const { _id } = req.query;
    const admin = await User.findById(_id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const clients = await User.find({ _id: { $in: admin.clients } });
    const activeClients = clients.filter(
      (client) => client.service === "ongoing"
    ).length;
    const pendingClients = clients.filter(
      (client) => client.service === "pending"
    ).length;
    const doneClients = clients.filter(
      (client) => client.service === "done"
    ).length;

    res.status(200).json({ activeClients, pendingClients, doneClients });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAssignClients = async (req, res) => {
  try {
    const { adminId } = req.query;
    const admin = await User.findOne({ _id: adminId }); // Populate the 'clients' field
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const allClients = await User.find({ role: "client", approved: true });

    res.status(200).json({ admin: admin, client: allClients });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const assignClient = async (req, res) => {
  // console.log(req.body);
  try {
    const { adminId, clientsId } = req.body;

    // Update the admin's clients attribute with the clientsId array
    await User.findByIdAndUpdate(
      adminId,
      { $set: { clients: clientsId.length > 0 ? clientsId : [] } },
      { new: true }
    );

    // Update the assigned array of the clientsId users
    await User.updateMany(
      { _id: { $in: clientsId }, assigned: { $ne: adminId } },
      { assigned: adminId }
    );

    // Remove adminId from the assigned array of clients not in clientsId
    await User.updateMany(
      { _id: { $nin: clientsId }, assigned: adminId },
      { $pull: { assigned: adminId } }
    );

    res.status(200).json({ msg: "Client assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
