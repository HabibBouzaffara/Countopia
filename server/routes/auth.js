import express from "express";
import { login,verifyEmail,setLogout } from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/verify-email", verifyEmail );
router.post("/setLogout", setLogout);

export default router;
