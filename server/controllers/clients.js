import User from "../models/user.js";
export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" });
    res.status(200).json(clients);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
