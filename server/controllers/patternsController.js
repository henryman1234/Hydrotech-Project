import express from "express"
import Pattern from "../models/Pattern.js"

export const getAllPatterns = async function (req, res) {
    const patterns = await Pattern.find();
    res.status(200).json({message: "Tous les patterns", data: patterns})
}

export const createPattern = async function (req, res) {
    const {patternName, multipliers} = req.body;
    const newPattern = new Pattern({
        patternName,
        multipliers
    })

    const savedPattern = await newPattern.save();
    res.status(201).json({message: "Pattern crée avec succeès", data
        :savedPattern
    })
}


export const findAllPatterns = async function () {
    const patterns = await Pattern.find().lean()
    return patterns;
}