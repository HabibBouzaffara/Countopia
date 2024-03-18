import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
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
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
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
