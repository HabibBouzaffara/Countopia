import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
// import Client from "../models/client.js";
import verificationToken from "../models/verificationToken.js";
import {
  generateOTP,
  generateVerificationEmailHTML,
  mailTransport,
  verifiedEmailHTML,
} from "../utils/mail.js";

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
      approved,
      assigned,
      service,
      role,
    } = req.body;

    const userCheck = await User.findOne({ email: email });
    if (userCheck) return res.status(400).json({ msg: "User already exists" });

    if (role === "client") {
      if (
        !name ||
        !companyName ||
        !codeFiscale ||
        !email ||
        !password ||
        !phoneNumber ||
        !location
      ) {
        return res.status(400).json({ msg: "All fields are required" });
      }
    } else if (role === "admin") {
      if (!name || !email || !password || !phoneNumber || !location) {
        return res.status(400).json({ msg: "All fields are required" });
      }
    }

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
      approved,
      assigned,
      service,
      role,
    });

    const savedUser = await newUser.save();

    // Add OTP generation and email verification here
    if (savedUser.role === "client") {
      // const newClient = new Client({
      //   clientId: savedUser._id, // Reference to the newly saved user
      //   companyName,
      //   codeFiscale,
      //   factures,
      // });
      const OTP = generateOTP();
      const newVerificationToken = new verificationToken({
        owner: savedUser._id, // Assuming you have a field to store user's ID in verificationToken
        token: OTP,
      });
      await newVerificationToken.save();

      // Send email with OTP
      mailTransport().sendMail({
        from: "countopia@countopia.com",
        to: savedUser.email,
        subject: "Account Verification",
        html: generateVerificationEmailHTML(savedUser.name, OTP),
      });
      // await newClient.save();
    }
    // else if (savedUser.role === "admin") {
    //   const newAdmin = new Admin({
    //     adminId: savedUser._id, // Reference to the newly saved user
    //     clients,
    //   });
    //   await newAdmin.save();
    // }

    // Generate OTP and save verification token

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    if (!user.status)
      return res.status(400).json({ msg: "User not verified. " });
    if (!user.approved)
      return res
        .status(400)
        .json({ msg: "User not approved. Wait for admin's approval . " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setLogout = async (req, res) => {
  try {
    const { _id } = req.body;
    await User.findByIdAndUpdate(_id, { refreshToken: "" });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({
        msg: "Invalid request, missing parameters!",
      });

    // if (!isValidObjectId(userId)) return res.status(400).json({
    //     msg: "Invalid user id!"
    // });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg: "User not found!",
      });
    if (user.status)
      return res.status(400).json({
        msg: "User already verified!",
      });
    const token = await verificationToken.findOne({
      owner: user._id,
    });
    if (!token)
      return res.status(400).json({
        msg: "Sorry, user not found!",
      });

    const isMatched = await (otp == token.token);
    if (!isMatched)
      return res.status(400).json({
        msg: "Invalid verification code!",
      });
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        status: true,
      }
    );
    res.status(200).json({
      msg: "Email verified successfully!",
    });
    user.status = true;
    mailTransport().sendMail({
      from: "countopia@countopia.com",
      to: user.email,
      subject: "Account Verification",
      html: verifiedEmailHTML(
        "Account Verification",
        "Your email has been verified successfully. Now you can log in."
      ),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const simulate = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg: "User not found!",
      });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    delete user.password;

    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const endSimulate = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ role: "superadmin" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    delete user.password;

    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
