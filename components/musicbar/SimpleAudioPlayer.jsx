'use client'
import React, { useState, useEffect, useRef } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons
import { faPlay, faPause, faStepForward, faStepBackward, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons'; // Import specific icons


const SimpleAudioPlayer = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playbackState, setPlaybackState] = useState('PAUSED');
  const audioElement = useRef(new Audio());

  useEffect(() => {
    console.log('new audio ---------------------------- player')
    const audio = audioElement.current;

    audio.addEventListener('playing', () => setPlaybackState('PLAYING'));
    audio.addEventListener('pause', () => setPlaybackState('PAUSED'));
    audio.addEventListener('ended', onTrackEnded);

    return () => {
      audio.removeEventListener('playing', () => setPlaybackState('PLAYING'));
      audio.removeEventListener('pause', () => setPlaybackState('PAUSED'));
      audio.removeEventListener('ended', onTrackEnded);
    };
  }, []);

  const loadTrack = (index) => {
    const track = playlist[index];
    audioElement.current.src = track.audioSrc;
    audioElement.current.load();
    setCurrentTrackIndex(index);
  };

  const onTrackEnded = () => {
    if (repeat) {
      replayCurrentTrack();
    } else {
      playNextTrack();
    }
  };

  const replayCurrentTrack = () => {
    audioElement.current.currentTime = 0;
    audioElement.current.play();
  };

  const playNextTrack = () => {
    const nextIndex = shuffle ? computeRandomTrackIndex() : currentTrackIndex + 1;
    loadTrack(nextIndex % playlist.length);
    audioElement.current.play();
  };

  const playPreviousTrack = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
    loadTrack(prevIndex);
    audioElement.current.play();
  };

  const togglePlayPause = () => {
    if (playbackState === 'PLAYING') {
      audioElement.current.pause();
    } else {
      audioElement.current.play();
    }
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const computeRandomTrackIndex = () => {
    if (playlist.length === 1) return 0;
    const index = Math.floor(Math.random() * (playlist.length - 1));
    return index < currentTrackIndex ? index : index + 1;
  };

  useEffect(() => {
    loadTrack(currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  return (
    <div className='text-black z-50'>
      <audio ref={audioElement} />
      <button className='text-black' onClick={togglePlayPause}>{playbackState === 'PLAYING' ? 'Pause' : 'Play'}</button>
      <button className='text-black' onClick={playPreviousTrack}>Previous</button>
      <button className='text-black' onClick={playNextTrack}>Next</button>
      <button className='text-black' onClick={toggleRepeat}>Repeat {repeat ? 'On' : 'Off'}</button>
      <button className='text-black' onClick={toggleShuffle}>Shuffle {shuffle ? 'On' : 'Off'}</button>
    </div>
  );
};

export default SimpleAudioPlayer;
