import express from 'express';
import { addToWishList, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productCtrl.js';
import { authMiddleware, isAdmin } from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authMiddleware, isAdmin, createProduct);
router.get('/', getAllProducts);
router.put('/washlist',  authMiddleware, addToWishList);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id',  authMiddleware, isAdmin, deleteProduct);

export default router;