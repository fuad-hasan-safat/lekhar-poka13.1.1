'use client'
import React, { useEffect, useRef, useState } from 'react'
import { apiBasePath } from '../../../../../utils/constant';
import { replaceUnderscoresWithSpaces } from '../../../../../function/api';
import { audioPlayerAction } from '../../../../redux/audioplayer-slice';
import { useDispatch, useSelector } from 'react-redux';
import { playlistAction } from '../../../../redux/playlist-slice';
import DialugueModal from '../../../../common/notification/DialugueModal';
import axios from 'axios';
import { toastAction } from '../../../../redux/toast-slice';

export default function AudioPlayListSingleItem({ songInfo, audioIndex, audioList }) {

    const dispatch = useDispatch();
    const dialogueRef = useRef();
    const isAudioPlaying = useSelector((state) => state.audioplayer.isAudioPlaying);
    const playListScope = useSelector((state) => state.playlist.playListScope)
    const currentSongId = useSelector((state) => state.audioplayer.currentSongId);
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


    }, []);

    function handlePlayButton() {
        dispatch(audioPlayerAction.togglePlay({
            audioIndex: audioIndex,
            audioscope: playListScope,
            audioList: audioList,
            currentSongId: songInfo._id,
        }))

        dispatch(playlistAction.addSingleSongToLatestPlaylist(songInfo));
    }

    async function deleteSong() {
        let api = '';
        if(playListScope === 'latestPlayList'){
            api = 'deleteitemfromlatest';
        }else if(playListScope === 'myPlayList'){
            api = 'deleteitem';
        };

        console.log('play list scope::::', playListScope);
        const apiUrl = `${apiBasePath}/${api}/${songInfo._id}`;
        console.log('API DELETE URL ', apiUrl);

        try {
            const response = await axios.delete(apiUrl);
            console.log('Delete successful:', response.data);
      
           const notification = `অডিওটি মুছে ফেলা হয়েছে`
            dispatch(toastAction.setSucessNotification(notification));
            dispatch(playlistAction.removeSingleAudioFromPlaylist(songInfo._id));
      
            dialogueRef.current.close();
      
            // reloadPage();
            return response.data;
          } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
          }

    }

    function handleDeleteButton() {
        dialogueRef.current.showModal();

    }

    const title = replaceUnderscoresWithSpaces(songInfo?.title)
    console.log(title);

    let shortenedTitle = title;


    let image = songInfo?.image?.slice(songInfo?.image?.indexOf('/') + 1);

    if(image === 'Not Found'){
      image = '/images/defaultUserPic/rounded/null.png';
    } else{
      image = `${apiBasePath}/${image}`;
    }

    return (
        <div className='audio__tab__item'>
            <DialugueModal ref={dialogueRef} alert={`${songInfo?.title} কি ডিলিট করতে চান ?`} address={deleteSong} type='delete' />
            <div className='audio__tab__left'>
                <div>
                    <img src={image} className='lg:w-[78px] object-cover md:w-[70px] sm:w-[65px] xs:w-[50px] lg:h-[78px] md:h-[70px] sm:h-[65px] xs:h-[50px] rounded-full' />
                </div>
                <div className='audio__tab__info'>
                    <h6 className='charLim'>
                        {shortenedTitle}
                    </h6>
                    <audio ref={audioRef}>
                        <source src={`${apiBasePath}/${songInfo?.audio?.slice(songInfo?.audio?.indexOf('/') + 1)}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {audioRef.current?.duration && <p> <i class="ri-time-line"></i> {(duration / 60).toFixed(2)} মিনিট</p>}

                </div>

            </div>

            <div className='audio__tab__playbutton'>
                <button onClick={handlePlayButton}>{isAudioPlaying && songInfo._id === currentSongId ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>

                <button onClick={handleDeleteButton} className='text-[#484848] text-opacity-[50%] lg:ml-[18px] md:ml-[15px] sm:ml-[12px] xs:ml-[10px]'><img className='sm:w-[36px] sm:h-[36px] xs:w-[25px] xs:h-[25px]' src='/audioBook/deleteIcon.svg'/></button>
            </div>

        </div>
    )
}
