import User from './../models/userModel.js';
import asyncHandler from 'express-async-handler'

export const createUser = asyncHandler(async (req, res) => {
    try {
        const { email, password, ...other } = req.body;
        const findUser = await User.findOne({email});
        if (findUser) {
            throw new Error("User already exists");
        }

        const newUser = new User({
            email,
            password,
            ...other
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
       throw new Error(error)
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({email});
        if (!user) {
            throw new Error("User does not exist");
        }

        const isMatch = await user.isPasswordMatched(password);
        if (!isMatch) {
            throw new Error("Password is incorrect");
        }
        
        res.status(200).json(user);
    } catch (error) {
        throw new Error(error)
    }
})
