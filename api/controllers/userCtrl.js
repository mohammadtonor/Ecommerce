import { generateToken } from '../config/jwtToken.js';
import { generateRefreshToken } from '../config/refreshToken.js';
import { validateMongodbId } from '../utils/validateMonodbId.js';

import User from './../models/userModel.js';
import Address from './../models/addressModel.js';
import Product from './../models/productModel.js';
import Cart from './../models/cartModel.js';
import Coupon from './../models/couponModel.js';
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';
import { sendEmail } from './emailCtrl.js';
import crypto from 'crypto';
import Order from '../models/orderModel.js';

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
        const {password: pass, ...restUser} = savedUser;
        res.status(201).json(restUser);
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
        res.status(200).json({
            _id: restUser._id,
            firstName: restUser.firstName,
            lastName: restUser.lastName,
            email: restUser.email,
            mobile: restUser.mobile,
            token: generateToken(restUser._id)
        });
    } catch (error) {
        throw new Error(error)
    }
})

export const loginAdmin = asyncHandler(async (req, res) => {
    try {
        const { email, password: orginPassword } = req.body;
        
        const findAdmin = await User.findOne({email});

        if(findAdmin.role !== 'admin') throw new Error("not Authorized");

        if (!findAdmin) {
            throw new Error("User does not exist");
        }

        const isMatch = await findAdmin.isPasswordMatched(orginPassword);
        if (!isMatch) {
            throw new Error("Password is incorrect");
        }
        const refreshToken = await generateRefreshToken(findAdmin._id);
        await User.findByIdAndUpdate(
            findAdmin._id,
             {
                refreshToken
             },
             { new: true }
        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        const {password, __v,  ...restUser} = findAdmin._doc;
        res.status(200).json({ 
            _id: restUser._id,
            firstName: restUser.firstName,
            lastName: restUser.lastName,
            email: restUser.email,
            mobile: restUser.mobile,
            token: generateToken(restUser._id)
        });
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
        const users = await User.find()
            .select(['firstName', 'lastName', 'email', 'mobile']);
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
});

export const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    console.log(_id, password);
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      await user.createPasswordResetToken()
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });

  export const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found by this Email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/users/reset-password/${token}'>Click Here</>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot PAssword Link",
            htm: resetURL
        } 
        sendEmail(data);  
        console.log(data.htm);
        res.json(token);  
    } catch (error) {
        throw new Error(error.message);
    }
  })

  export const resetePassword = asyncHandler( async (req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ 
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error("Password reset token is invalid or has expired");
    
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  })

  export const getWishList = asyncHandler( async(req, res) => {
    const { _id } = req.user
    try {
        const findUser = await User.findById(_id)
            .select("whashlist")
            .populate("whashlist", ["title","price", "images"]);
        res.json(findUser.whashlist);
    } catch (error) {
        throw new Error(error)
    } 
  });

  export const saveAdress = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id); //
    try {
        const address = await Address.create(req.body);
        const user = await User.findByIdAndUpdate(
            _id,
            {
                $push: {address}
            },
            {
                new: true,
            }
        )
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
  })

  export const AddToCard = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id); 
    try {
        console.log(req.body);
        let newCart = await new Cart({
            ...req.body,
            userId: _id,
        }).save();
        
        // const user = await User.findById(_id)

        // let products = [];
        // const checkCartExists = await Cart.findOneAndDelete({orderBy: user._id});
        // if (checkCartExists){
        //     checkCartExists.deleteOne();
        // }

        // for (let i=0; i< cart.length; i++) {
        //     let object = {};
        //     object.product = cart[i]._id;
        //     object.count = cart[i].count;
        //     object.color = cart[i].color
        //     const getPrice = await Product.findById(cart[i]._id).select("price")
        //     object.price = getPrice.price
        //     products.push(object);
        // }
        // const totalPrice = products
        //     .map(product => product.price * product.count)
        //     .reduce((prev, curr) => prev + curr, 0);

        // const newCart = await Cart.create({
        //     products,
        //     cartTotal: totalPrice,
        //     orderBy: user._id
        // })
        console.log(newCart);
        res.json(newCart)
    } catch (error) {
        throw new Error(error);
    }
  });

  export const getUserCart = asyncHandler( async(req, res) => {
    const {_id} = req.user;
    try {
        const cartUser = await Cart.find({userId: _id})
            .populate( "productId userId color",
            [ "title","firstName", "lastName", "price", 'images'])
        res.json(cartUser);
    } catch (error) {
        throw new Error(error);
    }
  })

  export const removeFromCard = asyncHandler( async(req, res) => {
    const { _id } = req.user;
    const {cartId} = req.body;
    validateMongodbId(_id);
    try {
        const deletedCart = await Cart.deleteOne({userId: _id, _id: cartId}) 
        res.json(deletedCart)
    } catch (error) {
        throw new Error(error)
    }
  })

  export const updateCartItem = asyncHandler( async(req, res) => {
    const { _id } = req.user;
    const {cartId, price, option} = req.body;
    validateMongodbId(_id);
    console.log(price);
    try {
        const updatedCartItem = await Cart.updateOne(
            {userId: _id, _id: cartId},
            { $inc: { 
                price: option == 'inc'? 1 * price : option == 'dec' && -1 * price,
                quantity: option == 'inc'? 1 : option == 'dec' && -1 
            },
            },
            {new: true}
        ) 
        res.json(updatedCartItem)
    } catch (error) {
        throw new Error(error)
    }
  })

  export const emptyCart = asyncHandler( async(req, res) => {
    const { _id } = req.user; 
    validateMongodbId(_id);
    try {
        const user = await User.findById(_id)
        await Cart.findOneAndDelete({orderBy: user._id}) 
        res.json({message: "Cart Successfuly Removed!"})
    } catch (error) {
        throw new Error(error)
    }
  });

  export const applyCoupon = asyncHandler( async(req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const validCoupon = await Coupon.findOne({ name: coupon});
        if (!validCoupon) throw new Error("Coupon not Invalid");

        const user = await User.findById(_id);
        const { cartTotal } = await Cart.findOne({ orderBy: user._id});
        const totalAfterDiscount = 
            (cartTotal 
            - (cartTotal * validCoupon.discount / 100))
            .toFixed(2)
        const cartAfterDiscount = await Cart.findOneAndUpdate(
            { orderBy: user._id},
            {totalAfterDiscount},
            {new: true}
        )
        res.json(cartAfterDiscount);
    } catch (error) {
        throw new Error(error);
    }
  });

  export const getUserOrders = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const orders = await Order.find({ orderBy:{ _id: id }})
            .populate('orderBy products.product',
                ['title', 'price','firstName','lastName', 'product._id', 'orderBy._id'])
        res.json(orders);
    } catch (error) {
        throw new Error(error)
    }
  })

  export const createOrder = asyncHandler( async(req, res) => {
    //const {shippingInfo, orderItem, totalPrice, totalPriceAfterDiscount, paymentInfo} = req.body;
    const {_id} = req.user;
    try {
        const order = await Order.create({
            ...req.body,
            userId: _id,
        })
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
  })

  export const getAllOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find()
            .populate('orderBy products.product',
                ['title', 'price','firstName','lastName', 'product._id', 'orderBy._id'])
        res.json(orders);
    } catch (error) {
        throw new Error(error)
    }
  })

