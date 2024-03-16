import mongoose, { ObjectId } from "mongoose";

const blogShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisLiked: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    disLikes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    image: {
        type: String,
    },
    author: {
        type: String,
        ref: "Admin"
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true   
}) 

const Blog = mongoose.model('Blog', blogShema);

export default Blog