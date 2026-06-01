import express from "express"
import {totalNetworkLenght } from "../controllers/mainController.js";

const router = express.Router();

router.get("/linear", totalNetworkLenght);
// router.get("/smallest-velo", getSmallestVelocity)

export default router