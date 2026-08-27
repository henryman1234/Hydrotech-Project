import { detectGreatVelocity } from "../utils/detectGreatVelocity.js";
import { detectLowPressures } from "../utils/detectLowPressures.js";
import { detectLowVelocity } from "../utils/detectLowVelocity.js";
import { detectNegativePressures } from "../utils/detectNegativePressures.js";
import { runSimulations } from "../utils/hydraulicServiceScenario.js";

import { getAllNodes } from "./nodesController.js";
import { fetchPipes } from "./pipesController.js";

export const scenarioResultsPOSTController = async (req, res) => {

    try {

        const {
            diameter,

            length,

            roughness,
            
            hour,
            
            pipeId

        } = req.body;

        const requestedHour = Number(hour)

        /**
         * ===========================
         * Chargement du réseau
         * ===========================
         */

        const nodes = await getAllNodes();

        const pipes = await fetchPipes();

        /**
         * ===========================
         * Recherche de la conduite
         * ===========================
         */

        const pipeExists = pipes.find(
            pipe => String(pipe._id) === String(pipeId)
        );

        if (!pipeExists) {

            return res.status(404).json({

                success: false,

                message: "Conduite introuvable."

            });

        }

        /**
         * ===========================
         * Création d'une copie temporaire
         * ===========================
         */

        const scenarioPipes = pipes.map(pipe => {

            if (String(pipe._id) !== String(pipeId)) {

                return pipe;

            }

            return {

                ...pipe,

                diameter:

                    diameter !== undefined
                        ? Number(diameter)
                        : pipe.diameter,

                length:

                    length !== undefined
                        ? Number(length)
                        : pipe.length,

                roughness:

                    roughness !== undefined
                        ? Number(roughness)
                        : pipe.roughness

            };

        });

        /**
         * ===========================
         * Simulation
         * ===========================
         */

        const simulationData = await runSimulations(

            nodes,

            scenarioPipes

        );

        /**
         * ===========================
         * Snapshot demandé
         * ===========================
         */

        const snapshot = simulationData.data.times.find(

            time => Math.floor(time.Heure) === requestedHour

        );

        if (!snapshot) {

            return res.status(404).json({

                success: false,

                message: `Aucun résultat trouvé pour ${requestedHour}h.`

            });

        }

        /**
         * ===========================
         * Conversion des résultats
         * ===========================
         */

        const nodesArray = Object.entries(snapshot.nodes).map(

            ([_id, data]) => ({

                _id,

                ...data

            })

        );

        const pipesArray = Object.entries(snapshot.links).map(

            ([_id, data]) => ({

                _id,

                ...data

            })

        );

        /**
         * ===========================
         * Détection des anomalies
         * ===========================
         */

        const negativePressures = await detectNegativePressures(nodesArray);

        const lowPressures = await detectLowPressures(nodesArray);

        const lowVelocity = await detectLowVelocity(pipesArray);

        const greatVelocity = await detectGreatVelocity(pipesArray);

        /**
         * ===========================
         * Réponse
         * ===========================
         */

        return res.status(200).json({

            success: true,

            message: "scenario",

            hour: requestedHour,

            modifiedPipe: pipeId,

            data: snapshot,

            warnings: {

                hasIssue:

                    negativePressures.length > 0 ||

                    lowPressures.length > 0 ||

                    lowVelocity.length > 0 ||

                    greatVelocity.length > 0,

                pressures: {

                    negative: negativePressures,

                    low: lowPressures

                },

                velocities: {

                    low: lowVelocity,

                    great: greatVelocity

                }

            }

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Erreur lors de la simulation du scénario."

        });

    }

};




export const scenarioResultsGETController = async function (req, res) {
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

        console.log("vitesses faibles : " ,lowVelocity)
        console.log("grandes vitesses : " ,greatVelocity)

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
                    low: lowPressures
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