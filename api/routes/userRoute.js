import express from 'express';
import { DeleteUserById, blockUser, forgotPasswordToken, getAllUser, getUserById, handleRefreshToken, resetePassword, unblockUser, updatePassword, updateUserById } from '../controllers/userCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAllUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetePassword);
router.get('/:id',authMiddleware,isAdmin, getUserById);
router.delete('/:id', DeleteUserById);
router.put('/:id',authMiddleware , updateUserById);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware , isAdmin, unblockUser);
router.post('/password', authMiddleware, updatePassword);
 
export default router;   