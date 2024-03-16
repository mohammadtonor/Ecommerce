import express from 'express';
import { createCoupon, deleteCoupon, getAllCoupon, getOneCoupon, updateCoupon } from '../controllers/couponCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon);
router.get('/', getAllCoupon);
router.get('/:id', getOneCoupon);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);


export default router; 