import mongoose from "mongoose";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allSimulationsController, simulations } from "../controllers/simulationsController.js";

const router = express.Router();

router.get("/results", authMiddleware, simulations)
router.get("/", authMiddleware, allSimulationsController)

export default router;