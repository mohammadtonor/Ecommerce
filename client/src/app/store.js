import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../features/users/userSlice';
import productReducer from '../features/products/productSlice';
import blogReducer from '../features/blog/blogSlice';
import contactReducer from '../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productReducer,
    blogs: blogReducer,
    contact: contactReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});