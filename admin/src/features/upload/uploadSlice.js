import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import uploadService from './upload.Sevice';

const initialState = {
    images: [],
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
                    if (state?.images === null || state?.images === undefined ) {
                        state.images = []
                    }
                    state.images.push(...action.payload);
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
                    const filterimage = []
                    !state.images.find(image => image.public_id === undefined)  && Array.isArray(state.images)
                       ? state.images.forEach(image => {
                            image.public_id !== action.payload && filterimage.push(image);
                        })
                        : state.images.forEach(image => image.public_id === undefined);
                    state.images = filterimage;
                    state.message = "success"
                }
            ).addCase(deleteImage.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    //state.images = [];
                    state.isSuccess = false;
                    state.message = action.payload;
                }
            )

    }
})

export default uploadSlice.reducer