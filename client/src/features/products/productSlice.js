import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService'

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

export const addToWishList = createAsyncThunk(
    'product/addToWishList',
    async (productId, thunkAPI) => {
        try {
            return await productService.addToWishList(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOneProduct = createAsyncThunk(
    'product/getOneProduct',
    async (id, thunkApi) => {
        try {
            return await productService.getOneProduct(id);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const initialState = {
    products:null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: null,
    addToWishlist: null,
    productData: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getProducts.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
        })
        .addCase(getProducts.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
        })
        .addCase(addToWishList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToWishList.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                console.log(action.payload);
                state.addToWishlist = action.payload
                state.message = "Product Added to your whishlist";
        })
        .addCase(addToWishList.rejected,
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
    }
})

export default productSlice.reducer