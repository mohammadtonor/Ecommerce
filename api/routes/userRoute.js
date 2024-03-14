import express from 'express';
import { DeleteUserById, blockUser, getAllUser, getUserById, unblockUser, updateUserById } from '../controllers/userCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAllUser);
router.get('/:id',authMiddleware,isAdmin, getUserById);
router.delete('/:id', DeleteUserById);
router.put('/:id',authMiddleware , updateUserById);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware , isAdmin, unblockUser);

export default router;  