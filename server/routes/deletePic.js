import express from "express";
import { deletePicture } from "../controllers/profile.js";


const router = express.Router();

router.patch("/delete-picture", deletePicture);

export default router;
