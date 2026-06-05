import express from "express"
import {demandVsFlowController, getVelocity, totalNetworkLenght } from "../controllers/mainController.js";

const router = express.Router();

router.get("/linear", totalNetworkLenght);
router.get("/get-details", getVelocity )
router.get("/demand-vs-flow", demandVsFlowController)


export default router