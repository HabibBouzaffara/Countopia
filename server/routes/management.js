import express from "express";
import { deleteAdmin } from "../controllers/management.js";

const router = express.Router();

router.delete("/admin", deleteAdmin);

export default router;
