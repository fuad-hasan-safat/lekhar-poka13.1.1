'use client'

import React, { useState, useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdShuffle,
  MdRepeat
} from "react-icons/md";
import ProgressBar from "react-bootstrap/ProgressBar";
import { apiBasePath } from "../../../utils/constant";
import { replaceUnderscoresWithSpaces } from "../../../function/api";
import { useDispatch, useSelector } from "react-redux";
import { audioPlayerAction } from "../../redux/audioplayer-slice";
import { playlistAction } from "../../redux/playlist-slice";

export default function AudioPlayer() {

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.audioplayer.currentPlaylist);
  const currentAudioIndex = useSelector((state) => state.audioplayer.currentAudioIndex);
  const isAudioPlayerShouldOpen = useSelector((state) => state.audioplayer.isAudioPlayerShouldOpen);
  const isAudioPlaying = useSelector((state) => state.audioplayer.isAudioPlaying);
  const currentSongPlayedTime = useSelector((state) => state.audioplayer.currentSongPlayedTime);
  const { isShuffle, isRepeat, isMute } = useSelector((state) => state.audioplayer);

  const audioPlayer = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mounted, setMounted] = useState(false);
  const currentSong = songs[currentAudioIndex];


  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (mounted) {
  //     audioPlayer.current.currentTime = 0;
  //   }
  // }, [audioPlayer.current])

  useEffect(() => {
    if (mounted && audioPlayer.current) {
      const interval = setInterval(() => {

        if (isAudioPlayerShouldOpen && isAudioPlaying) {
          const currentTime = audioPlayer.current?.currentTime;
          dispatch(audioPlayerAction.setCurrentSongPlayedTime(currentTime));
        }

      }, 100); // Every 10 seconds

      return () => clearInterval(interval);
    }
  }, [mounted, isAudioPlaying, dispatch]);



  useEffect(() => {
    if (mounted) {

      if (audioPlayer.current) {

        if (isAudioPlaying) {
          console.log('Trying to play audio...');
          audioPlayer.current.play().then(() => {
            console.log('Audio playing');
          }).catch((error) => {
            dispatch(audioPlayerAction.stopAudioPlaying())
            audioPlayer.current.currentTime = currentSongPlayedTime;
            console.error('Playback error:', error);
          });
        } else {
          console.log('Pausing audio...');
          
          audioPlayer.current.pause();
          // audioPlayer.current.currentTime = currentSongPlayedTime;

        }
      } else {
        console.error('Audio player is null');
      }
    }


  }, [isAudioPlaying, currentSong, mounted, songs]);

  useEffect(() => {
    if (audioPlayer.current) {

      audioPlayer.current.volume = volume;

      audioPlayer.current.muted = isMute;
    }
  }, [volume, isMute, mounted, currentSong]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.current?.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioPlayer.current?.duration);
    setCurrentTime(0);
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioPlayer.current?.play();
    } else {
      nextSongPlay();

    }
  };


  const handleProgressClick = (e) => {

    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (x / width) * duration;

    audioPlayer.current.currentTime = newTime;

    setCurrentTime(newTime);

  };

  const handleVolumeClick = (e) => {

    if (!isMute) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = x / width;

      audioPlayer.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  function toggleShuffle() {
    dispatch(audioPlayerAction.toggleShuffle());
  }
  function toggleReapet() {
    dispatch(audioPlayerAction.toggleRepeat());
  }

  function prevSongPlay() {
    if (isAudioPlaying) {
      let newIndex = 0;
      if (isShuffle) {
        newIndex = Math.floor(Math.random() * songs?.length)
      } else if (currentAudioIndex === 0) {
        newIndex = songs?.length - 1;
      } else {
        newIndex = currentAudioIndex - 1;
      }

      dispatch(audioPlayerAction.setCurrentAudioIndex(newIndex));
      dispatch(audioPlayerAction.setCurrntAudioId(songs[newIndex]?._id));
      dispatch(playlistAction.addSingleSongToLatestPlaylist(songs[newIndex]));

      audioPlayer.current.currentTime = 0;

    } else {
      let newIndex = 0;
      if (currentAudioIndex === 0) {
        newIndex = songs?.length - 1;
      } else {
        newIndex = currentAudioIndex - 1;
      }
      dispatch(audioPlayerAction.setCurrentAudioIndex(newIndex));
      dispatch(audioPlayerAction.setCurrntAudioId(songs[newIndex]?._id));
      dispatch(playlistAction.addSingleSongToLatestPlaylist(songs[newIndex]));

      audioPlayer.current.currentTime = 0;

    }

  }

  function nextSongPlay() {
    // audioPlayer.current.currentTime = 0.0;
    if (isAudioPlaying) {
      if (isAudioPlaying && songs?.length <= 1) {
        dispatch(audioPlayerAction.stopAudioPlaying());
      } else {
        if (isShuffle) {
          const randomIndex = Math.floor(Math.random() * songs?.length);
          dispatch(audioPlayerAction.setCurrentAudioIndex(randomIndex));
          dispatch(audioPlayerAction.setCurrntAudioId(songs[randomIndex]?._id));
          dispatch(playlistAction.addSingleSongToLatestPlaylist(songs[randomIndex]));

        } else {
          let newIndex = 0;
          if (currentAudioIndex === songs?.length - 1) {
            newIndex = 0;
          } else {
            newIndex = currentAudioIndex + 1;
          }

          dispatch(audioPlayerAction.setCurrentAudioIndex(newIndex));
          dispatch(audioPlayerAction.setCurrntAudioId(songs[newIndex]?._id));
          dispatch(playlistAction.addSingleSongToLatestPlaylist(songs[newIndex]));

          audioPlayer.current.currentTime = 0;

        }
      }
    } else {
      let newIndex = 0;
      if (currentAudioIndex === songs?.length - 1) {
        newIndex = 0;
      } else {
        newIndex = currentAudioIndex + 1;
      }

      dispatch(audioPlayerAction.setCurrentAudioIndex(newIndex));
      dispatch(audioPlayerAction.setCurrntAudioId(songs[newIndex]?._id));
      dispatch(playlistAction.addSingleSongToLatestPlaylist(songs[newIndex]));

      audioPlayer.current.currentTime = 0;
    }

  }

  function resetAudioPlayer() {
    dispatch(audioPlayerAction.resetAudioPlayer());

  }

  function toggleAudioPlayer() {
    dispatch(audioPlayerAction.togglePlayAudioBar());
  }

  function toggleMute() {
    dispatch(audioPlayerAction.toggleMute());
  }



  if (!mounted) return null;

  if (!isAudioPlayerShouldOpen) return null;


  const title = replaceUnderscoresWithSpaces(currentSong?.title)

  let shortenedTitle = title;
  if (title?.length > 25) {
    shortenedTitle = title?.slice(0, 22) + '...'
  }

  let image = currentSong?.image?.slice(currentSong?.image.indexOf('/') + 1);

  if(image === 'Not Found'){
    image = '/images/defaultUserPic/rounded/null.png';
  } else{
    image = `${apiBasePath}/${image}`;
  }

  return createPortal((
    <>
      <div className="audio-player-wrap fixed text-black  backdrop-blur-lg  text-center bottom-[0] bg-yellow-500/30  w-full z-[999999]">
        <div className="container">
          <div className="audio__player__innr">
            <div className="items-center content-center justify-center z-[200] w-[300px]">
              <div className="lg:flex lg:flex-row lg:w-[380px] justify-left items-center md:hidden sm:hidden xs:hidden">
                <div className="">
                  <img
                    src={image}
                    alt={currentSong?.image}
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] rounded-full object-cover"
                  ></img>
                </div>
                <div className="lg:flex lg:flex-col text-gray-600 pt-[5px] pl-[10px]">
                  <div className="pb-[5px] text-container">
                    <div className="text-xl font-bold text-left animated-text">{title}</div>
                  </div>
                  <div>
                    <div className="text-left">{currentSong?.writer}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-center items-center content-center justify-center space-y-3  lg:w-full">
              <div>
                <audio
                  src={`${apiBasePath}/${currentSong?.audio.slice(currentSong.audio.indexOf('/') + 1)}`}
                  ref={audioPlayer}
                  key={currentSong?._id || 'default'}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                />
                <div className="flex flex-row  space-x-6">
                  <button onClick={toggleShuffle} className={isShuffle ? "active" : "text-gray-400"}>
                    <MdShuffle />
                  </button>
                  <button onClick={prevSongPlay}>
                    <MdSkipPrevious />
                  </button>
                  <button className="text-4xl" onClick={toggleAudioPlayer}>
                    {isAudioPlaying ?
                      //  <MdPause /> 
                      <>
                        <img
                          src="/images/icons/ic_pause.svg"
                        ></img>
                      </>
                      :
                      <MdPlayArrow />
                    }
                  </button>
                  <button onClick={nextSongPlay}>
                    <MdSkipNext />
                  </button>
                  <button onClick={toggleReapet} className={isRepeat ? "active" : "text-gray-400"}>
                    <MdRepeat />
                  </button>
                </div>
              </div>
              <div className="audio-sound-line flex items-center flex-row text-center place-content-center justify-center lg:space-x-5 md:space-x-5 sm:space-x-3 xs:space-x-3 lg:pb-[15px] md:pb-[15px] sm:pb-[10px] xs:pb-[10px]">
                <span className="text-xs">{formatTime(currentTime)}</span>
                <ProgressBar
                  now={(currentTime / duration) * 100}
                  style={{ width: "300px", height: "6px", backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={handleProgressClick}
                />
                <span className="text-xs">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="w-full text-center lg:pl-[20px] md:pl-[20px] sm:pl-[0] xs:pl-[0] items-center content-center justify-center">
              {/* left part */}
              <div className="flex lg:justify-left md:justify-left sm:justify-center xs:justify-center items-center flex-row  space-x-5 ">
                {/* fav icon */}
                {/* <button className="">
                  <img src="/images/icons/ic_fav.svg"></img>
                </button>
                <button className="">
                  <img src="/images/icons/audioControl.svg"></img>
                </button> */}

                {/* volume icon */}
                {!isMute && <img className="cursor-pointer" onClick={toggleMute} width={30} height={30} src="/images/icons/ic_volumeon.svg"></img>}
                {isMute && <img className="cursor-pointer" onClick={toggleMute} width={30} height={30} src="/images/icons/ic_volumeoff.svg"></img>}
                {/* volume bar */}
                <div className="text-center items-center content-center justify-center ">
                  <ProgressBar
                    // variant="customBarColor"
                    now={volume * 100}
                    style={{ width: "100px", height: "6px", backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer' }}
                    onClick={handleVolumeClick}
                  />
                </div>
                {/*   notes */}
                <button>
                  <img src="/images/icons/ic_songlist.svg"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button onClick={resetAudioPlayer} className="absolute top-0 right-3 text-[28px] hover:text-[#F9A106]"><i class="ri-close-fill"></i></button>
      </div>
    </>
  ), document.getElementById('audio-root'));
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}