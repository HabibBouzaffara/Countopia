import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  profitAndExpenses,
  revenueRate,
  bestSeller,
} from "../controllers/stats.js";

const router = express.Router();

router.get("/profitAndExpenses", verifyToken, profitAndExpenses);
router.get("/revenueRate", verifyToken, revenueRate);
router.get("/bestSeller", verifyToken, bestSeller);


export default router;
