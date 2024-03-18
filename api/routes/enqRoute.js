import express from 'express';
import { createEnquiry, deleteEnquiry, getAllEnquiry, getOneEnquiry, updateEnquiry } from '../controllers/enqCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createEnquiry);
router.get('/', getAllEnquiry);
router.get('/:id', getOneEnquiry);
router.delete('/:id', authMiddleware, isAdmin, deleteEnquiry);
router.put('/:id', authMiddleware, isAdmin, updateEnquiry);


export default router; 