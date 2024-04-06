import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../features/users/userSlice';
import productReducer from '../features/products/productSlice';
import blogReducer from '../features/blog/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productReducer,
    blogs: blogReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});