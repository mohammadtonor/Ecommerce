import Color from '../models/colorModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongodbId } from '../utils/validateMonodbId.js';

export const createColor = asyncHandler( async (req, res ) => {
    try {
        const category = await Color.create(req.body)
        res.status(200).json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAllColor = asyncHandler( async (req, res) => {
    try {
        const categories = await Color.find();
        res.json(categories);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getOneColor = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Color.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const deleteColor = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Color.findByIdAndDelete(id);
        res.json({message: `Category by name: (${category.title}) Deleted!`});
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateColor = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Color.findByIdAndUpdate(
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