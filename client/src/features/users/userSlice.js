import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';
import { config, getCustomerfromStorage } from '../../utils/configToken';
import {toast} from 'react-toastify';


export const regiterUser = createAsyncThunk(
    'auth/registerUser',
    async (data, thunkAPI) => {
        try {
            return await userService.registerUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data, thunkAPI) => {
        try {
            return await userService.loginUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductWhishlist = createAsyncThunk(
    'auth/getProductWhishlist',
    async (thunkAPI) => {
        try {
            return await userService.getProductWhishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addToCart = createAsyncThunk(
    'auth/addToCart',
    async (product, thunkAPI) => {
        try {
            return await userService.addToCart(product);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getPrroductCarts = createAsyncThunk(
    'auth/getPrroductCarts',
    async (thunkAPI) => {
        try {
            return await userService.getPrroductCarts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'auth/removeFromCart',
    async (cartId, thunkAPI) => {
        try {
            return await userService.removeFromCard(cartId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateCartItem = createAsyncThunk(
    'auth/updateCartItem',
    async (cartItem, thunkAPI) => {
        try {
            return await userService.updateCartItem(cartItem);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const checkout = createAction(
    'auth/checkout',
    async (date, thunkAPI) => {
        try {
            return await userService.checkout(date);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetAuth = createAction("Reset_Auth")

const initialState = {
    user: getCustomerfromStorage,
    createdUser: null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    cartProducts: null,    
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(regiterUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
           .addCase(regiterUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.user = action.payload;
            })
           .addCase(regiterUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(loginUser.pending, 
                (state,) => {
                    state.isLoading = true;
                    state.createdUser= null;
                    state.isSuccess = false;
            })
            .addCase(loginUser.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    if (state.isSuccess) {
                        localStorage.setItem('token', action.payload.token);
                    }
                    state.user = action.payload;
                    state.createdUser = action.payload;
            })
            .addCase(loginUser.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getProductWhishlist.pending, 
                (state,) => {
                    state.isLoading = true;
            })
            .addCase(getProductWhishlist.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.whishlist = action.payload;
            })
            .addCase(getProductWhishlist.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(addToCart.pending, 
                (state,) => {
                    state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.cartProducts = action.payload
                    if (state.isSuccess) {
                        toast.success("Product added to cart successfully")
                    }
            })
            .addCase(addToCart.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getPrroductCarts.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(getPrroductCarts.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.cartProducts = action.payload
            })
            .addCase(getPrroductCarts.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.cartProducts = state.cartProducts?.filter(cart => cart._id !== action.payload?._id)
                if(state.isSuccess) {
                    toast.success("Product Removed Successfully!")
                }
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.cartProducts = state.cartProducts?.map(cart => 
                    cart._id === action.payload._id
                        ? action.payload 
                        : cart
                    )
                if(state.isSuccess) {
                    toast.success("Product Updated Successfully!")
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetAuth, (state) => {
                state.createdUser = null;
                state.isSuccess = false;
            })
            
    } 
})

export default  authSlice.reducer;