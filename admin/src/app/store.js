import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './../features/auth/authSlice'
import customerReducer from './../features/customers/customerSlice';
import productReducer from './../features/products/ProductSlice';
import brandReducer from './../features/brands/BrandSlice';
import colorReducer from './../features/colors/ColorSlice';
import categoryReducer from './../features/category/categorySlice';
import blogsReducer from './../features/blogs/BlogsSlice';
import BCategoryReducer from './../features/blogCategory/BcategorySlice';
import enqReducer from './../features/enquary/enqSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  product: productReducer,
  brand: brandReducer,
  color: colorReducer,
  category: categoryReducer,
  blog: blogsReducer,
  bCategory: BCategoryReducer,
  enquary: enqReducer,
});

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