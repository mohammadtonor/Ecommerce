import mongoose from "mongoose";

export const dcConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    } catch (error) {
        throw error
    }
}

