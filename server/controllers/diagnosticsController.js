import { fetchPipes } from "./pipesController.js";
import { getAllNodes } from "./nodesController.js";
import { runSimulations } from "../utils/hydraulicService.js";
import { detectNegativePressures } from "../utils/detectNegativePressures.js";
import { detectLowPressures } from "../utils/detectLowPressures.js";
import { detectLowVelocity } from "../utils/detectLowVelocity.js";
import { detectGreatVelocity } from "../utils/detectGreatVelocity.js"
import { detectGreatPressures } from "../utils/detectGreatPressures.js";

export const criticsAlerts = async function (req, res) {

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
        const nodesArray = Object.entries(snapshot.nodes
        ).map(([id, data]) => ({
            ...data,
            _id: id
        }));

        /**
         * Anomalies
         */

        const negativePressures = await detectNegativePressures(nodesArray);

        /**
         * Fusion des anomalies
         */
        const criticalNodes = {};

        criticalNodes["negative"] =  {title: "Diagnostics critiques", count: negativePressures.length, desc: "Intervention rapide"}

        return res.status(200).json({
            success: true,
            hour: requestedHour,
            data: {criticalNodes}
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des données critiques"
        });

    }

};

export const lowPressuresAlert = async function (req, res) {

    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getHours();

        const pipes = await fetchPipes();
        const nodes = await  getAllNodes()

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
        const nodesArray = Object.entries(snapshot.nodes
        ).map(([id, data]) => ({
            ...data,
            _id: id
        }));

        /**
         * Anomalies
         */

        const lowPressures = await detectLowPressures(nodesArray)

        /**
         * Fusion des anomalies
         */
        const criticalNodes = {};


        criticalNodes["low"] =  {title: "Sous pression", count: lowPressures.length, desc: "Pressions assez insuffisantes"}


        return res.status(200).json({
            success: true,
            hour: requestedHour,
            data: criticalNodes
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des données de pressions faibles"
        });

    }

};

export const lowVelocityAlert = async function (req, res) {

    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getHours();

        const pipes = await fetchPipes();
        const nodes = await  getAllNodes()

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

        const lowVelocity = await detectLowVelocity(pipesArray)

        /**
         * Fusion des anomalies
         */
        const criticalPipes = {};

        criticalPipes["low"] = {title: "Risques de stagnation", count: lowVelocity.length, desc: "Faible renouvellement"}

        return res.status(200).json({
            success: true,
            hour: requestedHour,
            data: criticalPipes
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des données de diagnostics"
        });

    }

};


export const greatVelocityAlert = async function (req, res) {

    try {

        const requestedHour = parseInt(req.query.hour) || new Date().getDate.getHours();

        const pipes = await fetchPipes();
        const nodes = await  getAllNodes()

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


        const greatVelocity = await detectGreatVelocity(pipesArray)

        /**
         * Fusion des anomalies
         */
        const criticalPipes = {};


        criticalPipes["great"] = {title: "Risques d'usure", count: greatVelocity.length}


        return res.status(200).json({
            success: true,
            hour: requestedHour,
            data: criticalPipes
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des données de diagnostics"
        });

    }

};

export const diagnosticsTable = async function (req, res) {

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
        const nodesArray = Object.entries(snapshot.nodes
        ).map(([id, data]) => ({
            ...data,
            _id: id
        }));

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

        const lowPressures = await detectLowPressures(nodesArray)

        const greatPressures = await detectGreatPressures(nodesArray)

        // interface DiagnosticData {
        //     code:  string,
        //     type: string,
        //     value: number,
        //     diagnostic: string,
        //     severity:  "élévée" | "critique" | "moyenne"
        //     recommendation: string,
        //     localisation: string
        // }

        /**
         * Fusion des anomalies
         */
        const criticalItems = [];

        for (const pipe of lowVelocity) {

            criticalItems.push({
                ...pipe,
                value: pipe.velocity ,
                code: pipe._id.slice(0, 6),
                severity:  (pipe.velocity <=  0.08 && "critique") || (pipe.velocity < 0.15 && "élévée") ,
                localisation: "voir sur la carte",
                diagnostic: "Faible renouvellement de l'eau, risque de dégradation de la qualité",
                recommendation: "Réduire le diamètre ou augmenter le débit",
                type: "Stagnation",
                
            })
        }

        for (const pipe of greatVelocity) {

            criticalItems.push({
                ...pipe,
                value: pipe.velocity,
                code: pipe._id.slice(0, 6),
                severity: (pipe.velocity >=  2 && "moyenne") || (pipe.velocity >= 4  && "élévée") || (pipe.velocity >= 5  && "critique"),
                localisation: "voir sur la carte",
                diagnostic: "Vitesse excessive dans la conduite, risque d'usure et d'abrasion",
                recommendation: "Véifier le diamètre ou installer un réducteur",
                type: "Vitesse élévée",
            });

        }

        for (const node of lowPressures) {

            criticalItems.push({
                ...node,
                value: node.pressure,
                code: node._id.slice(0, 6),
                severity: (node.pressure <= 8 && "moyenne") || (node.pressure < 5 && "élévée"),
                localisation: "voir sur la carte",
                diagnostic: "Pression insuffisantes, usagers mal alimentés",
                recommendation: "Vérifier les pertes de charges, améliorer l'alimentation",
                type: "Sous-pression",
            });
        }

        for (const node of greatPressures) {
            criticalItems.push({
                ...node,
                value: node.pressure,
                code: node._id.slice(0, 6),
                severity: "critique",
                localisation: "voir sur la carte",
                diagnostic: "Risque d'infiltration, situation critique",
                recommendation: "Vérifier le fonctionnement du reservoir / des pompes",
                type: "Pression négative",
            });
        }

        return res.status(200).json({
            success: true,
            hour: requestedHour,
            data: criticalItems
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des conduites critiques"
        });

    }

};