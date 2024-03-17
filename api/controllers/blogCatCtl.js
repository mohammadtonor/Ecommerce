import BlogCategory from './../models/blogCatModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongodbId } from '../utils/validateMonodbId.js';

export const createBlogCategory = asyncHandler( async (req, res ) => {
    try {
        const category = await BlogCategory.create(req.body)
        res.status(200).json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAllBlogCategory = asyncHandler( async (req, res) => {
    try {
        const categories = await BlogCategory.find();
        res.json(categories);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getOneBlogCategory = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await BlogCategory.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const deleteBlogCategory = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await BlogCategory.findByIdAndDelete(id);
        res.json({message: `Category by name: (${category.title}) Deleted!`});
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateBlogCategory = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await BlogCategory.findByIdAndUpdate(
            id,
            { ...req.body },
            {
                new: true
            }
        );
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

