import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/adminManagement.js";
import salesRoutes from "./routes/sales.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
// import {authRoutes,setLogoutRoutes,verificationRoutes} from "./routes/auth.js";
import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
import { login, register, setLogout, verifyEmail } from "./controllers/auth.js";
import User from "./models/user.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
import { users } from "./data/index.js";
import Client from "./models/client.js";
import Admin from "./models/admin.js";
import profileRoutes from "./routes/profile.js";
import { deletePicture, modifyProfile } from "./controllers/profile.js";
import { assignClient,getAdmins, getAssignClients, adminClientsStats} from "./controllers/adminManagement.js";

import clientAssignRoutes from "./routes/adminManagement.js";
import {approveClient, getAdminNames, getClients, updateService} from "./controllers/clientsManagement.js";
import clientsRoutes from "./routes/clientsManagement.js";
import { deleteUser } from "./controllers/users.js";


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
app.post("/auth/login", login);
app.post("/verify-email", verifyEmail);
app.post("/setLogout", setLogout);

app.patch("/profile",upload.single("picture"), modifyProfile);
app.patch("/delete-picture",deletePicture);

app.get("/admins", getAdmins);
app.delete("/admin", deleteUser);
app.get("/admin-clients-stats",adminClientsStats);
app.patch("/clients-assign", assignClient);
app.get("/clients-assign",getAssignClients);

app.get("/clients",getClients);
app.post("/adminName",getAdminNames);
app.patch("/clients", approveClient);
app.delete("/clients", deleteUser);
app.patch("/service",updateService)


/* Routes */
app.use("/management", managementRoutes);
app.use("/users", userRoutes);
// app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);
// app.use("/sales", salesRoutes);
// app.use("/auth", authRoutes);
// app.use("/verify-email", verificationRoutes);
// app.use("/setLogout", setLogoutRoutes);
// app.use("/admins", adminsRoutes);
// app.use("/profile", profileRoutes);
// app.use("/delete-picture", picRoutes);
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
  .then(async() => {
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
