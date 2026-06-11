import express from "express"
import { getAlerts } from "../controllers/alertsControllers.js"

const router = express()

router.get("/", getAlerts)

export default router