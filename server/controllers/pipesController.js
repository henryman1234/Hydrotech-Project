import Pipe from "../models/Pipe.js"

export const createPipe = async function (req, res) {
    
    const newPipe = new Pipe(req.body)
    
    const savedPipe = await newPipe.save()

    res.status(201).json({message: "Conduite crée avec succès", data: savedPipe})
}

// Handler Express
export const getAllPipes = async function (req, res) {
    const pipes = await Pipe.find()
        .populate("startNode", "name location")
        .populate("endNode", "name location")

    res.status(200).json({message: "Tous les conduites", data: pipes})
}

// Recuperer uniquement
export const fetchPipes = async function () {
    const pipes = await Pipe.find().lean()
    return pipes
}