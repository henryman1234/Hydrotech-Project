import mongoose from "mongoose";
import User from "../models/User.js";
import { generateUniqueConnectCode } from "../utils/generateUniqueConnectCode.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export class AuthController  {

    static async register (req, res) {
        try {
            const {name, email, password} = req.body

            if (!name || !email || !password) {
                return res.status(400).json({message: "Tous les champs doivent etre remplies"})
            }
                
    
            if (password.length < 6) {
                res.status(400).json({message:"Le mot de passe est trop court!"})
            }

            const existingUser = await User.findOne({
                $or: [{name},{email}]
            })

            if (existingUser) {
                return res.status(400).json({message: "Cet utilisateur existe déjà!"})
            }
    
    
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new User({
                name,
                email,
                connectCode: await generateUniqueConnectCode(),
                password: hashedPassword
            })

            const savedUser = await newUser.save()
    
            res.status(200).json({message: "Compte crée avec succès", data: savedUser})

        } catch (error) {
            console.log("L'incription a échouée", error)
            res.status(500).json({message:"L'inscription a échouée"})
        }
    }


    static async login (req, res) {
        try {
            const {email, password} = req.body

            if (!email || !password){
                res.status(400).json({message:"Tous les champs sont obligatoires"})
            }

            const user =  await User.findOne({email: email})
            
            if (!user) {
                return res.status(404).json({message: "Désolé, cette utilisateur n'existe pas!"})
            }

            const isPasswordCorrect = await bcrypt.compare(password?.trim(), user.password)
            
            if (!isPasswordCorrect) {
                return res.status(404).json({message: "votre mot de passe ne correspond !"})
            }

            const token = jwt.sign({userId: user?._id}, process.env.JWT_SECRET, {
                expiresIn:  "7d"
            })

            res.cookie("access_token", token,  {
                maxAge:  7*24*60*60*1000,
                httpOnly: true,
                sameSite: "strict",
                secure:  process.env.NODE_ENV !== "development"
            })

            res.status(200).json({
                user: {
                    fullName:  user?.fullName,
                    email: user?.email,
                    connectCode: user?.connectCode,
                    name: user?.name,
                    id:  user?._id
                }
            })
            
        } catch (error) {
            console.log("La connexion a échouée", error)
            res.status(500).json({message: "La connexion a échouée"})
        }
    }

    static async me (req, res) {
        try {
            const user = await User.findById(req.user?._id).select("-password")
            console.log(user)

            res.status(200).json({
                user: {
                    name: user?.name,
                    email: user?.email,
                    connectCode: user?.connectCode,
                    fullName: user?.fullName,
                    id: user?._id
                }
            })

        } catch (error) {
            console.error("Une érreur est survenue", error)
            res.status(500).json({message: "une erreur est survenue!"})
        }
    }

    static async logout (req, res) {
        res.clearCookie("access_token")
        res.status(200).json({message: "Déconnecté avec succès !"})
    }
}