import { getPipe } from "../controllers/pipesController.js"

/**
 * 
 * @param {Array} pipes 
 */
export const detectGreatVelocity  = async (pipes) => {

    const lowVelocityArray = pipes.filter((pipe) =>  Number(pipe.velocity) > 2 )

    const results = await Promise.all(
        
        lowVelocityArray.map(async (pipe) => {

            const identifiedPipe = await getPipe(pipe._id || pipe.id);

            return  {
                _id: pipe._id || pipe.id,
                code: identifiedPipe.code,
                velocity:  pipe.velocity,
                headloss: pipe.headloss,
                flow: pipe.flow,
                startNode: identifiedPipe.startNode,
                endNode: identifiedPipe.endNode,
                date: identifiedPipe.createdAt.toLocaleDateString()
            }
        })
    )

    return results;
}