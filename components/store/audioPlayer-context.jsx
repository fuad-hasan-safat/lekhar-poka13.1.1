import { createContext, useState } from "react";

export const AudioPlayListContext = createContext({
    playList: [],
    isAudiobarVisible: false,
    setPlaylist:()=>{},
})


export default function AudioPlaylistContextProvider({ children }) {

    const [audioBar, setAudioBar] = useState({
        playList: [],
        isAudiobarVisible: false
    })



    function setCurrentPlaylist(playlist){
        setAudioBar((prevAudioBar)=>{
            const updatedPlaylist = playlist

            return{
                ... audioBar,
                playList: updatedPlaylist,
            }

        })
    }

    const cntxValue = {
        playList: audioBar.playList,
        isAudiobarVisible: audioBar.isAudiobarVisible,
        setPlaylist: setCurrentPlaylist
    }

    return (
        <AudioPlayListContext.Provider value={cntxValue}>
            {children}
        </AudioPlayListContext.Provider>
    )
}