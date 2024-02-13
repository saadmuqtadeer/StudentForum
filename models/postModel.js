import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    postBy: {
        type: String,
    },

    institute: {
        type: String,
    },

    field: {
        type: String
    }

}, {timestamps:true});

export default mongoose.model('posts', postSchema);