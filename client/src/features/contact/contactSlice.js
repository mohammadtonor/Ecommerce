import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import contactService from "./contactService";
import { toast } from "react-toastify";

export const createContact = createAsyncThunk(
    "contact/createContact",
    async (data, thunkAPI) => {
        try {
            return await contactService.createContact(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    contacts: "",
    createdContact: null
}

const contactSlice = createSlice({
    name: "contact",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(createContact.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
           .addCase(createContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdContact = action.payload;
                if (state.isSuccess) {
                    toast.success("Contact created successfully!")
                }
            })
           .addCase(createContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.message;
                if (state.isError) {
                    toast.success("Somthing went wrong!")
                }
            })
    }
})

export default contactSlice.reducer