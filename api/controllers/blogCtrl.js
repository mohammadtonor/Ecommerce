import Blog from './../models/blogModel.js';
import { validateMongodbId } from '../utils/validateMonodbId.js';
import asyncHandler from 'express-async-handler'
import { cloudinaryUploadImg } from '../utils/cloudinary.js';

export const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error) {
        throw new Error(error);
    }
})

export const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        throw new Error(error);
    }
})

export const getBlogById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const blog = await Blog.findById(id)
                                .populate("likes", ["firstName", "lastName", "email", "_id"])
                                .populate("disLikes", ["firstName", "lastName", "email", "_id"]);

        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1},
            },
            { new: true })
        res.status(200).json(blog);
    } catch (error) {
        throw new Error(error);
    }
})

export const deleteBlogById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const blog = await Blog.findByIdAndDelete(id);
        res.status(200).json({message: `Blog By id: (${id}) deleted!`});
    } catch (error) {
        throw new Error(error);
    }
})

export const updateBlogById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const blog = await Blog.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true });
        res.status(200).json(blog);
    } catch (error) {
        throw new Error(error);
    }
})

export const togglelikeBlog = asyncHandler(async (req, res) => {
    const {blogId}  = req.body;
    console.log(blogId);
    const blog = await Blog.findById(blogId);
    const loginUserId = req?.user?._id;

    const isLiked = blog?.isLiked
    const isDisLiked = blog?.isDisLiked;

    const alreadyDisliked = blog?.disLikes.find(
        (userId) => userId?.toString() === loginUserId?.toString());
    if (alreadyDisliked && isDisLiked) {
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisLiked: false
        }, { new: true })
        const blogupdated = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true
        }, { new: true });
        res.json(blogupdated);
    };

    const alreadyLiked = blog?.likes.find(
        (userId) => userId?.toString() === loginUserId?.toString());
    if (alreadyLiked && isLiked) {
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        }, { new: true });
        const blogupdated = await Blog.findByIdAndUpdate(blogId, {
            $push: { disLikes: loginUserId },
            isDisLiked: true
        }, { new: true })
        res.json(blogupdated); 
    }

    if (!alreadyDisliked && !alreadyLiked && !isLiked) {
        const blogupdated = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true
        }, { new: true });
        res.json(blogupdated);
    }
})

export const uploadImages = asyncHandler( async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for(const file of files) {
            const { path } = file;
            const newPath =await uploader(path)
            console.log(newPath);
            urls.push(newPath)
        }
        const findBlog = await Blog.findByIdAndUpdate(
            id,
             {
                images: urls.map(file => file)
            }, {
                new: true
            }
        )
        res.json(findBlog)
    } catch (error) {
        throw new Error(error)
    }
})