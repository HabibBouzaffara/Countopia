import express from "express";
import { deleteAdmin,assignClient,getClients,getAdmins } from "../controllers/adminManagement.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.delete("/admin", deleteAdmin);
router.patch("/clients-assign", assignClient);
router.get("/clients", getClients);


export default router;
