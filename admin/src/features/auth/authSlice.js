
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
    orders:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    orderByUsers: []
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

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (thunkAPI) => {
      try {
          return await authService.getOrders();
      } catch (error) {
          return thunkAPI.rejectWithValue(error)
      }
  }
)

export const getOrderByUser = createAsyncThunk(
    'order/getOrderByUser',
    async (userId, thunkAPI) => {
        try {
            return await authService.getOrderByUser(userId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

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
                    state.message = action.payload.response.data.message;
                    state.user = null;
                    state.isSuccess = false;
            })
            .addCase(getOrders.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(getOrders.fulfilled,
              (state, action) => {
                  state.isLoading = false;
                  state.isError = false;
                  state.isSuccess = true;
                  state.orders = action.payload;
                  state.message = "success"
          })
          .addCase(getOrders.rejected,
              (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.isSuccess = false;
                  state.message = action.error;
          })
          .addCase(getOrderByUser.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(getOrderByUser.fulfilled,
              (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderByUsers = action.payload;
          })
          .addCase(getOrderByUser.rejected,
              (state, action) => {
                 state.isLoading = false;
                 state.isError = true;
                 state.isSuccess = false;
                 state.message = action.error;
          })
    }
})

export default authSlice.reducer