import mongoose from "mongoose";
import { fetchPipes } from "./pipesController.js";
import { getAllNodes } from "./nodesController.js";
import { runSimulations } from "../utils/hydraulicService.js";
import { detectNegativePressures } from "../utils/detectNegativePressures.js";
import { detectLowPressures } from "../utils/detectLowPressures.js";
import { detectLowVelocity } from "../utils/detectLowVelocity.js";
import { detectGreatVelocity } from "../utils/detectGreatVelocity.js";

export const totalNetworkLenght =  async (req, res) => {
    try {
        const pipes = await fetchPipes();
        let sum = 0

        const result = pipes.reduce((sum, pipe)=> {
            return sum += Number(pipe.length);
        }, sum)

        res.status(200).json({
            status: "success",
            totalLenght: result,
            totalLenghtKilo: Number((result / 1000).toFixed(2))
        })
        
    } catch (error) {
        console.log("Failed to compute the lenght of the Network: " , error);
        throw new Error("Something went wrong")
    }
}

// Vitesse la plus pétite
export const getVelocity = async function (req, res) {
    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getHours();

        // 2. Lecture des données depuis MongoDB
        const nodes = await getAllNodes();
        const pipes = await fetchPipes();

        // console.log(pipes)

        // 3. Lancement de la simulation complète
        const simulationData = await runSimulations(nodes, pipes);

        // 4. Filtrage : On cherche le snapshot qui correspond à l'heure demandée
        const snapshot = simulationData.data.times.find(
            (t) => Math.floor(t["Heure"]) === requestedHour
        );
        
        const nodesArray = Object.entries(snapshot.nodes).map(function([_id, data]) {
            return {
                ...data,
                _id
            }
        })

        const pipesArray = Object.entries(snapshot.links).map(([_id, data]) => {
            return {
                ...data,
                _id
            }
        })


        // On recherche des noueds avec une pression négative
        const negativePressures = await detectNegativePressures(nodesArray)

        // On recherche les noueds avec une pressions négatives
        const lowPressures = await detectLowPressures(nodesArray)

        // Vitesses trop faibles
        const lowVelocity = await detectLowVelocity(pipesArray)

        // Vitesses trop grandes
        const greatVelocity = await detectGreatVelocity(pipesArray)


        if (!snapshot) {
            return res.status(404).json({
                success: false,
                message: `Aucune donnée de simulation disponible pour l'heure : ${requestedHour}h`,
                availableHours: simulationData.data.times.map(t => Math.floor(t["Heure"]))
            });
        }

        // 5. Retour du snapshot filtré
        res.status(200).json({
            success: true,
            title: "La plus pétite et grande vitesse",
            hour: requestedHour,
            data: snapshot,
        });

    } catch (error) {
        console.error("Erreur dans testController:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des résultats." });
    }
}


export const demandVsFlowController = async function (req, res) {
    try {

        const nodes = await getAllNodes();
        const pipes = await fetchPipes();

        const simulationData = await runSimulations(nodes, pipes);

        const results = simulationData.data.times.map((t) => {

            const nodesArray = Object.entries(t.nodes).map(([_id, data]) => ({
                ...data,
                _id
            }));

            // Demande totale
            const totalDemand = Object.values(t.nodes)
                .filter(n => Number(n.demand) > 0)
                .reduce((acc, n) => acc + Number(n.demand), 0);

            // Débit injecté (réservoir)
            const totalFlow = Math.abs(
                Object.values(t.nodes)
                    .filter(n => Number(n.demand) < 0)
                    .reduce((acc, n) => acc + Number(n.demand), 0)
            );

            return {
                heure: Math.floor(t["Heure"]),
                demandeTotale: totalDemand,
                DébitInjecté: totalFlow
            };
        });

        return res.status(200).json({
            success: true,
            data: results
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erreur calcul courbe demande vs débit"
        });
    }
};