import { getPipe } from "../controllers/pipesController.js"

/**
 * 
 * @param {Array} pipes 
 */
export const detectLowVelocity  = async (pipes) => {

    const lowVelocityArray = pipes.filter((pipe) =>  pipe.velocity < 0.15 )

    const results = await Promise.all(

        lowVelocityArray.map(async (pipe) => {

            const identifiedPipe = await getPipe(pipe._id || pipe.id);

            return  {
                _id: pipe._id || pipe.id,
                code: identifiedPipe.code,
                flow: pipe.flow,
                startNode: identifiedPipe.startNode,
                endNode: identifiedPipe.endNode,
                velocity:  pipe.velocity,
                headloss: pipe.headloss,
                date: identifiedPipe.createdAt.toLocaleDateString()
            }
        })
    )

    return results;
}