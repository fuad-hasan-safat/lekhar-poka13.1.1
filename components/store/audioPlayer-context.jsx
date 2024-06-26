import { createContext, useState } from "react";

export const AudioPlayListContext = createContext({
  playList: [],
  audioPlace: '',
  isAudioPlaying: false,
  isAudiobarVisible: false,
  isShuffle: false,
  isRepeat: false,
  currentPlayingIndex: 0,
  setCurrentAudioIndex: () => { },
  setPlayListScope: () => { },
  setPlaylist: () => { },
  nextSongPlay: () => { },
  prevSongPlay: () => { },
  toggleAudioPlay: () => { },
  toggleShuffle: () => { },
  toggleReapet: () => { },
});

export default function AudioPlaylistContextProvider({ children }) {
  const [audioBar, setAudioBar] = useState({
    playList: [],
    audioPlace: 'none',
    isShuffle: false,
    isRepeat: false,
    isAudiobarVisible: false,
  });
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);

  function setCurrentPlaylist(playlist, currentIndex = 0) {
    console.log('Playlist in context function', playlist, currentIndex);
    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      playList: playlist,
    }));

    setCurrentAudioIndex(currentIndex)
  }

  function setcurrentPlaylistScope(scope='none') {
    localStorage.setItem("playlistScope", scope);

    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      audioPlace: scope
    }))
  }

  function setCurrentAudioIndex(index) {
    setCurrentPlayingIndex(index)
  }

  const playNextSong = () => {
    console.log('shuffle ', audioBar.isShuffle)
    

    setCurrentPlayingIndex((prevIndex) =>
      audioBar.isShuffle
        ? Math.floor(Math.random() * audioBar.playList.length)
        : prevIndex === audioBar.playList.length - 1
          ? 0
          : prevIndex + 1
    );

  };

  const playPreviousSong = () => {
    console.log('shuffle ', audioBar.isShuffle)

    setCurrentPlayingIndex((prevIndex) =>
      audioBar.isShuffle
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

  function togglePlay(songIndex, songList, audioScope='none') {
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

  function toggleShuffleState() {
    setAudioBar((prevAudioBar) => {
      console.log('Previous audio shuffle -', prevAudioBar.isShuffle)

      const upDateShuffle = !prevAudioBar.isShuffle;
      console.log('upDateShuffle audio shuffle -', upDateShuffle)


      return ({
        ...prevAudioBar,
        isShuffle: !prevAudioBar.isShuffle
      })
    })

  }

  function toggleReapetState() {
    setAudioBar((prevAudioBar) => {
      console.log('Previous audio reaper -', prevAudioBar.isRepeat)
      return ({
        ...prevAudioBar,
        isRepeat: !prevAudioBar.isRepeat
      })
    })

  }

  const cntxValue = {
    playList: audioBar.playList,
    audioPlace: audioBar.audioPlace,
    isAudioPlaying: isPlaying,
    isShuffle: audioBar.isShuffle,
    isRepeat: audioBar.isRepeat,
    currentPlayingIndex: currentPlayingIndex,
    isAudiobarVisible: audioBar.isAudiobarVisible,
    setPlaylist: setCurrentPlaylist,
    setPlayListScope: setcurrentPlaylistScope,
    setCurrentAudioIndex: setCurrentAudioIndex,
    nextSongPlay: handleNextSong,
    prevSongPlay: handlePreviousSong,
    toggleAudioPlay: togglePlay,
    toggleShuffle: toggleShuffleState,
    toggleReapet: toggleReapetState,
  };

  return (
    <AudioPlayListContext.Provider value={cntxValue}>
      {children}
    </AudioPlayListContext.Provider>
  );
}
