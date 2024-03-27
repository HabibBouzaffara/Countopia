import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Client from "../models/client.js";
import Admin from "../models/admin.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      name,
      companyName,
      codeFiscale,
      email,
      password,
      phoneNumber,
      picturePath,
      factures,
      clients,
      location,
      status,
      role,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      companyName,
      codeFiscale,
      email,
      password: passwordHash,
      phoneNumber,
      picturePath,
      factures,
      clients,
      location,
      status,
      role,
    });
    const savedUser = await newUser.save();

    if(savedUser.role=="client"){
      const newClient = new Client({
      clientId: savedUser._id, // Reference to the newly saved user
      companyName,
      codeFiscale,
      factures,
      });
      await newClient.save();
    }else if (savedUser.role=="admin"){
      const newAdmin = new Admin({
      adminId: savedUser._id, // Reference to the newly saved user
      clients,
    });
    await newAdmin.save();
    }
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};