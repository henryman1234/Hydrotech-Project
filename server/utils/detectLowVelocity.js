import { getPipe } from "../controllers/pipesController.js"

/**
 * 
 * @param {Array} pipes 
 */
export const detectLowVelocity  = async (pipes) => {

    const lowVelocityArray = pipes.filter((pipe) =>  pipe.velocity < 0.3 )

    const results = await Promise.all(
        lowVelocityArray.map(async (pipe) => {

            const identifiedPipe = await getPipe(pipe._id || pipe.id);

            return  {
                _id: pipe._id || pipe.id,
                code: identifiedPipe.code,
                startNode: identifiedPipe.startNode,
                endNode: identifiedPipe.endNode
            }
        })
    )

    return results;
}