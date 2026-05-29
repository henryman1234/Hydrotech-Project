import mongoose from "mongoose";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPipe, getAllPipes } from "../controllers/pipesController.js";

const router =  express.Router();

router.post("/", authMiddleware, createPipe)
router.get("/",  authMiddleware, getAllPipes)


export default router