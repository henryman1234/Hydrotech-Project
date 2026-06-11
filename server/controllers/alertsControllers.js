import mongoose from "mongoose";
import { fetchPipes } from "./pipesController.js";
import { getAllNodes } from "./nodesController.js";
import { runSimulations } from "../utils/hydraulicService.js";
import { detectNegativePressures } from "../utils/detectNegativePressures.js";
import { detectLowPressures } from "../utils/detectLowPressures.js";
import { detectLowVelocity } from "../utils/detectLowVelocity.js";
import { detectGreatVelocity } from "../utils/detectGreatVelocity.js";
import { detectGreatPressures } from "../utils/detectGreatPressures.js";


export const getAlerts = async function (req, res) {
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

        // Pressions éléves
        const greatPressure = await detectGreatPressures(nodesArray)

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
            hour: requestedHour,
            data: snapshot,
            warnings: {
                hasIssue: negativePressures.length > 0 || lowPressures.length > 0 || lowVelocity.length > 0  || greatVelocity.length > 0,
                
                pressures: {
                    negative: negativePressures,
                    low: lowPressures,
                    great: greatPressure
                },

                velocities: {
                    low: lowVelocity,
                    great: greatVelocity
                }

            }
        });

    } catch (error) {
        console.error("Erreur dans testController:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des résultats." });
    }
}