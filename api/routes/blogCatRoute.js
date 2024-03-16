import express from 'express';
import { createBlogCategory, deleteBlogCategory, getAllBlogCategory, getOneBlogCategory, updateBlogCategory } from '../controllers/blogCatCtl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlogCategory);
router.get('/', getAllBlogCategory);
router.get('/:id', getOneBlogCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteBlogCategory);
router.put('/:id', authMiddleware, isAdmin, updateBlogCategory);


export default router; 