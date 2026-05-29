import express from "express"
import { simulationsResultsController } from "../controllers/simulationsResults.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { simulationsController } from "../controllers/simulationsController.js";


const router = express.Router();


router.get("/results", authMiddleware, simulationsResultsController)
router.get("/",  authMiddleware, simulationsController)

export default router