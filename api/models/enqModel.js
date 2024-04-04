import mongoose, { ObjectId } from "mongoose";

const enqShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }, 
    status: {
        type: String,
        default: "Submitted",
        enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
    },
}, {
    timestamps: true   
}) 

const Enquiry = mongoose.model('Enquiry', enqShema);

export default Enquiry