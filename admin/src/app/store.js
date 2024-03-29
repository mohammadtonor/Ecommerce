import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './../features/auth/authSlice'
import customerReducer from './../features/customers/customerSlice';

const rootReducer = combineReducers({ auth: authReducer, customer: customerReducer });

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),    
});

export const persistor = persistStore(store);