"use client";
import { useRef, useState } from "react";
import Controls from "../musicbar/Control";
import Progressbar from "../musicbar/Progressbar";
//import playlist from "./platlists";
import SongInfo from "./song-info";
import useAudioPlayer from "./audioplayer/hook";
import MusicleftPart from "./leftPart/MusicLeftPart";
import { Playlist, Track } from "./audioplayer/type";
import React from "react";

const AudioPlayer = ({playlist} : any) => {
  console.log("playlist data : ", playlist)
  const {
    playNextTrack,
    playPreviousTrack,
    playerState,
    togglePlayPause,
    toggleRepeat,
    toggleShuffle,
    setPlaybackPosition,
    muteSound,
    handleVolumeChange,
  } = useAudioPlayer(playlist);

  const {
    repeat,
    playbackState,
    shuffle,
    currentTrackDuration,
    currentTrackPlaybackPosition,
    currentTrackMetadata,
  } = playerState;

  function setProgress(value: number) {
    if (currentTrackDuration !== null) {
      setPlaybackPosition((value / 100) * currentTrackDuration);
    }
  }
  function computeProgress(): number {
    const noProgress =
      currentTrackDuration === null ||
      currentTrackPlaybackPosition === null ||
      currentTrackDuration === 0;

    if (noProgress) return 0;
    else {
      return (currentTrackPlaybackPosition / currentTrackDuration) * 100;
    }
  }

  return (
    <>
      <div className="fixed flex flex-row backdrop-blur-lg justify-center content-center space-x-16 bottom-[24px] bg-yellow-500/30  w-full h-[140px] ">
        <div className="items-center content-center justify-center z-[200] w-[300px]">
          <SongInfo
            title={currentTrackMetadata?.title}
            writer={currentTrackMetadata?.writer}
            image={currentTrackMetadata?.image}
          />
        </div>

        <div className="flex flex-col items-center space-y-6 pt-2 w-[700px]">
          <Controls
            onShuffleClick={toggleShuffle}
            onRepeatClick={toggleRepeat}
            onPrevClick={playPreviousTrack}
            onNextClick={playNextTrack}
            onPlayClick={togglePlayPause}
            isPlaying={playbackState === "PLAYING"}
            repeat={repeat}
            shuffle={shuffle} currentTrackDuration={undefined} currentTrackPlaybackPosition={undefined}          />
          <Progressbar
            rightLabel={formatTime(currentTrackDuration)}
            leftLabel={formatTime(currentTrackPlaybackPosition)}
            onChange={setProgress}
            progress={computeProgress()}
          />
        </div>

        <div className="w-[300px]">
          <MusicleftPart
            muteSound={muteSound}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;

function formatTime(timeInSeconds: number | null): string {
  if (timeInSeconds === null) return "";
  const numberOfMinutes = Math.floor(timeInSeconds / 60);
  const numberOfSeconds = Math.floor(timeInSeconds - numberOfMinutes * 60);
  const minutes = `${numberOfMinutes}`.padStart(2, "0");
  const seconds = `${numberOfSeconds}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}