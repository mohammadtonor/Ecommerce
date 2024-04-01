import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './ProductService';

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (product, thunkAPI) => {
        try {
            return await productService.addProduct(product);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    products: [],
    createdProduct: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.products = action.payload;
                    state.message = "success"
            })
            .addCase(getProducts.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdProduct = action.payload;
                    state.message = "success"
            })
            .addCase(addProduct.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default productSlice.reducer