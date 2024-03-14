import mongoose from 'mongoose';

export const validateMongodbId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("This id is not valid or not found");
    }
}