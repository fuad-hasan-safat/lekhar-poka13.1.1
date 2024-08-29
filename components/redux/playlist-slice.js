import { createSlice } from "@reduxjs/toolkit";
import PlayList from "../AudioBook/components/audioPlaylist/PlayList";

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
        addLatestPlaylist(state, action) {
            state.lattestPlaylist = action.payload;
        }, removePlayList(state) {
            state.isPlayListChanged = null;
            state.playListScope = null;
            state.myPlaylist = [];
            state.lattestPlaylist = [];
        }, setPlayListChanged(state, action){
            state.isPlayListChanged = action.payload;
        }, setPlayListScope(state, action){
            state.playListScope = action.payload;
        }
    }
})

export const playlistAction = playlistSlice.actions;

export default playlistSlice;