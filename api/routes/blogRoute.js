import express from 'express';
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, togglelikeBlog, updateBlogById, uploadImages } from '../controllers/blogCtrl.js';
import { authMiddleware, isAdmin } from './../middleware/authMiddleware.js';
import { blogImageResize, uploadPhoto,  } from '../middleware/uploadImages.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put(
    '/upload/:id', 
    authMiddleware, 
    isAdmin, 
    uploadPhoto.array("images", 2),
    blogImageResize,
    uploadImages
);
router.put('/likes', authMiddleware, togglelikeBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.delete('/:id', authMiddleware, isAdmin, deleteBlogById);
router.put('/:id', authMiddleware, isAdmin, updateBlogById);


export default router; 