import { createContext, useState } from "react";

export const AudioPlayListContext = createContext({
    playList: [],
    isAudioPlaying: false,
    isAudiobarVisible: false,
    currentPlayingIndex: 0,
    setCurrentAudioIndex: () => {},
    setPlaylist: () => {},
    nextSongPlay: () => {},
    prevSongPlay: () => {},
    toggleAudioPlay: () => {}
});

export default function AudioPlaylistContextProvider({ children }) {
    const [audioBar, setAudioBar] = useState({
        playList: [],
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

    function setCurrentAudioIndex(index){
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

      const togglePlay = () => {

        setIsPlaying(!isPlaying);
    
      };


    const cntxValue = {
        playList: audioBar.playList,
        isAudioPlaying:isPlaying,
        currentPlayingIndex: currentPlayingIndex,
        isAudiobarVisible: audioBar.isAudiobarVisible,
        setPlaylist: setCurrentPlaylist,
        setCurrentAudioIndex:setCurrentAudioIndex,
        nextSongPlay:handleNextSong,
        prevSongPlay:handlePreviousSong,
        toggleAudioPlay:togglePlay,
    };

    return (
        <AudioPlayListContext.Provider value={cntxValue}>
            {children}
        </AudioPlayListContext.Provider>
    );
}
