import mongoose  from "mongoose"
import dotenv from "dotenv"
import dns from "node:dns";
dotenv.config();

export async function connectDB () {
    const uri = process.env.MONGO_URI

    if (!uri) {
        throw new Error("The are not a connection string");
    }

    try {
        dns.setServers(["8.8.8.8", "8.8.4.4"]);

        await mongoose.connect(uri?.trim(), {dbName: "hydrotech"})
        console.log("Connection to MongoDb succeed")
        
    } catch (err) {
        console.error("Connection to MongoDB failed", err)
        process.exit(1)
    }

}