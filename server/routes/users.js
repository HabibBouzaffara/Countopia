import express from "express";
import {
  deleteUser,
  getUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyToken, deleteUser);


export default router;