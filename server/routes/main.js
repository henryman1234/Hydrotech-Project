import express from "express"
import {demandVsFlowController, FlowData, getVelocity, pipesTable, pressuresPieChart, totalNetworkLenght } from "../controllers/mainController.js";

const router = express.Router();

router.get("/linear", totalNetworkLenght);
router.get("/get-details", getVelocity )
router.get("/demand-vs-flow", demandVsFlowController)
router.get("/pressures-chart", pressuresPieChart)
router.get("/pipes-data", pipesTable)
router.get("/flow-data", FlowData)


export default router