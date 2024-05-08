import mongoose from "mongoose";
const invoiceItemSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  client_id: {
    type: String,
    required: true,
  },
  date_facture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nom_unite: String,
  nombre_unit: String,
  prix_unit: String,
  total_unit: String,
  total_net: {
    type: String, // Update type to String or whatever is appropriate
    default: "", // Use a default value if needed
  },
  taxe: {
    type: String, // Update type to String or whatever is appropriate
    default: "0", // Use a default value if needed
  },
  total: {
    type: String,
    required: true,
  },
  num_facture: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    companyName: {
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
      select: false,
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
    service: {
      type: String,
      enum: ["pending", "ongoing", "done"],
      default: "pending",
    },
    assigned: {
      type: Array,
      default: [],
    },
    factures: [Object],
    clients: Array,
    role: {
      type: String,
      enum: ["client", "admin", "superadmin"],
      default: "client",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
