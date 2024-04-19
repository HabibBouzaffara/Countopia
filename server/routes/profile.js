import express from "express";
import {modifyProfile,deletePicture} from "../controllers/profile.js";

const router = express.Router();

router.patch("/profile", modifyProfile);
router.patch("/delete-picture", deletePicture);

export default router;