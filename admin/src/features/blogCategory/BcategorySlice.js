import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BcategoryService from './BCategoryService';

export const getBCategories = createAsyncThunk(
    'bcategory/getBCategories',
    async (thunkAPI) => {
        try {
            return await BcategoryService.getBcategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const createBCategory = createAsyncThunk(
    'bcategory/createBCategory',
    async (bCategory ,thunkAPI) => {
        try {
            return await BcategoryService.createBCategory(bCategory);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    BCategories: [],
    createdBCattegory: null,
    CreatedBCat: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const BCategorySlice = createSlice({
    name: 'BCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBCategories.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.BCategories = action.payload;
                    state.message = "success"
            })
            .addCase(getBCategories.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(createBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBCategory.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdBCattegory = action.payload;
                    state.message = "success"
            })
            .addCase(createBCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default BCategorySlice.reducer