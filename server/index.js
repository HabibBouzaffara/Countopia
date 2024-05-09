import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";
import profileRoutes from "./routes/profile.js";
import { modifyProfile } from "./controllers/profile.js";
import clientsRoutes from "./routes/clients.js";
import {
  convertToCsv,
  getInvoices,
  uploadInvoice,
} from "./controllers/invoices.js";
import journalRoutes from "./routes/invoices.js";
import adminsRoutes from "./routes/admins.js";
import authRoutes from "./routes/auth.js";

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
const storeImage = multer({ storage: imageStorage });
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
app.get("/getClientJournal", journalRoutes);
app.post("/uploadJournal", journalRoutes);
app.get("/getJournal", journalRoutes);
app.delete("/deleteJournal", journalRoutes);
app.patch("/clients-assign-invoices", journalRoutes);
app.get("/clientsToAssign", journalRoutes);

//clients management
app.get("/clients", clientsRoutes);
app.post("/clients/adminName", clientsRoutes);
app.delete("/client-delete", clientsRoutes);
app.patch("/clients/update-service", clientsRoutes);
app.patch("/clients/approve", clientsRoutes);

// auth management
app.post("/auth/register", storeImage.single("picture"), register);
app.post("/auth/login", authRoutes);
app.post("/auth/verify-email", authRoutes);
app.post("/setLogout", authRoutes);

//profile management
app.patch("/profile", storeImage.single("picture"), modifyProfile);
app.patch("/profile/delete-picture", profileRoutes);

//admin management
app.get("/admins", adminsRoutes);
app.delete("/admin", adminsRoutes);
app.get("/admin-clients-stats", adminsRoutes);
app.patch("/clients-assign", adminsRoutes);
app.get("/clients-assign", adminsRoutes);

app.use("/users", userRoutes);
app.use("/admin", adminsRoutes);

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
