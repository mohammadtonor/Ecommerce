import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import blogService from "./blogService";

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async (thunkAPI) => {
        try {
            return await blogService.getBlogs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getBlogcategories = createAsyncThunk(
    "blog/getBlogcats",
    async (blog, thunkAPI) => {
        try {
            return await blogService.getBlogcategories(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOneBlog = createAsyncThunk(
    "blog/getOneBlog",
    async (id, thunkAPI) => {
        try {
            return await blogService.getOneBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    blogcategories: [],
    blogData: null
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        resetState: (state) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder
           .addCase(getBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
            })
           .addCase(getBlogs.pending, (state) => {
                state.isLoading = true
            })
           .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getBlogcategories.pending, 
                (state) => {
                    state.isLoading = true
            })
            .addCase(getBlogcategories.fulfilled, 
                (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.blogcategories = action.payload
            })
            .addCase(getBlogcategories.rejected, 
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.isSuccess = false
                    state.message = action.error
            })
            .addCase(getOneBlog.pending, 
                (state) => {
                    state.isLoading = true
            })
            .addCase(getOneBlog.fulfilled, 
                (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.blogData = action.payload
                }
            ).addCase(getOneBlog.rejected, 
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.isSuccess = false
                    state.message = action.error
            })
    },
})

export default blogSlice.reducer

