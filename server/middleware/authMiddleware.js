import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async function (req, res, next) {
    
    try {
        const token = req.cookies.access_token
        
        if (!token) {
            return res.status(404).json({message: "Désolé, vous n'etes pas authentifié !"})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decode?.userId).select("-password")

        next();
    } catch (err) {
        console.error("AuthMiddleware error", err)
        res.status(500).json({message: "L'authentification du middelware a échouée"})
    }
}