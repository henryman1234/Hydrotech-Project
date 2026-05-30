import mongoose from "mongoose";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { simulationsController } from "../controllers/SimulationsController.js";

const router = express.Router();

router.get("/", authMiddleware, simulationsController)

export default router;