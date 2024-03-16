import mongoose from "mongoose";

const blogcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

}, {
    timestamps: true,
})

const BlogCategory = mongoose.model('BlogCategory', blogcategorySchema);

export default BlogCategory;