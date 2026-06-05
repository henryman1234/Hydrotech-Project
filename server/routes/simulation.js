import mongoose from "mongoose";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { simulations } from "../controllers/simulationsController.js";

const router = express.Router();

router.get("/", authMiddleware, simulations)

export default router;