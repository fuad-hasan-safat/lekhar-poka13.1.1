// 'use client'
// import { useEffect, useState } from "react";
// import {
//   Controls,
//   PlaybackState,
//   PlayerState,
//   Playlist,
//   TrackMetadata,
// } from "./type";

export function createAudioplayer(
  playlist,
  onStateChange,
) {

// ----------------------------------
// ------------ Log in and conditions -------------

// const [status, setStatus] = useState("");
//   const [username, setUsername] = useState("");
//   const [userUuid, setUserUuid] = useState("");
//   const [userPhone, setUserPhone] = useState("");
//   const [userToken, setUserToken] = useState("");

//   useEffect(() => {
//     setUsername(localStorage.getItem('name')|| '');
//     setUserUuid(localStorage.getItem('uuid')|| '')
//     setUserPhone(localStorage.getItem('phone')|| '')
//     setUserToken(localStorage.getItem('token')|| '')
//   }, []);

// ----------------------------------


  let currentTrackIndex = 0;
  let repeat = false;
  let shuffle = false;
  const playbackHistory = [];
  const audioElement = new Audio();


  /* === PlayerState === */
  //#region
  function emitCurrentPlayerState() {
    const state = computeCurrentPlayerState();
    onStateChange(state);
  }

  function computeCurrentPlayerState() {
    return {
      currentTrackMetadata: getCurrentTrackMetadata(),
      currentTrackDuration: getCurrentTrackDuration(),
      currentTrackPlaybackPosition: getCurrentTrackPlaybackPosition(),
      playbackState: getPlaybackState(),
      repeat,
      shuffle,
    };
  }

  function getCurrentTrackMetadata() {
    if (currentTrackIndex < playlist.length) {
      return playlist[currentTrackIndex].metadata;
    } else {
      return null;
    }
  }

  function getCurrentTrackDuration() {
    return isNaN(audioElement.duration) ? null : audioElement.duration;
  }

  function getCurrentTrackPlaybackPosition() {
    return isNaN(audioElement.currentTime) ? null : audioElement.currentTime;
  }

  function getPlaybackState(){
    return audioElement.paused ? "PAUSED" : "PLAYING";
  }
  //#endregion

  /* === Event Listener === */
  //#region
  function setupAudioElementListeners() {
    audioElement.addEventListener("playing", emitCurrentPlayerState);
    audioElement.addEventListener("pause", emitCurrentPlayerState);
    audioElement.addEventListener("ended", onCurrentTrackEnded);
    audioElement.addEventListener("timeupdate", emitCurrentPlayerState);
    audioElement.addEventListener("loadeddata", emitCurrentPlayerState);
  }

  function removeAudioElementListeners() {
    audioElement.removeEventListener("playing", emitCurrentPlayerState);
    audioElement.removeEventListener("pause", emitCurrentPlayerState);
    audioElement.removeEventListener("ended", onCurrentTrackEnded);
    audioElement.removeEventListener("timeupdate", emitCurrentPlayerState);
    audioElement.removeEventListener("loadeddata", emitCurrentPlayerState);
  }

  function onCurrentTrackEnded() {
    if (repeat) {
      replayCurrentTrack();
    } else {
      playNextTrack();
    }
  }

  //#endregion

  /* === Track handling === */
  //#region
  function replayCurrentTrack() {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  function loadTrack(index) {
    audioElement.src = playlist[index].audioSrc;
    audioElement.load();
    currentTrackIndex = index;
  }

  function computeNextTrackIndex() {
    return shuffle ? computeRandomTrackIndex() : computeSubsequentTrackIndex();
  }

  function computeSubsequentTrackIndex() {
    return (currentTrackIndex + 1) % playlist.length;
  }

  function computeRandomTrackIndex() {
    if (playlist.length === 1) return 0;
    const index = Math.floor(Math.random() * (playlist.length - 1));
    return index < currentTrackIndex ? index : index + 1;
  }
  //#endregion

  /* === Init & Cleanup === */
  //#region
  function init() {
    setupAudioElementListeners();
    audioElement.volume = 0.5;
    loadTrack(0);
  }

  function cleanup() {
    removeAudioElementListeners();
    audioElement.pause();
  }
  //#endregion

  /* === Controls === */
  //#region
  function setPlaybackPosition(position) {
    if (isNaN(position)) return;
    audioElement.currentTime = position;
  }

  function toggleShuffle() {
    shuffle = !shuffle;
    emitCurrentPlayerState();
  }

  function toggleRepeat() {
    repeat = !repeat;
    emitCurrentPlayerState();
  }

  function playNextTrack() {
    playbackHistory.push(currentTrackIndex);
    const nextTrackIndex = computeNextTrackIndex();
    loadTrack(nextTrackIndex);
    audioElement.play();
  }

  function playPreviousTrack() {
    if (playbackHistory.length === 0 || audioElement.currentTime > 5) {
      replayCurrentTrack();
    } else {
      const previousTrackIndex = playbackHistory.pop();
      loadTrack(previousTrackIndex);
      audioElement.play();
    }
  }

  function togglePlayPause() {

    
    //console.log('audio current time: ------>>>>>>', audioElement.currentTime)
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  function muteSound() {
    if (audioElement.muted) {
      audioElement.muted = false;
    } else {
      audioElement.muted = true;
    }
  }

  function handleVolumeChange(event) {
    audioElement.volume = Number(event.target.value);
  }
  //#endregion

  init();
  return {
    setPlaybackPosition,
    toggleShuffle,
    toggleRepeat,
    playNextTrack,
    playPreviousTrack,
    togglePlayPause,
    cleanup,
    muteSound,
    handleVolumeChange,
  };
}
