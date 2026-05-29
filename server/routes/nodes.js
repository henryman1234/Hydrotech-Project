import mongoose from "mongoose";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createNode, findAllNodes } from "../controllers/nodesController.js";

const router =  express.Router();

router.post("/", authMiddleware, createNode)
router.get("/", authMiddleware, findAllNodes)

export default router