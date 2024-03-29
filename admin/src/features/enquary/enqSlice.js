import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import enqService from './enqService';

export const getEnquary = createAsyncThunk(
    'enquary/getEnquary',
    async (thunkAPI) => {
        try {
            return await enqService.getEnquary();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    enquary: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const enqSlice = createSlice({
    name: 'enquary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquary.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquary.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.enquary = action.payload;
                    state.message = "success"
            })
            .addCase(getEnquary.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default enqSlice.reducer