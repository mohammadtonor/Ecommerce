import express, { application } from 'express';
import { AddToCard, DeleteUserById, applyCoupon, blockUser, emptyCart, forgotPasswordToken, getAllUser, getUserById, getUserCart, getUserOrders, getWishList, handleRefreshToken, resetePassword, saveAdress, unblockUser, updatePassword, updateUserById } from '../controllers/userCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAllUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetePassword);
router.put('/save-address', authMiddleware, saveAdress);
router.get('/wishlist', authMiddleware, getWishList);
router.put('/add-cart', authMiddleware, AddToCard);
router.get('/get-cart', authMiddleware, getUserCart);
router.get('/empty-cart', authMiddleware, emptyCart);
router.put('/apply-coupon', authMiddleware, applyCoupon);
router.get('/get-orders', authMiddleware, getUserOrders);

router.get('/:id',authMiddleware,isAdmin, getUserById);
router.delete('/:id', DeleteUserById);
router.put('/:id',authMiddleware , updateUserById);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware , isAdmin, unblockUser);
router.post('/password', authMiddleware, updatePassword);
 
export default router;   