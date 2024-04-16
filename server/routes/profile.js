import express from "express";
import {modifyProfile} from "../controllers/profile.js";

const router = express.Router();

router.patch("/profile", modifyProfile);

export default router;