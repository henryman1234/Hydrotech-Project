import express from "express"
import mongoose from "mongoose"

const NodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["Junction", "Valve", "Tank", "Reservoir"],
        default: "Junction"
    },
    baseDemand: {
        type: Number,
    },
    elevation: {
        type: Number,
        required: true
    },
    pattern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pattern",
        required: true
    },

    // Localisation
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],  /**[Longitude, Latitude] */
            required: true
        }
    }
})

NodeSchema.index({location: "2dsphere"})
const Node = mongoose.model("Node", NodeSchema)
export default Node