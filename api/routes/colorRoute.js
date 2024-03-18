import express from 'express';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
import { createColor, deleteColor, getAllColor, getOneColor, updateColor } from '../controllers/colorCtrl.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createColor);
router.get('/', getAllColor);
router.get('/:id', getOneColor);
router.delete('/:id', authMiddleware, isAdmin, deleteColor);
router.put('/:id', authMiddleware, isAdmin, updateColor);


export default router; 