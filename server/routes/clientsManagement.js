import express from "express";
import {
  approveClient,
  getClients,
  getAdminNames,
  updateService,
} from "../controllers/clientsManagement.js";
import { deleteUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/clients", verifyToken, getClients);
router.post("/clients/adminName", verifyToken, getAdminNames);
router.patch("/clients/approve", verifyToken, approveClient);
router.delete("/client-delete", verifyToken, deleteUser);
router.patch("/clients/update-service", verifyToken, updateService);

export default router;
