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



export const pressuresPieChart = async (req, res) => {
    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getHours();

        // Données du réseau
        const nodes = await getAllNodes();
        const pipes = await fetchPipes();

        // Simulation
        const simulationData = await runSimulations(nodes, pipes);

        // Snapshot de l'heure demandée
        const snapshot = simulationData.data.times.find(
                (t) => Math.floor(t.Heure) === requestedHour
            );

        if (!snapshot) {
            return res.status(404).json({
                success: false,
                message: "Snapshot introuvable"
            });
        }

        const nodesArray = Object.entries(snapshot.nodes)

            .map(([_id, data]) => ({
                ...data,
                _id
            }));

        // Détection des anomalies
        const negativePressures = await detectNegativePressures(nodesArray);

        const lowPressures = await detectLowPressures(nodesArray);

        const totalNodes = nodesArray.length;

        const negativeCount = negativePressures.length;

        const lowCount = lowPressures.length;

        const normalCount =
            totalNodes -
            negativeCount -
            lowCount;

        const conformityRate =
            totalNodes > 0
                ? Number(
                    (
                        (normalCount / totalNodes) *
                        100
                    ).toFixed(1)
                )
                : 0;

        return res.status(200).json({
            success: true,
            hour: requestedHour,

            summary: {
                totalNodes,
                normalCount,
                lowCount,
                negativeCount,
                conformityRate
            },

            chartData: [
                {
                    name: "Préssions normales",
                    value: Number((normalCount/totalNodes)*100) ,
                    color: "#10b981"
                },
                {
                    name: "Pression faible",
                    value: Number((lowCount/totalNodes)*100),
                    color: "#f59e0b"
                },
                {
                    name: "Pression négative",
                    value: Number((negativeCount/totalNodes)*100),
                    color: "#ef4444"
                }
            ]
        });

    } catch (error) {

        console.error(
            "Erreur pressureDistributionController :",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Erreur lors du calcul de la répartition des pressions"
        });
    }
};

export const pipesTable = async function (req, res) {

    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getHours();

        const nodes = await getAllNodes();
        const pipes = await fetchPipes();

        const simulationData = await runSimulations(nodes, pipes);

        const snapshot =
            simulationData.data.times.find(
                (t) =>
                    Math.floor(t.Heure) === requestedHour
            );

        if (!snapshot) {
            return res.status(404).json({
                success: false,
                message: "Snapshot introuvable"
            });
        }

        /**
         * Résultats hydrauliques des conduites
         */
        const pipesArray = Object.entries(snapshot.links
        ).map(([id, data]) => ({
            ...data,
            _id: id
        }));

        /**
         * Anomalies
         */
        const lowVelocity = await detectLowVelocity(pipesArray);

        const greatVelocity = await detectGreatVelocity(pipesArray);

        /**
         * Fusion des anomalies
         */
        const criticalPipes = [];

        for (const pipe of lowVelocity) {

            criticalPipes.push({
                ...pipe,
                issue: "LOW_VELOCITY"
            });

        }

        for (const pipe of greatVelocity) {

            criticalPipes.push({
                ...pipe,
                issue: "HIGH_VELOCITY"
            });

        }

        /**
         * Tri par gravité
         */
        criticalPipes.sort((a, b) => {

            if (a.issue === "HIGH_VELOCITY") {
                return b.velocity - a.velocity;
            }

            if (a.issue === "LOW_VELOCITY") {
                return a.velocity - b.velocity;
            }

            return 0;

        });

        return res.status(200).json({
            success: true,
            hour: requestedHour,
            count: criticalPipes.length,
            data: criticalPipes
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des conduites critiques"
        });

    }

};

export const FlowData = async function (req, res) {

    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getHours();

        const nodes = await getAllNodes();
        const pipes = await fetchPipes();

        const simulationData = await runSimulations(nodes, pipes);

        const snapshot =
            simulationData.data.times.find(
                (t) =>
                    Math.floor(t.Heure) === requestedHour
            );

        if (!snapshot) {
            return res.status(404).json({
                success: false,
                message: "Snapshot introuvable"
            });
        }

        /**
         * Résultats hydrauliques des conduites
         */
        const pipesArray = Object.entries(snapshot.links
        ).map(([id, data]) => ({
            ...data,
            _id: id
        }));

        
        const pipeArray = Object.entries(snapshot?.links).map(([_id, data]) => {
            return {
                ...data,
                _id,
            }
        })

        console.log("Tableau pour avoir les débits: ", pipeArray)


        /**
         * Tri par gravité
         */
        // pipeArray.sort((a, b) => {

        //     if (a.issue === "HIGH_VELOCITY") {
        //         return b.velocity - a.velocity;
        //     }

        //     if (a.issue === "LOW_VELOCITY") {
        //         return a.velocity - b.velocity;
        //     }

        //     return 0;

        // });

        return res.status(200).json({
            success: true,
            hour: requestedHour,
            data: pipeArray
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des conduites critiques"
        });

    }

};