import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const updateImages = createAsyncThunk(
    'upload/UpdateImages',
    (images, thunkAPI) => {
        return images;
    } 
)

export const resetImages = createAction("Reset_All_Imags")

export const uploadSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadImage.pending,
            (state) => {
                state.isLoading = true;
                state.isSuccess = false 
                state.isError = false    
            })
            .addCase(uploadImage.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    Array.isArray(action.payload) &&
                        state.images.push(...action.payload?.filter(image => !!image.url))
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
                    state.images.forEach(image => {
                        image.public_id !== action.payload && filterimage.push(image); 
                    })
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
            .addCase(updateImages.fulfilled , (state, action) => {
                state.images = [];
                Array.isArray(action.payload) &&
                state.images.push(...action.payload?.filter(image => !!image.url))
            })
            .addCase(resetImages , () => initialState)

    }
})

export default uploadSlice.reducer