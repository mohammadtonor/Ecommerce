import Coupon from './../models/couponModel.js.js';
import asyncHandler from 'express-async-handler';
import { validateMongodbId } from '../utils/validateMonodbId.js';

export const createCoupon = asyncHandler( async (req, res ) => {
    try {
        const category = await Coupon.create(req.body)
        res.status(200).json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAllCoupon = asyncHandler( async (req, res) => {
    try {
        const categories = await Coupon.find();
        res.json(categories);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getOneCoupon = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Coupon.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const deleteCoupon = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Coupon.findByIdAndDelete(id);
        res.json({message: `Category by name: (${category.name}) Deleted!`});
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateCoupon = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const category = await Coupon.findByIdAndUpdate(
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