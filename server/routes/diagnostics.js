import express from "express"
import { criticsAlerts, diagnosticsTable, greatVelocityAlert, lowPressuresAlert, lowVelocityAlert } from "../controllers/diagnosticsController.js";

const router = express.Router();

router.get("/critics-card", criticsAlerts)
router.get("/lowPressures-card", lowPressuresAlert)
router.get("/lowVelocity-card", lowVelocityAlert)
router.get("/greatVelocity-card", greatVelocityAlert)
router.get("/diagnostics-table", diagnosticsTable)

export default router