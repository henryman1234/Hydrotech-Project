import { generateInpFile } from "../utils/generateInpFile.js";
import { generateInpFileTest } from "../utils/generateInpFileTest.js";
import { runSimulations } from "../utils/hydraulicService.js";
import { getAllNodes } from "./nodesController.js";
import { fetchPipes } from "./pipesController.js";

export const simulationsController = async function  (req, res) {

    // Lecture des données statique de MongoDB
    const nodes = await getAllNodes()
    const pipes = await fetchPipes()
    // const patterns = await findAllPatterns();

    // Génération du fichier INP à la volée
    const inp = generateInpFile(nodes, pipes);

    const simulationData = await runSimulations(nodes, pipes);

    res.status(200).json(simulationData);
    
}

