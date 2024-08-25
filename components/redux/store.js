import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import userPostSlice from './userpost-slice';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Combine your reducers
const rootReducer = combineReducers({
    userpost: userPostSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
