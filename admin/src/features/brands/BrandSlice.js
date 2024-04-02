import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
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

export const getBrandById = createAsyncThunk(
    'brand/getBrandById',
    async (id,thunkAPI) => {
        try {
            return await brandService.getBrandById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateBrand = createAsyncThunk(
    'brand/updateBrand',
    async (brand,thunkAPI) => {
        try {
            return await brandService.updateBrand(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteBrand = createAsyncThunk(
    'brand/deleteBrand',
    async (id,thunkAPI) => {
        try {
            return await brandService.deleteBrand(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_All');

const initialState = {
    brands: [],
    isError: false,
    createdBrand: null,
    updatedBrand: null,
    isLoading: false,
    isSuccess: false,
    isUSuccess: false,
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
            .addCase(resetState, () => initialState)
            .addCase(getBrandById.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(getBrandById.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.brandTitle = action.payload.title;
                    state.message = "success"
            })
            .addCase(getBrandById.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isUSuccess = true;
                    state.brands = []
                    state.updatedBrand = action.payload;
                    state.message = "success"
            })
            .addCase(updateBrand.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isUSuccess = true;
                    state.message = action.payload
            })
            .addCase(deleteBrand.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })

    }
})

export default brandSlice.reducer