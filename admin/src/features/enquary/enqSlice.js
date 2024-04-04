import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
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

export const deleteEnquary = createAsyncThunk(
    'enquary/deleteEnquary',
    async (id, thunkAPI) => {
        try {
            return await enqService.deleteEnquary(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOneEnquary = createAsyncThunk(
    'enquary/getOneEnquary',
    async (id, thunkAPI) => {
        try {
            return await enqService.getOneEnquiry(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateEnquary = createAsyncThunk(
    'enquary/updateEnquary',
    async ({id, enqData}, thunkAPI) => {
        try {
            return await enqService.updateEnquary(id, enqData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction("Reset_All")

const initialState = {
    enquary: [],
    updatedEnquary: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    enquaryData: null
}

export const enqSlice = createSlice({
    name: 'enquary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquary.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getEnquary.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.enquary = action.payload;
                    state.updatedEnquary = null;
            })
            .addCase(getEnquary.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deleteEnquary.pending, (state) => {
                state.isLoading = true;
                state.message = null
            })
            .addCase(deleteEnquary.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload
            })
            .addCase(deleteEnquary.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getOneEnquary.pending,
                (state) => {
                    state.isLoading = true;
                    state.message = null
            })
            .addCase(getOneEnquary.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.enquaryData = action.payload
            })
            .addCase(getOneEnquary.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(updateEnquary.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(updateEnquary.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedEnquary = action.payload
            })
            .addCase(updateEnquary.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
})


export default enqSlice.reducer