import express from "express";
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import authRouter from "./routes/auth.js"
import dotenv from "dotenv"
import nodesRouter from "./routes/nodes.js"
import pipesRouter from "./routes/pipes.js"
import monitoringRouter from "./routes/monitoring.js"
import patternRouter from "./routes/pattern.js";
import simulationsRouter from "./routes/simulation.js";
import mainRouter from "./routes/main.js";
import alertsRouter from "./routes/alerts.js"
import diagnosticsRouter from "./routes/diagnostics.js"
import scenariosRouter from "./routes/scenarios.js"
dotenv.config()

const app = express()
const httpServer = http.createServer(app)

const allowedOrigins = [
    "http://localhost:5173",
    "https://hydrotech-livid.vercel.app"
]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(new Error("Origine non-authorisé"), false)
        }
    },
    methods: ["GET", "PUT", "DELETE", "PATCH", "POST"],
    optionSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}


//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


// Routes
app.use("/api/auth", authRouter)
app.use("/api/patterns", patternRouter)
app.use("/api/nodes", nodesRouter)
app.use("/api/pipes", pipesRouter);
app.use("/api/simulations", simulationsRouter);
app.use("/api/monitoring", monitoringRouter);  
app.use("/api/main", mainRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/diagnostics", diagnosticsRouter)
app.use("/api/scenarios", scenariosRouter)


// Handle Errors
app.use(function (err, req, res, next) {
    const message = err.message || "Une érrue est survenue!"
    const status = err.status || 500

    return res.json({
        status,
        message,
        stack: err.stack
    })

    next()
})

app.get("/",  function(req, res) {
    res.send("Ici, c'est la page d'accueil du serveur")
})


const port = process.env.PORT || 5000


try {
    await connectDB()

    // Launch the server
    httpServer.listen(port, function(){
        console.log(`Server is running on port ${port}`)
    })

    
} catch (error) {
    console.error("The server failed to start", error)
    process.exit(1)
}
