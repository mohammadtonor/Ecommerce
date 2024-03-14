import { generateToken } from '../config/jwtToken.js';
import { generateRefreshToken } from '../config/refreshToken.js';
import { validateMongodbId } from '../utils/validateMonodbId.js';
import User from './../models/userModel.js';
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';

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
        const refreshToken = await generateRefreshToken(user._id);
        await User.findByIdAndUpdate(
            user._id,
             {
                refreshToken
             },
             { new: true }
        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        const {password, __v,  ...restUser} = user._doc;
        res.status(200).json({ token: generateToken(restUser._id)});
    } catch (error) {
        throw new Error(error)
    }
})

export const handleRefreshToken = asyncHandler( async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token found in cookie");
    }
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No Refresh Token match by any Users");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
        if(err || user.id !== decode.id) {
          throw new Error("Refresh token is invalid or Failded")
       }
       const accessToken = generateToken(user?._id)
       res.json({ accessToken: accessToken })
    })
})

export const logoutUser = asyncHandler( async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken) throw new Error("No Refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user =  await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        })
        return res.status(204); //forbiden
    }
    await User.findOneAndUpdate({refreshToken}, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
     res.sendStatus(204); //forbiden 
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
        const { id } = req.params;
        validateMongodbId(id);
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
        const { id } = req.params;
        validateMongodbId(id);
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
        const { id } = req.params;
        validateMongodbId(id);
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

export const blockUser = asyncHandler( async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            { 
                new: true
            }
        );
        res.status(200).json({
            message: `User ${block.email} Blocked`
        });
    } catch (error) {
        throw new Error(error);
    }
})

export const unblockUser = asyncHandler( async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            { 
                new: true
            }
        );
        res.status(200).json({
            message: `User ${block.email} Unblocked`
        });
    } catch (error) {
        throw new Error(error);
    }
})