import express from "express";
import { getClients } from "../controllers/clients.js";

const router = express.Router();

router.get("/clients", getClients);

export default router;