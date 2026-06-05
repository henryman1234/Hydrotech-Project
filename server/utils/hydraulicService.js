import {
    Project,
    Workspace,
    LinkProperty,
    NodeProperty
} from "epanet-js";

import { generateInpFile } from "./generateInpFile.js";
import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url";

let workspace;

async function initSimulator() {

    if (!workspace) {

        workspace = new Workspace();

        await workspace.loadModule();

        console.log(
            "EPANET chargé ✅"
        );

    }

}

export async function runSimulations(nodes,pipes){

    let model;

    // Workspace LOCAL à la simulation
    const workspace = new Workspace();

    try{

        // await initSimulator();
        // Chargement du moteur
        await workspace.loadModule();

        // Chargement du moteur
        await workspace.loadModule();

        const inpContent = generateInpFile (nodes, pipes)

        const dir = dirname(fileURLToPath(import.meta.url))

        const inpPath = path.join(dir, "../network.inp");
        const rptPath = path.join(dir, "../report.rpt");
        const outPath = path.join(dir, "../output.out");
        

        workspace.writeFile(inpPath , inpContent);
        // workspace.writeFile("network.inp", inpContent);

        model = new Project(workspace);

        model.open(inpPath ,rptPath ,outPath);
        // model.open("network.inp","report.rpt","output.out");

        const date = new Date()

        const results={
            day: date.toLocaleDateString("fr-FR"),
            times:[]
        };

        // Initialisation simulation étendue

        model.openH();

        model.initH(0);


        let currentTime = 0;


        let t = 0;


        do{
            model.runH();

            const simulatedHour = Math.floor(currentTime / 3600)

            const snapshot={
                Heure : simulatedHour,
                nodes:{},
                links:{}
            };


            // ===== NOEUDS =====

            for(const node of nodes){

                const id=(node.code||node._id).toString();

                const index = model.getNodeIndex(id);

                snapshot.nodes[id]={
                    pressure:model.getNodeValue(index,NodeProperty.Pressure)
                    .toFixed(2),

                    baseDemand: model.getNodeValue(index, NodeProperty.BaseDemand)
                    .toFixed(2),

                    demand: model.getNodeValue(index, NodeProperty.Demand)
                    .toFixed(2),

                    elevation: model.getNodeValue(index, NodeProperty.Elevation)
                    .toFixed(2)

                };


                // console.log(
                //     id,
                //     "base:",
                //     snapshot.nodes[id]
                //     .baseDemand,

                //     "réelle:",
                //     snapshot.nodes[id]
                //     .demand
                // );

            }


            // ===== CONDUITES =====

            for(const pipe of pipes){

                const id= (pipe._id || pipe.code).toString()
                .replace(/\s+/g, "_");

                const index =  model.getLinkIndex(id);

                if (index === 0){
                    continue;
                }

                snapshot.links[id]={

                    flow: model.getLinkValue(index, LinkProperty.Flow).toFixed(4),

                    velocity: model.getLinkValue(index, LinkProperty.Velocity).toFixed(2),

                    headloss: model.getLinkValue(index, LinkProperty.Headloss).toFixed(4)

                };

            }

            results.times.push(snapshot);

            t = model.nextH();

            currentTime += t

        }

        while(t>0);

        model.closeH();

        // console.log("Simulation terminée ✅");

        return {
            success:true,
            data:results
        };

    }

    catch(error){

        console.error("Erreur simulation:",error);

        throw error;

    }

    finally{

        if(model){
            model.close();
        }

    }

}