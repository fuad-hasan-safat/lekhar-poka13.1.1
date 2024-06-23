'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AudioPlayListContext } from '../../../../store/audioPlayer-context';

export default function AudioTabSingleItem({ songInfo, audioIndex }) {
    const { playList, setPlaylist, currentPlayingIndex ,setCurrentAudioIndex, toggleAudioPlay ,isAudioPlaying } = useContext(AudioPlayListContext)
    const [duration, setDuration] = useState(null);
    const [error, setError] = useState(false);
    const audioRef = useRef(null);



    useEffect(() => {
        const audioElement = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        const handleError = () => {
            setError(true);
        };

        if (audioElement) {
            audioElement.volume = 0.5;
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.addEventListener('error', handleError);
        }

        handleLoadedMetadata();

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioElement.removeEventListener('error', handleError);
            }
        };


    }, [songInfo?.audio]);

    const togglePlayPause = (index) => {
        setCurrentAudioIndex(index)
    };

    return (
        <div className='audio__tab__item'>
            <div className='audio__tab__left'>
                <div>
                    <img src={songInfo.image} className='w-[78px] h-[78px] rounded-full' />
                </div>
                <div className='audio__tab__info'>
                    <h6>
                        {songInfo.title}
                    </h6>
                    <audio ref={audioRef}>
                        <source src={songInfo?.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {audioRef.current?.duration && <p> <i class="ri-time-line"></i> {(duration / 60).toFixed(2)} মিনিট</p>}

                </div>

            </div>

            <div className='audio__tab__playbutton'>
                <button onClick={() => {toggleAudioPlay(audioIndex)}}>{isAudioPlaying && audioIndex === currentPlayingIndex ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
                <button className='text-[#484848] text-opacity-[50%] ml-[18px]'><i class="ri-add-circle-fill"></i></button>
            </div>

        </div>
    )
}
