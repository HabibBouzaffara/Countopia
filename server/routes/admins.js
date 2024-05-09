import express from "express";
import {
  assignClient,
  getAssignClients,
  getAdmins,
  adminClientsStats,
} from "../controllers/admins.js";
import { deleteUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/admins", verifyToken, getAdmins);
router.delete("/admin", verifyToken, deleteUser);
router.patch("/clients-assign", verifyToken, assignClient);
router.get("/clients-assign", verifyToken, getAssignClients);
router.get("/admin-clients-stats", verifyToken, adminClientsStats);

export default router;
