import express from 'express';
import { createOrder, updateOrder } from '../controllers/orderCtrl.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/cach-order', authMiddleware, createOrder);
router.put('/update/:id', authMiddleware, updateOrder);



export default router; 