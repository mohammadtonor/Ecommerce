import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import { validateMongodbId } from '../utils/validateMonodbId.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import uniqid  from 'uniqid';
import Product from '../models/productModel.js';

export const createOrder = asyncHandler( async(req, res) => {
    const {COD, couponAplied } = req.body;
    const {_id} = req.user;
    console.log(_id);
    validateMongodbId(_id);
    try {
        const user = await User.findById(_id);
        const userCart = await Cart.findOne({orderBy: user._id});
        let finalPrice = 0;
        if(couponAplied && userCart.totalAfterDiscount){
            finalPrice = userCart.totalAfterDiscount * 100
        } else {
            finalPrice = userCart.cartTotal * 100;
        }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid,
                method: "COD",
                amount: finalPrice,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "usd"
            },
            orderBy: user._id,
            orderStatus: "Cash on Delivery",
        }).save();
        const update = userCart.products.map(item => {
            return {
                updateOne: {
                    filter: {_id: item.product._id},
                    update: {$inc: { quantity: -item.count, sold: +item.count}}
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        res.json(updated);
    } catch (error) {
        throw new Error(error)
    }
})

export const updateOrder = asyncHandler( async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    validateMongodbId(id); 
    try {
        const updated = await Order.updateOne(
            {_id: id},
            { 
                $set: {
                    "orderStatus": status,
                    "paymentIntent.status": status,
                }
                   
            },
        )
        res.json(updated)
    } catch (error) {
        throw new Error(error)
    }
})

