import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';

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

const initialState = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    user: "",
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
    } 
})

export default  authSlice.reducer;