import { createSlice } from "@reduxjs/toolkit";

const audioplayerSlice = createSlice({
    name: 'audioplayer',
    initialState: {
        isAudioPlaying: false,
        currentAudioIndex: -1,
        currentSongId: null,
        currentSongPlayedTime: 0,
        currentAudioScope: null,
        currentPlaylist: [],
        isShuffle: false,
        isRepeat: false,

    }, reducers: {
        togglePlay(state, action) {
            if (state.isAudioPlaying) {
                if (state.currentAudioIndex === action.payload.audioIndex && state.currentAudioScope === action.payload.audioscope) {
                    state.isAudioPlaying = false;
                } else if (state.currentAudioScope === action.payload.audioscope && state.currentAudioIndex !== action.payload.audioIndex) {
                    state.currentAudioIndex = action.payload.audioIndex;
                    state.currentSongId = action.payload.currentSongId;

                }else{
                    state.currentAudioIndex = action.payload.audioIndex;
                    state.currentAudioScope = action.payload.audioscope;
                    state.currentPlaylist = action.payload.audioList;
                    state.currentSongId = action.payload.currentSongId;
                }
            }

            else if (!state.isAudioPlaying && state.currentAudioScope && state.currentAudioScope === action.payload.audioscope) {
                state.isAudioPlaying = true;
            }

            else if (!state.isAudioPlaying) {
                state.currentAudioIndex = action.payload.audioIndex;
                state.currentAudioScope = action.payload.audioscope;
                state.currentPlaylist = action.payload.audioList;
                state.currentSongId = action.payload.currentSongId;
                state.isAudioPlaying = true;
            }
        },
        togglePlayAudioBar(state) {
            state.isAudioPlaying = !state.isAudioPlaying;
        },
        toggleShuffle(state) {
            state.isShuffle = !state.isShuffle;
        },
        toggleRepeat(state) {
            state.isRepeat = !state.isRepeat;
        },
        stopAudioPlaying(state) {
            state.isAudioPlaying = false;
        },
        setCurrentAudioIndex(state, action) {
            state.currentAudioIndex = action.payload;
        },
        setCurrntAudioId(state, action){
            state.currentSongId = action.payload;
        },
        setCurrentSongPlayedTime(state, action){
            state.currentSongPlayedTime = action.payload;
        }

    }
})

export const audioPlayerAction = audioplayerSlice.actions;

export default audioplayerSlice;