import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 12
    },
    connectCode: {
        type: String,
        unique:true,
        required: true,
        index:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: true
    }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)
export default User