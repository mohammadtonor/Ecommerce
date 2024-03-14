import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import slugify from 'slugify';

export const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body?.title) {
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        throw new Error(error.message);
    }
    
    res.json({
        status: 201,
        message: "Product created successfully",
    })
})

export const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true });

        res.status(200).json(updatedProduct);
    } catch (error) {
        throw new Error(error.message);
    }    
})

export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: `Product By id: (${id}) deleted!`});
    } catch (error) {
        throw new Error(error.message);
    }
})