import {Stripe} from 'stripe';
import Order from '../models/orderModel.js';
import asyncHandler from "express-async-handler";

export const checkout = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2023-10-16",
    });
    const { cartProducts, shippingInfo } = await req.body;
    const {_id, email } = req?.user;

    const orderItems = []
    cartProducts?.map((cart) => (
        orderItems.push({
          product: cart.productId._id,
          color: cart.color._id,
          quantity: cart.quantity,
          price: cart.price,
        })
    ));
    const totalPrice = cartProducts?.reduce((prev, curr) => prev + curr.productId.price * curr.quantity, 0)
    console.log(totalPrice);
    const orderDoc = await Order.create({
        shippingInfo,
        orderItems,
        userId: _id,
        totalPrice: totalPrice,
    }); 
      
  const stripeLineItems = [];
  for (const Product of cartProducts) {
    stripeLineItems.push({
      quantity: Product.quantity,
      price_data: { 
            currency: 'USD',
            product_data: {
              name: Product?.productId?.title,
            },
            unit_amount: Product?.productId?.price * 100,
          },
    }); 
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.WEBSITE_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.WEBSITE_URL + 'cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()},
    payment_intent_data: {
      metadata:{orderId:orderDoc._id.toString()},
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {amount: 1000, currency: 'USD'},
        },
      }
    ],
  });
    
    return res.json(stripeSession.url);
  } catch (error) {
    throw new Error(error.message);     
  } 
})




