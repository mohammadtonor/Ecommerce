import express from 'express';
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, togglelikeBlog, updateBlogById } from '../controllers/blogCtrl.js';
import { authMiddleware, isAdmin } from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/likes', authMiddleware, togglelikeBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.delete('/:id', authMiddleware, isAdmin, deleteBlogById);
router.put('/:id', authMiddleware, isAdmin, updateBlogById);


export default router; 