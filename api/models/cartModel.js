import mongoose, {ObjectId} from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: ObjectId,
            ref: "Product"
        },
        count: Number,
        color: String,
        price: Number,
    }],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {type: ObjectId, ref: "User"}
}, {
    timestamps: true,
})

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;