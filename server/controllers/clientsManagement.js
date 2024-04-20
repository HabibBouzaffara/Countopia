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
    const clients = await User.find({ role: "client" });
    res.status(200).json(clients);
  } catch (err) {
    res.status(404).json({ message: err.message });
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

export const deleteClient = async (req, res) => {
  try {
    const { _id } = req.body;
    await User.findByIdAndDelete(_id);
    res.status(200).json({ msg: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}