import express from 'express';
import { createBrand, deleteBrand, getAllBrand, getOneBrand, updateBrand } from '../controllers/brandCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBrand);
router.get('/', getAllBrand);
router.get('/:id', getOneBrand);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);
router.put('/:id', authMiddleware, isAdmin, updateBrand);


export default router; 