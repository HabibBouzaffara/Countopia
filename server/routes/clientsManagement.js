import express from "express";
import { approveClient, deleteClient, getClients, getAdminNames } from "../controllers/clientsManagement.js";

const router = express.Router();


router.get("/clients", getClients);
// router.get("/clients", waitingClients);
router.post("/adminName", getAdminNames);
router.patch("/clients", approveClient);
router.delete("/clients", deleteClient);

export default router;