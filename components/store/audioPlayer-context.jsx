import { useRouter } from "next/router";
import { createContext, useState } from "react";

export const AudioPlayListContext = createContext({
  playList: [],
  audioPlace: '',
  isAudioPlaying: false,
  isAudiobarVisible: false,
  currentPlayingIndex: 0,
  setCurrentAudioIndex: () => { },
  setPlayListScope: () => { },
  setPlaylist: () => { },
  nextSongPlay: () => { },
  prevSongPlay: () => { },
  toggleAudioPlay: () => { }
});

export default function AudioPlaylistContextProvider({ children }) {
  const router = useRouter();
  const [audioBar, setAudioBar] = useState({
    playList: [],
    audioPlace: '',
    isAudiobarVisible: false,
  });
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  function setCurrentPlaylist(playlist, currentIndex = 0) {
    console.log('Playlist in context function', playlist, currentIndex);
    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      playList: playlist,
    }));

    setCurrentAudioIndex(currentIndex)
  }

  function setcurrentPlaylistScope(scope) {
    localStorage.setItem("playlistScope", scope);

    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      audioPlace: scope
    }))

    const currentPath = router.pathname;
    console.log({ currentPath })
    if (currentPath === '/audiobook/playlist') {
      router.reload();
    }
  }

  function setCurrentAudioIndex(index) {
    setCurrentPlayingIndex(index)
  }

  const playNextSong = () => {

    setCurrentPlayingIndex((prevIndex) =>
      isShuffle
        ? Math.floor(Math.random() * audioBar.playList.length)
        : prevIndex === audioBar.playList.length - 1
          ? 0
          : prevIndex + 1
    );

  };

  const playPreviousSong = () => {

    setCurrentPlayingIndex((prevIndex) =>
      isShuffle
        ? Math.floor(Math.random() * audioBar.playList.length)
        : prevIndex === 0
          ? audioBar.playList.length - 1
          : prevIndex - 1
    );

  };


  const handleNextSong = () => {
    if (isPlaying) {
      playNextSong();
    } else {
      setCurrentPlayingIndex((prevIndex) =>
        prevIndex === audioBar.playList.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousSong = () => {
    if (isPlaying) {
      playPreviousSong();
    } else {
      setCurrentPlayingIndex((prevIndex) =>
        prevIndex === 0 ? audioBar.playList.length - 1 : prevIndex - 1
      );
    }
  };

  function togglePlay(songIndex, songList, audioScope) {
    console.log({ songIndex, songList })
    const prevScope = audioBar.audioPlace;
    const prevIndex = currentPlayingIndex;

    if (isPlaying) {

      if (prevIndex !== songIndex || prevScope !== audioScope) {
        localStorage.setItem("playlistScope", audioScope);
        setCurrentAudioIndex(songIndex)

        //  audioScope: 'details'(details page), 'latestPlayList', 'myPlayList'
        setAudioBar((prevAudioBar) => ({ ...prevAudioBar, playList: songList, audioPlace: audioScope }))

        return;
      }

    }

    localStorage.setItem("playlistScope", audioScope);
    setCurrentAudioIndex(songIndex)

    //  audioScope: 'details'(details page), 'latestPlayList', 'myPlayList'
    setAudioBar((prevAudioBar) => ({ ...prevAudioBar, playList: songList, audioPlace: audioScope }))
    setIsPlaying(!isPlaying);


  };


  const cntxValue = {
    playList: audioBar.playList,
    audioPlace: audioBar.audioPlace,
    isAudioPlaying: isPlaying,
    currentPlayingIndex: currentPlayingIndex,
    isAudiobarVisible: audioBar.isAudiobarVisible,
    setPlaylist: setCurrentPlaylist,
    setPlayListScope: setcurrentPlaylistScope,
    setCurrentAudioIndex: setCurrentAudioIndex,
    nextSongPlay: handleNextSong,
    prevSongPlay: handlePreviousSong,
    toggleAudioPlay: togglePlay,
  };

  return (
    <AudioPlayListContext.Provider value={cntxValue}>
      {children}
    </AudioPlayListContext.Provider>
  );
}
