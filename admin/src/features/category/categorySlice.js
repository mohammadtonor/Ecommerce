import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import categoryService from './categoryService';

export const getcategories = createAsyncThunk(
    'category/getcategories',
    async (thunkAPI) => {
        try {
            return await categoryService.getcategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.createCategory(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
 
const initialState = {
    categories: [],
    createdCat: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getcategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getcategories.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.categories = action.payload;
                    state.message = "success"
            })
            .addCase(getcategories.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdCat = action.payload;
                    state.message = "success"
            })
            .addCase(createCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default categorySlice.reducer