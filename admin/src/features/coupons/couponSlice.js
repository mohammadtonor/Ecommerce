import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import couponService from './couponService';

export const getCoupons = createAsyncThunk(
    'coupon/getCoupons',
    async (thunkAPI) => {
        try {
            return await couponService.getCoupons();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addCoupon = createAsyncThunk(
    'coupon/addCoupon',
    async (coupon,thunkAPI) => {
        try {
            return await couponService.addCoupon(coupon);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOneCoupon = createAsyncThunk(
    'coupon/getOneCoupon',
    async (id,thunkAPI) => {
        try {
            return await couponService.getOneCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateCoupon = createAsyncThunk(
    'coupon/updateCoupon',
    async (data,thunkAPI) => {
        try {
            const {id, couponData} = data
            return await couponService.updateOneCoupon(id ,couponData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/deleteCoupon',
    async (id, thunkAPI) => {
        try {
            return await couponService.deleteOneCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_All');

const initialState = {
    coupons: [],
    createdCoupon: null,
    updatedCoupon: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    couponData: null
}

export const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdCoupon = null;
                    state.updatedCoupon = null;
                    state.message = null;
                    state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(addCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCoupon.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdCoupon = action.payload;
            })
            .addCase(addCoupon.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
            .addCase(updateCoupon.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(updateCoupon.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedCoupon = action.payload
            })
            .addCase(updateCoupon.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getOneCoupon.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(getOneCoupon.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdCoupon = null;
                    state.updatedCoupon = null;
                    state.couponData = action.payload
            })
            .addCase(getOneCoupon.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deleteCoupon.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload
            })
            .addCase(deleteCoupon.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default couponSlice.reducer