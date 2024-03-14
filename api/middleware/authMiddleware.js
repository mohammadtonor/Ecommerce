import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';

export const authMiddleware = asyncHandler( async (req, res, next) => {
    let token;
    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            if (token) {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decode.id);
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error("not authorized token expired, please login again")
        }
    } else {
        throw new Error("There are no thoken atached!")
    }
});

export const isAdmin = asyncHandler( async (req, res, next) =>{
    const { email } = req.user;
    const adminUser = await User.findOne({ email});
    if (adminUser.role !== "admin") {
        throw new Error("You are not admin")
    } else {
        next();
    }
})
