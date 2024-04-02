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

export const resetState = createAction('Reset_All');

const initialState = {
    coupons: [],
    createdCoupon: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
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
                    state.coupons = action.payload;
                    state.message = "success"
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
                    state.message = "success"
            })
            .addCase(addCoupon.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
})


export default couponSlice.reducer