import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
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

export const getOneBlog = createAsyncThunk(
    'blog/getOneBlog',
    async (id, thunkAPI) => {
        try {
            return await blogsService.getOneBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateBlog = createAsyncThunk(
    'blog/updateBlog',
    async ({ id, blogData }, thunkAPI) => {
        try {
            return await blogsService.updateBlog(id, blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteBlog = createAsyncThunk(
    'blog/deleteBlog',
    async (id, thunkAPI) => {
        try {
            return await blogsService.deleteBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction("Reset_all")

const initialState = {
    blogs: [],
    createdBlog: null,
    updatedBlog: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    blogData: null
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
                    state.createdBlog = null;
                    state.updatedBlog = null;
                    state.message = null;
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
            })
            .addCase(createBlog.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(getOneBlog.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(getOneBlog.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.blogData = action.payload;
                    state.createdBlog = null;
                    state.updatedBlog = null;
            })
            .addCase(getOneBlog.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(updateBlog.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedBlog = action.payload;
            })
            .addCase(updateBlog.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                }
            )
            .addCase(deleteBlog.pending, 
                (state) => {
                    state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload
            })
            .addCase(deleteBlog.rejected, 
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
})


export default blogsSlice.reducer