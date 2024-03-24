import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    codeFiscale: {
      type: String,
      required: true,
      min: 2,
      max: 50,
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
    factures: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       min: 2,
//       max: 100,
//     },
//     email: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 5,
//     },
//     picturePath: {
//       type: String,
//       default: "",
//     },
//     codeFiscale: {
//       type: String,
//       required: true,
//       // min: 11,
//       // max: 11,
//     },
//     city: String,
//     state: String,
//     country: String,
//     phoneNumber: String,
//     factures: Array,
//     role: {
//       type: String,
//       enum: ["user", "admin", "superadmin"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);
// export default User;
