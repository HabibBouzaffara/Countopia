import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
// import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
import { register, setLogout, verifyEmail } from "./controllers/auth.js";
import User from "./models/user.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
import { admins, clients, users } from "./data/index.js";
import Client from "./models/client.js";
import Admin from "./models/admin.js";
import verificationRoutes from "./routes/verification.js";
import profileRoutes from "./routes/profile.js";
import { modifyProfile } from "./controllers/profile.js";
import setLogoutRoutes from "./routes/logout.js";
import { getAdmins } from "./controllers/admins.js";
import adminsRoutes from "./routes/admins.js";

/* Config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/verify-email", verifyEmail);
app.patch("/profile", modifyProfile);
app.post("/setLogout", setLogout);
app.get("/admins", getAdmins);

/* Routes */
app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/verify-email", verificationRoutes);
app.use("/profile", profileRoutes);
app.use("/setLogout", setLogoutRoutes);
app.use("/admins", adminsRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME
    //User.insertMany(users);
    //Client.insertMany(clients);
    //Admin.insertMany(admins);
    //  users.updateMany({ role: 'user' }, { role: 'client' });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
