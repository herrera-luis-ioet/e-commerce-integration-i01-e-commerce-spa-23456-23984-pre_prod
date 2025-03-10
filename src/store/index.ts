import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

// Import reducers
import productReducer from './slices/productSlice';

// Define the root reducer
const rootReducer = combineReducers({
  products: productReducer,
  // Add more reducers here as the application grows
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // key for localStorage
  storage, // use localStorage
  whitelist: ['products'], // only persist these reducers
  // blacklist: [], // don't persist these reducers
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types as they are used by redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['products.selectedProduct.reviews'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persisted store
export const persistor = persistStore(store);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;