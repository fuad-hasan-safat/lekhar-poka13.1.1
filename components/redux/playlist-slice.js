import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        isPlayListChanged: null,
        playListScope: null,
        myPlaylist: [],
        lattestPlaylist: []
    }, reducers: {
        addMyPlaylist(state, action) {
            state.myPlaylist = action.payload;
        },
        addSingleSongToMyPlaylist(state, action){
            state.myPlaylist = [ action.payload, ...state.myPlaylist];
        },
        addLatestPlaylist(state, action) {
            state.lattestPlaylist = action.payload;
        },
        addSingleSongToLatestPlaylist(state, action) {
            console.log('action --', action.payload)
            const existSong = state.lattestPlaylist.find(obj => obj._id === action.payload._id);
            console.log('Existing song -', existSong);

            if (existSong) {
                const restObjects = state.lattestPlaylist.filter(obj => obj._id !== action.payload._id);
                state.lattestPlaylist = [existSong, ...restObjects]

            } else {
                state.lattestPlaylist = [action.payload, ...state.lattestPlaylist]
            }

        },
        removePlayList(state) {
            state.isPlayListChanged = null;
            state.playListScope = null;
            state.myPlaylist = [];
        },
        setPlayListChanged(state, action) {
            state.isPlayListChanged = action.payload;
        },
        setPlayListScope(state, action) {
            state.playListScope = action.payload;
        }
    }
})

export const playlistAction = playlistSlice.actions;

export default playlistSlice;