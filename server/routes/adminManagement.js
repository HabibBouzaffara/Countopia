import express from "express";
import { assignClient,getAssignClients,getAdmins, adminClientsStats } from "../controllers/adminManagement.js";
import { deleteUser } from "../controllers/users.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.delete("/admin", deleteUser);
router.patch("/clients-assign", assignClient);
router.get("/clients-assign", getAssignClients);
router.get("/admin-clients-stats", adminClientsStats);


export default router;
