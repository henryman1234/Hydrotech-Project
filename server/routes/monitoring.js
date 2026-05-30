import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { monitoringResultsController } from "../controllers/monitoringResults.js";
import { monitoringController } from "../controllers/monitoringController.js";


const router = express.Router();


router.get("/results", authMiddleware, monitoringResultsController)
router.get("/",  authMiddleware, monitoringController)

export default router