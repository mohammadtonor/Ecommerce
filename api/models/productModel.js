import mongoose, {ObjectId} from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
    quantity: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0
    },
    brand: {
        type: String,
        enum: ["Apple", "Lenovo", "Asuss"]
    }
    ,
    color: {
        type: String,
        enum: ["Black", "Brown", "Gray", "Red", "Green", "Yellow"]
    },
    rating: [{
      star: Number,
      postedby: { type: ObjectId, ref: "User"},  
    }],
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

export default Product;