import Category from './../models/categoryModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongodbId } from '../utils/validateMonodbId.js';

export const createCategory = asyncHandler( async (req, res ) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAllCategory = asyncHandler( async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getOneCategory = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Category.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const deleteCategory = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Category.findByIdAndDelete(id);
        res.json({message: `Category by name: (${category.name}) Deleted!`});
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateCategory = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Category.findByIdAndUpdate(
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