import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  revenueRate,
  bestSeller,
  salesAndPurchases,
  calculateTaxesAndExpenses,
  calculateMonthlyInvoices,
} from "../controllers/stats.js";

const router = express.Router();

// router.get("/profitAndExpenses", verifyToken, profitAndExpenses);
router.get("/revenueRate", verifyToken, revenueRate);
router.get("/bestSeller", verifyToken, bestSeller);
router.get("/salesAndPurchases", verifyToken, salesAndPurchases);
router.get(
  "/calculateTaxesAndExpenses",
  verifyToken,
  calculateTaxesAndExpenses
);
router.get("/calculateMonthlyInvoices", verifyToken, calculateMonthlyInvoices);

export default router;
