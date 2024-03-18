import express from 'express';
import { createUser, handleRefreshToken, loginAdmin, loginUser, logoutUser } from '../controllers/userCtrl.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
router.get('/refresh-token', handleRefreshToken);
router.get('/logout', logoutUser);

export default router; 