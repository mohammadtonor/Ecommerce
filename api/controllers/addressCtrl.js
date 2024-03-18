import Brand from './../models/brandModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongodbId } from '../utils/validateMonodbId.js';

export const createBrand = asyncHandler( async (req, res ) => {
    try {
        const category = await Brand.create(req.body)
        res.status(200).json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAllBrand = asyncHandler( async (req, res) => {
    try {
        const categories = await Brand.find();
        res.json(categories);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getOneBrand = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Brand.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const deleteBrand = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Brand.findByIdAndDelete(id);
        res.json({message: `Category by name: (${category.title}) Deleted!`});
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateBrand = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Brand.findByIdAndUpdate(
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