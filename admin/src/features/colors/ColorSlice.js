import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
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

export const createColor = createAsyncThunk(
    'color/createColors',
    async (color,thunkAPI) => {
        try {
            return await colorsService.createColors(color);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOneColor = createAsyncThunk(
    'color/getOneColors',
    async (id,thunkAPI) => {
        try {
            return await colorsService.getOneColors(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateColor = createAsyncThunk(
    'color/updateColor',
    async ({id, color},thunkAPI) => {
        try {
            return await colorsService.updateColor(id, color);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteColor = createAsyncThunk(
    'color/deleteColor',
    async (id, thunkApi) => {
        try {
            return await colorsService.deleteColor(id);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_All');

const initialState = {
    colors: [],
    createdColor: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    colorTitle: "",
    updatedColor: null
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
            })
            .addCase(getColors.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdColor = action.payload;
                    state.message = "success"
            })
            .addCase(createColor.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getOneColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneColor.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.colorTitle = action.payload.title;
                    state.message = "success"
            })
            .addCase(getOneColor.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedColor = action.payload;
                    state.message = "success"
            })
            .addCase(updateColor.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deleteColor.pending, 
                (state) => {
                    state.isLoading = true
            })
            .addCase(deleteColor.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload; 
                }
            )
            .addCase(deleteColor.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default colorSlice.reducer