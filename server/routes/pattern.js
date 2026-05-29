import mongoose from "mongoose"
import express from "express"
import { createPattern, getAllPatterns } from "../controllers/patternsController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get("/", getAllPatterns);
router.post("/", authMiddleware, createPattern)

export default router