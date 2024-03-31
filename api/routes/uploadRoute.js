import express from 'express';
import { uploadImages ,deleteImages } from '../controllers/uploadCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
import { productImageResize, uploadPhoto } from '../middleware/uploadImages.js';

const router = express.Router();

router.put(
    '/', 
    authMiddleware, 
    isAdmin, 
    uploadPhoto.array("images", 10),
    productImageResize,
    uploadImages
);
router.delete('/delete-img/:id',  authMiddleware, isAdmin, deleteImages);



export default router; 