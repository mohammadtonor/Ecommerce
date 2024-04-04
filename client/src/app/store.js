import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});