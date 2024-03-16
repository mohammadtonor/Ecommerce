import express from 'express';
import { createCategory, deleteCategory, updateCategory, getAllCategory, getOneCategory } from '../controllers/categoryCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authMiddleware, isAdmin, createCategory);
router.get('/', getAllCategory);
router.get('/:id', getOneCategory);
router.delete('/:id',authMiddleware, isAdmin, deleteCategory);
router.put('/:id',authMiddleware, isAdmin, updateCategory);

export default router;