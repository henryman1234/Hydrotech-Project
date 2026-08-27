import mongoose from "mongoose";


const PipeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    startNode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node",
        required: true
    },
    endNode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node",
        required: true
    },
    diameter: {
        type: Number,
        required: true
    },
    length:{
        type: Number,
        required: true
    },
    roughness: {
        type: Number,
        // default: 0.1
    },
    material: {
        type: String,
        enum: ["PVC", "Fonte ductile", "Fonte grise", "PEHD"],
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "Close"],
        default: "Open"
    },
    geometry: {
        type: {
            type: String,
            enum: ["LineString"],
            default: "LineString"
        },
        coordinates: [[Number]] /**[Latitude, Longitude] des noeuds intermédiares */
    }
}, {timestamps:true})


const Pipe = mongoose.model("Pipe", PipeSchema)

export default Pipe