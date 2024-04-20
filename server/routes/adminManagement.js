import express from "express";
import { deleteAdmin,assignClient,getAssignClients,getAdmins, adminClientsStats } from "../controllers/adminManagement.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.delete("/admin", deleteAdmin);
router.patch("/clients-assign", assignClient);
router.get("/clients-assign", getAssignClients);
router.get("/admin-clients-stats", adminClientsStats);


export default router;
