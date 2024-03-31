import asyncHandler from "express-async-handler";
import {cloudinaryUploadImg, cloudinaryDeleteImg} from "../utils/cloudinary.js"
import Product from "../models/productModel.js";

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
        //const product = await Product.findById(prodId);
        const deleter = cloudinaryDeleteImg(path, "images");
        // await Product.findByIdAndUpdate(
        //     prodId,
        //     {
        //        $pull: { images: { public_id: path } },
        //     },
        //   );
        res.json(deleter);
    } catch (error) {
        throw new Error(error)
    }
})