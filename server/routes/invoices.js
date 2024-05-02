import express from "express";
import { getInvoices } from "../controllers/invoices.js";

const router = express.Router();

router.get("/invoices", getInvoices);

export default router;