import { createSlice } from "@reduxjs/toolkit";

const audioplayerSlice = createSlice({
    name: 'audioplayer',
    initialState: {
        isAudioPlaying: false,
        currentPlaylistindex: -1,
        currentAudioScope: null,
        currentAudio: {
            id: null,
            title: null,
            src: null,
            writer: null,
            image: null
        },
        currentPlaylist: []
    }, reducers:{
        togglePlay(state, action){
            if(state.isAudioPlaying){
                state.isAudioPlaying = false;
            }

            if(!state.isAudioPlaying){
                state.currentPlaylistindex = action.payload.audioIndex;
                state.currentAudioScope = action.payload.audioscope;
                state.currentPlaylist = action.payload.audioList;
            }
        }
    }
})