import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const modifyProfile = async (req, res) => {
  try {
    const {
      _id,
      oldPassword,
      newPassword,
      name,
      email,
      location,
      phoneNumber,
      picturePath,
    } = req.body;
    if ((oldPassword && !newPassword) || (!oldPassword && newPassword))
      return res.status(400).json({
        msg: "Both old and new password are required to reset the password",
      });
    if (
      !name &&
      !email &&
      !location &&
      !phoneNumber &&
      !oldPassword &&
      !newPassword &&
      !picturePath
    )
      return res.status(400).json({ msg: "Nothing to update !" });
    const user = await User.findOne({ _id });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Password section
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      // Hash the new password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      // Update user's password in the database
      await User.updateOne({ _id }, { password: hashedPassword });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        msg: "Password updated successfully",
        user: user,
        token: token,
      });
    }

    // Update user fields
    if (name) {
      user.name = name;
      await user.save();
    }
    if (email) {
      user.email = email;
      await user.save();
    }
    if (location) {
      user.location = location;
      await user.save();
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
      await user.save();
    }
    if (picturePath) {
      user.picturePath = picturePath;
      await user.save();
    }

    // Save the updated user

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send back the updated user object in the response
    return res
      .status(200)
      .json({ msg: "Profile updated successfully", user, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deletePicture = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });

    if (!user) return res.status(400).json({ msg: "User not found" });
    user.picturePath = "default.png";
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ msg: "Profile picture deleted successfully", user, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
