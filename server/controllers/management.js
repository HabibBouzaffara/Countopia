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
