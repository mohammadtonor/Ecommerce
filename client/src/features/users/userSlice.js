import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';
import { getCustomerfromStorage } from '../../utils/configToken';

export const regiterUser = createAsyncThunk(
    'auth/registerUser',
    async (data, thunkAPI) => {
        try {
            return await userService.registerUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data, thunkAPI) => {
        try {
            return await userService.loginUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductWhishlist = createAsyncThunk(
    'auth/getProductWhishlist',
    async (thunkAPI) => {
        try {
            return await userService.getProductWhishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    user: getCustomerfromStorage,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(regiterUser.pending, (state) => {
                state.isLoading = true;
            })
           .addCase(regiterUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.user = action.payload;
            })
           .addCase(regiterUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(loginUser.pending, 
                (state,) => {
                    state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    if (state.isSuccess) {
                        localStorage.setItem('token', action.payload.token);
                    }
                    state.user = action.payload;
            })
            .addCase(loginUser.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getProductWhishlist.pending, 
                (state,) => {
                    state.isLoading = true;
            })
            .addCase(getProductWhishlist.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.whishlist = action.payload;
            })
            .addCase(getProductWhishlist.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    } 
})

export default  authSlice.reducer;