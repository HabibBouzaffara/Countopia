import express from "express";
import {
  uploadJournal,
  getJournal,
  deleteJournal,
  assignInvoices,
  getClientJournal,
  getAllJournal,
  unAssignInvoices,
} from "../controllers/invoices.js";
import { getClients } from "../controllers/clients.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/uploadJournal", uploadJournal);
router.get("/getJournal", getJournal);
router.delete("/deleteJournal", deleteJournal);
router.patch("/clients-assign-invoices", assignInvoices);
router.get("/clientsToAssign", verifyToken, getClients);
router.get("/getClientJournal", getClientJournal);
router.get("/getAllJournal", verifyToken, getAllJournal);
router.patch("/unAssignInvoices", verifyToken, unAssignInvoices);
export default router;
