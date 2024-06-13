'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function AudioTabSingleItem({ songInfo }) {
    const [isPlaying, setIsPlaying] = useState(false);
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

    const togglePlayPause = () => {
        const audioElement = audioRef.current;
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className='audio__playlist__item'>
            <div className='audio__playlist__left'>
                <div>
                    <img src={songInfo.image} className='w-[41px] h-[41px] rounded-full' />
                </div>
                <div className='audio__playlist__info'>
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

            <div className='audio__playlist__playbutton'>
                <button onClick={togglePlayPause}>{isPlaying ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
            </div>

        </div>
    )
}
