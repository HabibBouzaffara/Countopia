import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import axios from "axios";
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
import http from "http";
import { Server } from "socket.io";
import Conversation from "./models/conversation.js";
import { getConversation } from "./controllers/conversation.js";

/* Config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow any origin, adjust this for production
    methods: ["GET", "POST"],
  },
});

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
app.patch("/unAssignInvoices", journalRoutes);

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
app.post("/simulate", authRoutes);
app.post("/endSimulate", authRoutes);

//profile management
app.patch("/profile", storeImage.single("picture"), modifyProfile);
app.patch("/profile/delete-picture", profileRoutes);

//admin management
app.get("/admins", adminsRoutes);
app.delete("/admin", adminsRoutes);
app.get("/admin-clients-stats", adminsRoutes);
app.patch("/clients-assign", adminsRoutes);
app.get("/clients-assign", adminsRoutes);
app.patch("/incrementExportCount", adminsRoutes);

app.use("/users", userRoutes);
app.use("/admin", adminsRoutes);

app.get("/getAllJournal", journalRoutes);

// New endpoint to communicate with Flask service
app.post("/processCsv", storeInvoice.single("file"), async (req, res) => {
  try {
    const response = await axios.post(`${process.env.FLASK_URL}/processCsv`, {
      csv_file_name: req.file.filename,
      selected_cells: JSON.parse(req.body.selectedCells),
    });
    const fixing = response.data[0];
    const fixed = fixing["category"];
    delete fixing["category"];
    fixing["category"] = fixed;
    console.log(fixing);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error processing CSV file");
  }
});

// New endpoint to communicate with socket io service
app.get("/getConversation", getConversation);
app.post("/send-message", async (req, res) => {
  const { client_id, admin_id, sender_id, message } = req.body;
  try {
    let conversation = await Conversation.findOne({ client_id, admin_id });

    if (!conversation) {
      conversation = new Conversation({ client_id, admin_id, messages: [] });
    }
    const newMessage = { sender_id, message, time_sent: new Date() };
    conversation.messages.push(newMessage);
    await conversation.save();
    // Emit the new message to the involved users
    io.to(client_id).to(admin_id).emit("newMessage", newMessage);

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.io connection handling
io.on("connection", (socket) => {
  // Join rooms based on client_id and admin_id
  socket.on("joinRoom", ({ client_id, admin_id }) => {
    socket.join(client_id);
    socket.join(admin_id);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`)); // Change app.listen to server.listen
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
