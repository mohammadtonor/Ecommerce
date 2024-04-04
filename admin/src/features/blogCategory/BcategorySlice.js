import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import BcategoryService from './BCategoryService';
import BCategoryService from './BCategoryService';

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

export const getOneBCategory = createAsyncThunk(
    'category/getOneBcategory',
    async (id, thunkAPI) => {
        try {
            return await BCategoryService.getOneBCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateBCategory = createAsyncThunk(
    'bcategory/updateBCategory',
    async ({id, bCategory},thunkAPI) => {
        try {
            return await BCategoryService.updateBCategory(id, bCategory);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteBCategory = createAsyncThunk(
    'bcategory/deleteBCategory',
    async (id, thunkAPI) => {
        try {
            return await BCategoryService.deleteBCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction("Reset_All")

const initialState = {
    BCategories: [],
    createdBCattegory: null,
    updatedBCategory: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    BCategoryTitle: null
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
                    state.createdBCattegory = null;
                    state.updatedBCategory = null;
                    state.message = null;
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
            })
            .addCase(createBCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(updateBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBCategory.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedBCategory = action.payload;
            })
            .addCase(updateBCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deleteBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBCategory.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload
            })
            .addCase(deleteBCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
            .addCase(getOneBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneBCategory.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.BCategoryTitle = action.payload.title;
                    state.message = null;
                    state.createdBCattegory = null;
                    state.updatedBCategory = null;
            })
            .addCase(getOneBCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default BCategorySlice.reducer