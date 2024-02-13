import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        requied: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    institute:{
        type: String,
        required: true
    },
    field:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
}, {timestamps: true} 
)

export default mongoose.model('users', userSchema);