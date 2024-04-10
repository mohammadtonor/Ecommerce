import express from 'express';
import Order from '../models/orderModel.js';
import asyncHandler from "express-async-handler";
import Stripe from 'stripe';

const router = express.Router();

const STRIPE = new Stripe(process.env.STRIPE_API_KEY);
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_SIGN_SECRET;

router.post ('/' , asyncHandler( async (req, res) => {
  
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      const reqBuffer = await req.body
      const buffer = Buffer.from(reqBuffer)
      console.log(buffer.toString());
      event = STRIPE.webhooks.constructEvent(buffer.toString(), sig, STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        console.log(err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return; 
    }
  

if (event.type === 'checkout.session.completed') {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
        await Order.updateOne(
          { _id: orderId },
          { orderStatus: "Paied" },
          { new: true }
        );
    }
  }
  
  res.json('ok', {status: 200});

}))

export default router;   