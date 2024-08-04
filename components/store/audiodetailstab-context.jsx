import { createContext } from "react";

export const AudioDetailsTabContext = createContext({
    audioTabToggleState: 1,
    setAudioTabToggleState: ()=> {}
})

export default function AudioDetailsTabContextProvider({children}){
    const [audioTabState, setAudio] = useSate();
}