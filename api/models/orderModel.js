import mongoose, { ObjectId } from "mongoose";

const orderSchema = new mongoose.Schema({
   userId: {type: ObjectId, required: true},
   shippingInfo: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String, required:true},
    city: {type: String, required: true },
    state: {type: String, required: true },
    country: {type: String, required: true },
    zipCode: {type: String, required: true },
    other: {type: String, required: true},
   },
   paymentInfo: {
    razorpsyOrderId: {type: String, required: true},
    razorpayPaymentId: {type: String, required: true},
   },
   orderItem: [{
    product: {type: ObjectId,ref: "Product", required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    color: {type: ObjectId, ref: "Color", required: true},
   }],
   orderStatus: {
       type: String,
       default: "Not Processed",
       enum: [
      "Not Processed", 
      "Processing", 
      "Shipped", 
      "Delivered", 
      "Cancelled", 
      "Returned", 
      "Refunded"
    ],
    totalPrice: {type: Number, required: true},
    totalPriceAfterDiscount: {type: Number, required: true},
   },
   paidAt: {
    type: Date,
    default: Date.now(),
   }
}, {timestamps: true })

const Order = mongoose.model("Order", orderSchema);

export default Order