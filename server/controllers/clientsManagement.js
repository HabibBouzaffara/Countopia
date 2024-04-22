import User from "../models/user.js";
import { generateActivationEmailHTML, mailTransport } from "../utils/mail.js";

export const getAdminNames = async (req, res) => {
  try {
    const { adminIds } = req.body;
    const admins = await User.find({ _id: { $in: adminIds } });
    const adminNames = admins.reduce((acc, admin) => {
      acc[admin._id] = admin.name;
      return acc;
    }, {});

    res.status(200).json(adminNames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getClients = async (req, res) => {
  try {
    const { role, userId } = req.query;

    if (role === "superadmin") {
      // For superadmin, return all users with role "client"
      const clients = await User.find({ role: "client" });
      res.status(200).json(clients);
    } else if (role === "admin") {
      // For admin, return clients associated with the admin user
      const adminUser = await User.findById(userId);
      if (!adminUser) {
        return res.status(404).json({ message: "Admin user not found" });
      }
      // Check if the admin user has clients
      if (!adminUser.clients || adminUser.clients.length === 0) {
        return res.status(200).json([]);
      }
      // Fetch the clients associated with the admin user
      const clients = await User.find({ _id: { $in: adminUser.clients } });
      res.status(200).json(clients);
    } else {
      res.status(400).json({ message: "Invalid role provided" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const waitingClients = async (req, res) => {
//   try {
//     const clients = await User.find({ role: "client", approved: false , status: true });
//     res.status(200).json(clients);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
  
// }

export const approveClient = async (req, res) => {
  try {
    const { _id } = req.body;
    const client = await User.findById({ _id: _id });
    await User.updateOne({ _id }, { $set: { approved: true } });
    
    mailTransport().sendMail({
      from: "countopia@countopia.com",
      to: client.email,
      subject: "Account Activation",
      html: generateActivationEmailHTML(client.name),
    })
    res.status(200).json({ msg: "Client approved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
}

export const updateService = async (req, res) => {
  try {
    const {_id, service } = req.body;
    await User.updateOne({ _id }, { $set: { service: service } });
    res.status(200).json({ msg: "Service updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}