import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userPostSlice from './userpost-slice';
import userSessionSlice from './usersession-slice';
import toastSlice from './toast-slice';
import audioplayerSlice from './audioplayer-slice';
import playlistSlice from './playlist-slice';
import categorySlice from './category-slice';
import postSlice from './post-slice';

const rootReducer = combineReducers({
    userpost: userPostSlice.reducer,
    usersession: userSessionSlice.reducer,
    toast: toastSlice.reducer,
    audioplayer: audioplayerSlice.reducer,
    playlist: playlistSlice.reducer,
    category: categorySlice.reducer,
    posts: postSlice.reducer,
});


// Configure the store
const store = configureStore({
    reducer: rootReducer,
});


export default store;
