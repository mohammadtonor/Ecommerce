import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import slugify from 'slugify';
import {validateMongodbId} from './../utils/validateMonodbId.js'
import {cloudinaryUploadImg, cloudinaryDeleteImg} from "../utils/cloudinary.js"
import fs from 'fs'

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
        query =query.populate('color', ['title', '-_id']).select(['title', 'description', 'price', 'brand', 'color', 'cactegory']);
        const products = await query
        res.status(200).json(products);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("rating.postedby", ["lastName", "firstName"]);
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

export const addToWishList = asyncHandler(async (req, res) => {
    try {
        const  {_id } = req.user;
        const { prodId } = req.body;
        const user = await User.findById(_id);
        const alreadyAdded = user.whashlist.find(id => id.toString() === prodId.toString());
        let updatdUser;
        if(alreadyAdded) {
            updatdUser =await User.findByIdAndUpdate(_id, {
                $pull: { whashlist: prodId }
            }, {new: true})
        } else {
            updatdUser =await User.findByIdAndUpdate(_id, {
                $push: { whashlist: prodId }
            }, {new: true})
        }
        res.json(updatdUser);
    } catch (error) {
        throw new Error(error)
    }

})

export const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        const alreadyRated = product.rating.find(rating => rating.postedby.toString() === _id.toString() );
        if(!alreadyRated) {
            await Product.findByIdAndUpdate(prodId, {
                $push: { 
                    rating: {
                        star: star,
                        postedby: _id,
                        comment
                    } 
                },
            }, {
                new:  true
            })
        } else {
            await Product.updateOne(
                {
                  rating: { $elemMatch: alreadyRated },
                },
                {
                  $set: { 
                    "rating.$.star": star, 
                    "rating.$.comment": comment,
                 },
                },
                {
                  new: true,
                }
              );
        }

        const getAllRating = await Product.findById(prodId);
        const numberOfRating = getAllRating.rating.length;
        const sumRatings = getAllRating.rating
            .map((rating) => rating.star)
            .reduce((acc, cur) => acc + cur, 0);
        const totalRating = Math.round(sumRatings / numberOfRating)
        const finalProduct = await Product.findByIdAndUpdate(
            prodId,
            {
              totalRating  
            },
            { new: true },
        )

        res.json(finalProduct);
    } catch (error) {
        throw new Error(error)
    }
})

export const uploadImages = asyncHandler( async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for(const file of files) {
            const { path } = file;
            const newPath =await uploader(path)
            urls.push(newPath)
            console.log(path);
            //fs.unlinkSync(path);
        }
        const images = urls.map(url => ( url ));
        res.json(images)
    } catch (error) {
        throw new Error(error)
    }
});

export const deleteImages = asyncHandler( async (req, res) => {
    const { id:path } = req.params;
    try {
        const deleter = cloudinaryDeleteImg(path, "images");
        res.json(deleter);
    } catch (error) {
        throw new Error(error)
    }
})