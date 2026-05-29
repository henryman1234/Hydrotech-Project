import Node from "../models/Node.js";


export const createNode = async function (req, res) {

    const  {name, type, baseDemand, elevation, latitude, longitude} = req.body

    if (!latitude || !longitude || !name || !elevation) {
        return res.status(300).json({message: "Veuillez fournir toutes les données"});
    }

    const newNode =  new Node({
        name,
        type,
        baseDemand,
        elevation,
        location: {
            type: "Point",
            coordinates: [latitude, longitude]
        }
    })

    const savedNode = await newNode.save();

    res.status(200).json({message: "Noeud crée avec succès!",  data: savedNode})


}


// Un controller Express ne peut pas etre utilisé comme une simple fonction de recuperation de donnees
export const findAllNodes = async  function (req, res) {
    const nodes =  await Node.find()
        .populate("pattern" , "patternName multipliers")
    res.status(200).json({message: "Tous les noeuds", data: nodes})
}


// Recuperer tous les noueds
export const getAllNodes = async function () {
    const nodes = await Node.find().lean()
        .populate("pattern", "patternName multipliers")
    return nodes
}

