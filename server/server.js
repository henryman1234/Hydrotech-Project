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
dotenv.config()

const app = express()
const httpServer = http.createServer(app)

const allowedOrigins = [
    "http://localhost:5173",
    "https://hydrotech-rouge.vercel.app"
]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Origine non-authorisé"), false)
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
app.use("/api/auth", authRouter )
app.use("/api/patterns", patternRouter)
app.use("/api/nodes", nodesRouter)
app.use("/api/pipes", pipesRouter);
app.use("/api/monitoring", monitoringRouter);  
app.use("/api/simulations", simulationsRouter);

// Handle Errors
app.use(function (err, req, res, next) {
    const message = err.message || "Une érrue est survenue!"
    const status = err.status || 500

    return res.sjson({
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
    // await initSimulator();

    // Launch the server
    httpServer.listen(port, function(){
        console.log(`Server is running on port ${port}`)
    })

    
} catch (error) {
    console.error("The server failed to start", error)
    process.exit(1)
}
