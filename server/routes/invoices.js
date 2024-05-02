import express from "express";
import {
  uploadJournal,
  getJournal,
  deleteJournal,
  assignInvoices,
  getClientJournal,
} from "../controllers/invoices.js";
import { getClients } from "../controllers/clientsManagement.js";

const router = express.Router();

router.post("/uploadJournal", uploadJournal);
router.get("/getJournal", getJournal);
router.delete("/deleteJournal", deleteJournal);
router.patch("/clients-assign-invoices", assignInvoices);
router.get("/clientsToAssign", getClients);
router.get("/getClientJournal", getClientJournal);
export default router;
