import express from "express";
import {
  login,
  verifyEmail,
  setLogout,
  simulate,
  endSimulate,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/verify-email", verifyEmail);
router.post("/setLogout", setLogout);
router.post("/simulate", verifyToken, simulate);
router.post("/endSimulate", verifyToken, endSimulate);

export default router;
