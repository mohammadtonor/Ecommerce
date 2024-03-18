import mongoose, { ObjectId } from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: ObjectId,
            ref: "Product"
        },
        count: {
            type: Number
        },
        color: String,
    }],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed", 
            "Cash on Delivery",
            "Processing",
            "DisPAtched",
            "Canceled",
            "Delivered",
        ]
    },
    
    orderBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true })

const Order = mongoose.model("Order", orderSchema);

export default Order