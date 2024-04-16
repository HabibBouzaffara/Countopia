import express from "express";
import { setLogout } from "../controllers/auth.js";

const router = express.Router();

router.post("/setLogout", setLogout);

export default router;
