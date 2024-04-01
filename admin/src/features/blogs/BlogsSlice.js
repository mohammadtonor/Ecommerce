import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import blogsService from './BlogsService';

export const getBlogs = createAsyncThunk(
    'blogs/getblogs',
    async (thunkAPI) => {
        try {
            return await blogsService.getBlogs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createBlog = createAsyncThunk(
    'blog/createblog',
    async (blog, thunkAPI) => {
        try {
            return await blogsService.createBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    blogs: [],
    createdBlog: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.blogs = action.payload;
                    state.message = "success"
            })
            .addCase(getBlogs.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createdBlog = action.payload;
                    state.message = "success"
            })
            .addCase(createBlog.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
    }
})


export default blogsSlice.reducer