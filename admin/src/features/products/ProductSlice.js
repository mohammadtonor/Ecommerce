import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
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

export const getOneProduct = createAsyncThunk(
    'product/getOneProduct',
    async (id, thunkAPI) => {
        try {
            return await productService.getOneProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateOneProduct = createAsyncThunk(
    'product/updateOneProduct',
    async ({id, productData}, thunkAPI) => {
        try {
            return await productService.updateOneProduct(id, productData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteOneProduct = createAsyncThunk(
    'product/deleteOneProduct',
    async (id, thunkAPI) => {
        try {
            return await productService.deleteOneProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetProduct = createAction("ResetProduct")

const initialState = {
    products: [],
    createdProduct: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    productData: null,
    updatedProduct: null,
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
            .addCase(getOneProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneProduct.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.productData = action.payload;
            })
            .addCase(getOneProduct.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(updateOneProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOneProduct.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedProduct = action.payload;
            })
            .addCase(updateOneProduct.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                }
            )
            .addCase(deleteOneProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOneProduct.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload;
            })
            .addCase(deleteOneProduct.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            
            })
            .addCase(resetProduct, () => initialState)
    }
})


export default productSlice.reducer