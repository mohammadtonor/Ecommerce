import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import brandService from './BransService';

export const getBrands = createAsyncThunk(
    'brand/getBrands',
    async (thunkAPI) => {
        try {
            return await brandService.getBrands();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addBrand = createAsyncThunk(
    'brand/addBrand',
    async (brand,thunkAPI) => {
        try {
            return await brandService.addBrand(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    brands: [],
    createdBrand: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.brands = action.payload;
                    state.message = "success"
            })
            .addCase(getBrands.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(addBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBrand.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdBrand = action.payload;
                    state.message = "success"
            })
            .addCase(addBrand.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default brandSlice.reducer