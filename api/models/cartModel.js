import mongoose, {ObjectId} from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {type: ObjectId, ref: "User"},
    productId: {type: ObjectId, ref: "Product"},
    color: {type: ObjectId, ref: "Color"},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
}, {
    timestamps: true,
})

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;