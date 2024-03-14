import { generateToken } from '../config/jwtToken.js';
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
        const { email, password: orginPassword } = req.body;
        
        const user = await User.findOne({email});
        if (!user) {
            throw new Error("User does not exist");
        }

        const isMatch = await user.isPasswordMatched(orginPassword);
        if (!isMatch) {
            throw new Error("Password is incorrect");
        }

        const {password, __v,  ...restUser} = user._doc;
        res.status(200).json({ token: generateToken(restUser._id)});
    } catch (error) {
        throw new Error(error)
    }
})


export const getAllUser =asyncHandler (async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        throw new Error(error);
    }
})

export const getUserById =asyncHandler (async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User does not exist");
        }
        const {password, ...otherField} = user._doc;
        res.status(200).json(otherField);
    } catch (error) {
        throw new Error(error);
    }
})

export const DeleteUserById =asyncHandler (async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User does not exist");
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: `User By email: (${user.email}) deleted!`});
    } catch (error) {
        throw new Error(error);
    }
})

export const updateUserById =asyncHandler (async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User does not exist");
        }
        const Updated = await User.findByIdAndUpdate(id, {
            ...req.body
        });
        res.status(200).json({message: `User By email: (${user.email}) Updated!`});
    } catch (error) {
        throw new Error(error);
    }
})