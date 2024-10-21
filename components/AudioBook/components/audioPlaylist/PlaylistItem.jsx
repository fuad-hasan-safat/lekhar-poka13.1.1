'use client'
import React, { useEffect, useRef, useState } from 'react'
import { apiBasePath } from '../../../../utils/constant';
import { replaceUnderscoresWithSpaces } from '../../../../function/api';
import { useDispatch, useSelector } from 'react-redux';
import { audioPlayerAction } from '../../../redux/audioplayer-slice';

export default function PlaylistItem({ songInfo, songIndex, songList, audioScope }) {
    // console.log('song info-----', songInfo)
    const dispatch = useDispatch();
    const isAudioPlaying = useSelector((state) => state.audioplayer.isAudioPlaying);
    const currentAudioScope = useSelector((state) => state.audioplayer.currentAudioScope);
    const currentSongId = useSelector((state) =>state.audioplayer.currentSongId);
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


    function handlePlayButton(){
        dispatch(audioPlayerAction.togglePlay({
            audioIndex: songIndex,
            audioscope: audioScope,
            audioList: songList,
            currentSongId: songInfo._id,
        }))
    }
    // console.log('song info', songInfo)

    const title = replaceUnderscoresWithSpaces(songInfo?.title)
    // console.log(title);

    let shortenedTitle = title || '' ;

    let image = songInfo?.image?.slice(songInfo?.image?.indexOf('/') + 1);

    if(image === 'Not Found'){
      image = '/images/defaultUserPic/rounded/null.png';
    } else{
      image = `${apiBasePath}/${image}`;
    }

    return (
        <div className='audio__playlist__item'>
            <div className='audio__playlist__left '>
                <div>
                    <img src={image} className='w-[41px] object-cover h-[41px] rounded-full' />
                </div>
                <div className='audio__playlist__info mid:max-w-[280px] lg:max-w-[180px] md:max-w-[120px] sm:max-w-[200px] xs:max-w-[200px]'>
                    <h6 className='charLim'>
                        {shortenedTitle}
                    </h6>
                    <audio ref={audioRef}>
                        <source src={`${apiBasePath}/${songInfo?.audio.slice(songInfo?.audio.indexOf('/') + 1)}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {audioRef.current?.duration && <p> <i class="ri-time-line"></i> {(duration / 60).toFixed(2)} মিনিট</p>}
                </div>

            </div>

            <div className='audio__playlist__playbutton'>
                <button onClick={handlePlayButton}>{isAudioPlaying && songInfo._id ===  currentSongId ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
            </div>

        </div>
    )
}
