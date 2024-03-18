import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Address = mongoose.model('Address', AddressSchema);

export default Address; 