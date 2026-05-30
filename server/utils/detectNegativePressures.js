import { getNode } from "../controllers/nodesController.js";


/**
 * Noeuds statiques issues de la bd qu'on passe en paramètres
 * @param {Array} nodes 
 */
export const detectNegativePressures =  async (nodes) => {

    const negativePressures = nodes.filter((node) => node.pressure < 0);

    const results = await Promise.all(

        negativePressures.map(async function (node) {

            const identifiedNode = await getNode(node._id || node.id )
            
            return {
                id: node._id || node.id ,
                name: identifiedNode.name,
                type: identifiedNode.type,
                pressure: node.pressure
            }
        })
    )

    return results

}