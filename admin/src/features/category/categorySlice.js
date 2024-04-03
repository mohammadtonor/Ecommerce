import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
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

export const getOnePCategory = createAsyncThunk(
    'category/getOnePCategory',
    async (id, thunkAPI) => {
        try {
            return await categoryService.getOnePCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updatePCategory = createAsyncThunk(
    'category/updatePCategory',
    async (data, thunkAPI) => {
        try {
            const {id , category} = data
            return await categoryService.updatePCategory(id, category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deletePCategory = createAsyncThunk(
    'category/deletePCategory',
    async (id, thunkApi) => {
        try {
            return await categoryService.deletePCategory(id);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)
 
export const resetState = createAction("Reset_All");

const initialState = {
    categories: [],
    createdCat: null,
    updatedCat: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    catName: ""
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
            })
            .addCase(createCategory.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
            .addCase(updatePCategory.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(updatePCategory.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedCat = action.payload
                }    
            )
            .addCase(updatePCategory.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                }
            )
            .addCase(getOnePCategory.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(getOnePCategory.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.catName = action.payload.name
                }
            )
            .addCase(getOnePCategory.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deletePCategory.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(deletePCategory.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload
                }
            )
            .addCase(deletePCategory.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default categorySlice.reducer