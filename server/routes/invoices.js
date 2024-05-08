import express from "express";
import {
  uploadJournal,
  getJournal,
  deleteJournal,
  assignInvoices,
  getClientJournal,
} from "../controllers/invoices.js";
import { getClients } from "../controllers/clientsManagement.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/uploadJournal", uploadJournal);
router.get("/getJournal", getJournal);
router.delete("/deleteJournal", deleteJournal);
router.patch("/clients-assign-invoices", assignInvoices);
router.get("/clientsToAssign", verifyToken, getClients);
router.get("/getClientJournal", getClientJournal);
export default router;
