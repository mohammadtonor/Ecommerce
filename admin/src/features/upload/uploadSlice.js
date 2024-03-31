import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import uploadService from './upload.Sevice';

const initialState = {
    images: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const uploadImage = createAsyncThunk(
    'upload/uploadImage',
    async (files,thunkAPI) => {
        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('images', file);
            });
            console.log(formData);
            return await uploadService.uploadImage(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteImage = createAsyncThunk(
    'upload/deleteImage',
    async (id,thunkAPI) => {
        try {
            return await uploadService.deleteImage(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const uploadSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadImage.pending,
            (state) => {
                state.isLoading = true;     
            })
            .addCase(uploadImage.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.images = action.payload;
                    state.message = "success"
            })
            .addCase(uploadImage.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(deleteImage.pending, 
                (state) => {
                    state.isLoading = true;
                }
            ).addCase(deleteImage.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.images = [];
                    state.message = "success"
                }
            ).addCase(deleteImage.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.payload;
                }
            )

    }
})

export default uploadSlice.reducer