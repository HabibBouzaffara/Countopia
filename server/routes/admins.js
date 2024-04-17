import express from "express";
import { getAdmins } from "../controllers/admins.js";

const router = express.Router();

router.get("/admins", getAdmins);

export default router;
