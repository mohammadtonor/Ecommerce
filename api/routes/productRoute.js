import express from 'express';
import {
    addToWishList,
    createProduct,
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    rating, 
    updateProduct, 
} from '../controllers/productCtrl.js';
import { authMiddleware, isAdmin } from './../middleware/authMiddleware.js';
import { productImageResize, uploadPhoto } from '../middleware/uploadImages.js';

const router = express.Router();

router.post('/',authMiddleware, isAdmin, createProduct);
router.get('/', getAllProducts);
router.put('/wishlist',  authMiddleware, addToWishList);
router.put('/rating',  authMiddleware, rating);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id',  authMiddleware, isAdmin, deleteProduct);

export default router;