import express from 'express';
import Order from '../models/orderModel.js';
import asyncHandler from "express-async-handler";
import Stripe from 'stripe';

const router = express.Router();


router.post ('/' , asyncHandler( async (req, res) => {
  
  const STRIPE = new Stripe(process.env.STRIPE_API_KEY);
  const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_SIGN_SECRET;
  const sig = req.headers['stripe-signature'];
  let event;console.log(sig, STRIPE_ENDPOINT_SEC);
  try {
    event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return; 
  }
  

if (event.type === 'checkout.session.completed') {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    const totalPrice = event?.data?.object?.amount_total;
    if (isPaid) {
        await Order.updateOne(
          { _id: orderId },
          { 
            orderStatus: "Paied", 
            totalPrice
           },
          { new: true }
        );
    }
  }
  
  res.status(200).send();

}))

export default router;   