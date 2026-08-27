import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { scenarioController } from "../controllers/scenariosController.js";
import { scenarioResultsGETController, scenarioResultsPOSTController } from "../controllers/scenariosResults.js";

const router = express.Router();

router.get("/", authMiddleware, scenarioController);
router.post("/results", authMiddleware, scenarioResultsPOSTController)
router.get("/results", authMiddleware, scenarioResultsGETController)



export default router;