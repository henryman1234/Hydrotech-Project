import { Project, Workspace, LinkProperty , NodeProperty} from "epanet-js";
import { generateInpFile } from "./generateInpFile.js";


let workspace;

async function initSimulator() {
    if (!workspace) {
        workspace = new Workspace();
        await workspace.loadModule()
        console.log("EPANET chargé ✅");
    }
}

export async function runSimulations(nodes, pipes) {
    let model;
    try {
        await initSimulator();
        const inpContent = generateInpFile(nodes, pipes);

        workspace.writeFile("network.inp", inpContent);

        model = new Project(workspace);
        model.open("network.inp", "report.rpt", "output.out");
        
        // Résolution hydraulique
        model.solveH();

        // --- EXTRACTION DES DONNÉES ---
        const results = {
            période: new Date().toLocaleString(), 
            nodes: {},
            links: {}
        };

        // 1. Extraction pour chaque Nœud
        for (const node of nodes) {
            const id = (node.code || node._id).toString();
            const index = model.getNodeIndex(id);
            
            results.nodes[id] = {
              pressure: model.getNodeValue(index, NodeProperty.Pressure).toFixed(2),
              baseDemand: model.getNodeValue(index,  NodeProperty.BaseDemand).toFixed(2),
              demand:model.getNodeValue(index, NodeProperty.Demand).toFixed(2),
              elevation: model.getNodeValue(index, NodeProperty.Elevation).toFixed(2)
            };

        }

        // 2. Extraction pour chaque Conduite (Lien)
        for (const pipe of pipes) {
          const id = (pipe.code || pipe._id).toString().replace(/\s+/g, '_'); // Applique la même transformation qu'à la génération !
          const index = model.getLinkIndex(id);
          
          if (index === 0) { // EPANET renvoie 0 ou une erreur si l'ID est inconnu
              console.warn(`Attention : ID de lien non trouvé dans le moteur : ${id}`);
              continue; // On saute ce lien pour éviter le crash
          }
          
          results.links[id] = {
            flow: model.getLinkValue(index, LinkProperty.Flow).toFixed(4),
            velocity: model.getLinkValue(index, LinkProperty.Velocity).toFixed(2),
            headloss: model.getLinkValue(index, LinkProperty.Headloss).toFixed(4)
          };
      }

        return {
          success: true,
          data: results
        };

    } catch (error) {
        console.error("Erreur simulation:", error);
        throw error;
    } finally {
        if (model) {
            model.close();
        }
    }
}

