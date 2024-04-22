import express from "express";
import { approveClient, getClients, getAdminNames, updateService } from "../controllers/clientsManagement.js";
import { deleteUser } from "../controllers/users.js";

const router = express.Router();


router.get("/clients", getClients);
// router.get("/clients", waitingClients);
router.post("/adminName", getAdminNames);
router.patch("/clients", approveClient);
router.delete("/clients", deleteUser);
router.patch("/service",updateService)

export default router;