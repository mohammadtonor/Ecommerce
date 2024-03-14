import express from 'express';
import { DeleteUserById, getAllUser, getUserById, updateUserById } from '../controllers/userCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAllUser);
router.get('/:id',authMiddleware,isAdmin, getUserById);
router.delete('/:id', DeleteUserById);
router.put('/:id',authMiddleware , updateUserById);
router.put('/block-user/:id',authMiddleware , isAdmin, updateUserById);
router.put('/unblock-user/:id',authMiddleware , isAdmin, updateUserById);

export default router;  