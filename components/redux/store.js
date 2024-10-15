import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import userPostSlice from './userpost-slice';
import userSessionSlice from './usersession-slice';
import toastSlice from './toast-slice';
import audioplayerSlice from './audioplayer-slice';
import playlistSlice from './playlist-slice';
import categorySlice from './category-slice';
import postSlice from './post-slice';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Combine your reducers
const rootReducer = combineReducers({
    userpost: userPostSlice.reducer,
    usersession:userSessionSlice.reducer,
    toast: toastSlice.reducer,
    audioplayer: audioplayerSlice.reducer,
    playlist: playlistSlice.reducer,
    category: categorySlice.reducer,
    posts: postSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
