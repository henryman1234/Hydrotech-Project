import { getNode } from "../controllers/nodesController.js"


/***
 * @param {Array} nodes
 * nodes est le tableau qui contient chaque noeud sous forme d'objet avec ses params 
 */
export const detectLowPressures = async (nodes) => {

    const lowPressuresArray = nodes.filter((node) => {
        return Number(node.pressure) > 0 && Number(node.pressure) < 10
    })

    const results = await Promise.all(
        lowPressuresArray.map(async (node) => {

            const identifiedNode =  await getNode(node._id || node.id)

            return  {
                _id: node._id || node.id,
                name: identifiedNode.name,
                type: identifiedNode.type,
                pressure: node.pressure
            }
        })
    )

    return results;
}