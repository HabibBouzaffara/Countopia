import express from "express";
import { login,verifyEmail,setLogout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/verify-email", verifyEmail );
router.post("/setLogout", setLogout);

export default router;
