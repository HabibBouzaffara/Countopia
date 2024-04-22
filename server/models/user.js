import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    companyName:{ 
      type: String,
      min: 2,
      max: 20,
    },
    codeFiscale: {
      type: String,
      min: 4,
      max: 4,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    location: String,
    status: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    service : {
      type: String,
      enum: ["pending", "ongoing", "done"],
      default: "pending",
    },
    assigned: {
      type: Array,
      default: [],
    },
    factures: Array,
    clients: Array,
    role: {
      type: String,
      enum: ["client", "admin", "superadmin"],
      default:"client",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

