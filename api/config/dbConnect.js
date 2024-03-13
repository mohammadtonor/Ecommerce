import mongoose from "mongoose";

export const dcConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log("Connected to MongoDB Successfully")
    } catch (error) {
        throw error
    }
}

