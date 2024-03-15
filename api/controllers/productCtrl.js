import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import slugify from 'slugify';

export const createProduct = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

export const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludeQuery = ["page", "sort", "limit", "field"];
        excludeQuery.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        let query = Product.find(JSON.parse(queryStr));
        
        // Sort BY
        if (req.query.sort) {
            const sortBY = req.query.sort.split(',').join(' ');
            query.sort(sortBY);
        } else {
            query.sort('-createdAt');
        }
        
        //Slecte Field
        if (req.query.field) {
            const field = req.query.field.split(',').join(' ');
            query.select(field);
        }  else {
            query.select('-__v');
        }

        // Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        console.log(page, limit, skip);
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if(skip >= productCount) throw new Error("This page dose not exists");
        }
        const products = await query;
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
        if (req.body?.title) {
            req.body.slug = slugify(req.body.title)
        }
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