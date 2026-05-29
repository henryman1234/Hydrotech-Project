import mongoose, { Schema } from "mongoose"


const patternSchema = new Schema({
    patternName: {
        type: String,
        enum: ["RESIDENTIEL", "COMMERCIAL"],
        default: "RESIDENTIEL",
        required: true
    },

    multipliers: {
        type: [Number],
        required: true
    }
    
}, {timestamps: true})

const Pattern = mongoose.model("Pattern", patternSchema)

export default Pattern