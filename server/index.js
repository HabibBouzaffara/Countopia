import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import managementRoutes from "./routes/adminManagement.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
import { login, register, setLogout, verifyEmail } from "./controllers/auth.js";
import User from "./models/user.js";
import { users } from "./data/index.js";
import Client from "./models/client.js";
import Admin from "./models/admin.js";
import profileRoutes from "./routes/profile.js";
import { deletePicture, modifyProfile } from "./controllers/profile.js";
import {
  assignClient,
  getAdmins,
  getAssignClients,
  adminClientsStats,
} from "./controllers/adminManagement.js";

import clientAssignRoutes from "./routes/adminManagement.js";
import {
  approveClient,
  getAdminNames,
  getClients,
  updateService,
} from "./controllers/clientsManagement.js";
import clientsRoutes from "./routes/clientsManagement.js";
import { deleteUser } from "./controllers/users.js";
import {
  assignInvoices,
  convertToCsv,
  deleteJournal,
  getClientJournal,
  getInvoices,
  getJournal,
  uploadInvoice,
  uploadJournal,
} from "./controllers/invoices.js";
import journalRoutes from "./routes/invoices.js";
import adminsRoutes from "./routes/adminManagement.js";

/* Config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/invoices", express.static(path.join(__dirname, "public/invoices")));

// Image STORAGE
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storeImage = multer({ imageStorage });
// Invoice STORAGE
const invoicesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/invoices");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storeInvoice = multer({ storage: invoicesStorage });
app.post("/uploadInvoices", storeInvoice.single("file"), uploadInvoice);
app.post("/convertToCsv", storeInvoice.single("file"), convertToCsv);

//invoices management
app.get("/invoices", getInvoices);

//Upload Journals
app.post("/uploadJournal", uploadJournal);
app.use("/uploadJournal", journalRoutes);

//Get Journals
app.get("/getJournal", getJournal);
app.use("/getJournal", journalRoutes);

//Delete Journals
app.delete("/deleteJournal", deleteJournal);
app.use("/deleteJournal", journalRoutes);

//assign invoices to clients
app.patch("/clients-assign-invoices", assignInvoices);
app.use("/clients-assign-invoices", journalRoutes);

//clients dialog to assign
app.get("/clientsToAssign", getClients);
app.use("/clientsToAssign", journalRoutes);

//get client journal
app.get("/getClientJournal", getClientJournal);
app.use("/getClientJournal", journalRoutes);

//clients management
app.get("/clients", getClients);
app.post("/adminName", getAdminNames);
app.delete("/clients", deleteUser);
app.patch("/service", updateService);
app.patch("/clients", approveClient);

// auth management
app.post("/auth/register", storeImage.single("picture"), register);
app.post("/auth/login", login);
app.post("/auth/verify-email", verifyEmail);
app.post("/setLogout", setLogout);

//profile management
app.patch("/profile", storeImage.single("picture"), modifyProfile);
app.patch("/profile/delete-picture", deletePicture);

//admin management
app.get("/admins", getAdmins);
app.delete("/admin", deleteUser);
app.get("/admin-clients-stats", adminClientsStats);
app.patch("/clients-assign", assignClient);
app.get("/clients-assign", getAssignClients);

// app.use("/management", managementRoutes);
// app.use("/users", userRoutes);
// app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);
// app.use("/sales", salesRoutes);
// app.use("/auth", authRoutes);
// app.use("/verify-email", verificationRoutes);
// app.use("/setLogout", setLogoutRoutes);
app.use("/admin", adminsRoutes);
// app.use("/profile", profileRoutes);
app.use("/profile/delete-picture", profileRoutes);
// app.use("/admin", deleteAdminRoutes);
app.use("/clients", clientsRoutes);
app.use("/adminName", clientsRoutes);
app.use("/service", clientsRoutes);
// app.use("/clients-assign", clientAssignRoutes);
// app.use("/admin-clients-stats", clientAssignRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME
    // User.insertMany(users);
    //Client.insertMany(clients);
    //Admin.insertMany(admins);
    // users.updateMany({ role: 'user' }, { role: 'client' });
    // await User.updateMany({ role: 'client' }, { approved: false });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
