import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import colorsService from './ColorService';

export const getColors = createAsyncThunk(
    'color/getColors',
    async (thunkAPI) => {
        try {
            return await colorsService.getColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.colors = action.payload;
                    state.message = "success"
            })
            .addCase(getColors.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default colorSlice.reducer