import Enquiry from './../models/enqModel.js';
import { validateMongodbId } from '../utils/validateMonodbId.js';
import asyncHandler from 'express-async-handler'
import { cloudinaryUploadImg } from '../utils/cloudinary.js';

export const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (error) {
        throw new Error(error);
    }
})

export const getAllEnquiry = asyncHandler(async (req, res) => {
    try {
        const enquirys = await Enquiry.find();
        res.status(200).json(enquirys);
    } catch (error) {
        throw new Error(error);
    }
})

export const getOneEnquiry = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const enquiry = await Enquiry.findById(id)
        const updateViews = await Enquiry.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1},
            },
            { new: true })
        res.status(200).json(enquiry);
    } catch (error) {
        throw new Error(error);
    }
})

export const deleteEnquiry = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const enquiry = await Enquiry.findByIdAndDelete(id);
        res.status(200).json({message: `Enquiry By id: (${id}) deleted!`});
    } catch (error) {
        throw new Error(error);
    }
})

export const updateEnquiry = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const enquiry = await Enquiry.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true });
        res.status(200).json(enquiry);
    } catch (error) {
        throw new Error(error);
    }
})

