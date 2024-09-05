import { createSlice } from "@reduxjs/toolkit";

const audioplayerSlice = createSlice({
    name: 'audioplayer',
    initialState: {
        isAudioPlayerShouldOpen: false,
        isAudioPlaying: false,
        currentAudioIndex: -1,
        currentSongId: null,
        currentSongPlayedTime: 0,
        currentAudioScope: null,
        currentPlaylist: [],
        isShuffle: false,
        isRepeat: false,
        isMute: false,

    }, reducers: {
        resetAudioPlayer(state) {
            state.isAudioPlaying = false;
            state.isAudioPlayerShouldOpen = false;
            state.currentAudioIndex = -1;
            state.currentSongId = null;
            state.currentSongPlayedTime = 0;
            state.currentAudioScope = null;
            state.currentPlaylist = [];
            state.isShuffle = false;
            state.isRepeat = false;
            state.isMute = false;
        },
        togglePlay(state, action) {
            state.isAudioPlayerShouldOpen = true;
            if (state.isAudioPlaying) {
                if (state.currentSongId === action.payload.currentSongId && state.currentAudioScope === action.payload.audioscope) {
                    state.isAudioPlaying = false;
                } else if (state.currentAudioScope === action.payload.audioscope && state.currentAudioIndex !== action.payload.audioIndex) {
                    state.currentAudioIndex = action.payload.audioIndex;
                    state.currentAudioScope = action.payload.audioscope;
                    state.currentPlaylist = action.payload.audioList;
                    state.currentSongId = action.payload.currentSongId;
                    state.isAudioPlaying = true;

                } else {
                    state.currentAudioIndex = action.payload.audioIndex;
                    state.currentAudioScope = action.payload.audioscope;
                    state.currentPlaylist = action.payload.audioList;
                    state.currentSongId = action.payload.currentSongId;
                    state.isAudioPlaying = true;
                }
            }

            else if (!state.isAudioPlaying && state.currentAudioScope && state.currentAudioScope === action.payload.audioscope) {
                state.currentAudioIndex = action.payload.audioIndex;
                state.currentAudioScope = action.payload.audioscope;
                state.currentPlaylist = action.payload.audioList;
                state.currentSongId = action.payload.currentSongId;
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
        setCurrntAudioId(state, action) {
            state.currentSongId = action.payload;
        },
        setCurrentSongPlayedTime(state, action) {
            state.currentSongPlayedTime = action.payload;
        },
        toggleMute(state) {
            state.isMute = !state.isMute;
        }  
    }
})

export const audioPlayerAction = audioplayerSlice.actions;

export default audioplayerSlice;