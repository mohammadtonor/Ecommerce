
//create slice for auth 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

const userDefultState = {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    mobile: null,
    token:  null,
}

const initialState= {
    user: userDefultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        return await authService.login(userData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(login.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.user = action.payload;
                    state.message = "Success"
            })
            .addCase(login.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.error;
                    state.user = null;
                    state.isSuccess = false;
            })
    }
})

export default authSlice.reducer