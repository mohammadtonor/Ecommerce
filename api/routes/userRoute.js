import express from 'express';
import { DeleteUserById, getAllUser, getUserById, updateUserById } from '../controllers/userCtrl.js';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.delete('/:id', DeleteUserById);
router.put('/:id', updateUserById);

export default router;