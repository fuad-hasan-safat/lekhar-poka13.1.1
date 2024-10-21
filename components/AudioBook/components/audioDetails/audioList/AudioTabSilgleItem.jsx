'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AudioPlayListContext } from '../../../../store/audioPlayer-context';
import { apiBasePath } from '../../../../../utils/constant';
import axios from 'axios';
import { replaceUnderscoresWithSpaces } from '../../../../../function/api';
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../../../redux/toast-slice';
import { audioPlayerAction } from '../../../../redux/audioplayer-slice';
import { playlistAction } from '../../../../redux/playlist-slice';

export default function AudioTabSingleItem({ songInfo, audioIndex, audioList }) {
    const dispatch = useDispatch();
    const userUuid = useSelector((state) => state.usersession.userUuid);
    const currentSongId = useSelector((state) => state.audioplayer.currentSongId);
    const isAudioPlaying = useSelector((state) => state.audioplayer.isAudioPlaying);
    const currentAudioScope = useSelector((state) => state.audioplayer.currentAudioScope);

    const [duration, setDuration] = useState(null);
    const [error, setError] = useState(false);
    const audioRef = useRef(null);

    let notification = '';

    const [loggedInUserId, setLoggedInUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userId') || null;
        // console.log('logged in user in profile -->', loggedInUser)
        setLoggedInUserId(loggedInUser);

        setIsLoading(false)

    }, [])


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


    }, [songInfo?.audio, songInfo?.id]);

    async function handleAddMyPlaylist() {
        // console.log({ songInfo })
        const data = {
            ebook_id: songInfo.ebook_id,
            audio_id: songInfo._id,
            userId: loggedInUserId
        }

        console.log('Add to playlist data -,', data);

        try {
            const response = await axios.post(`${apiBasePath}/addtoplaylist`, data);
            // console.log('add playlist response', response.data.data);
            if (response.data.status === "failed") {
                if (response.data.msg === 'Audio Already in playlist') {
                    notification = `অডিওটি ইতিমধ্যে প্লেলিস্টে যুক্ত আছে!`;
                    dispatch(toastAction.setWarnedNotification(notification))
                } else {
                    notification = `অডিওটি প্লেলিস্টে যুক্ত করা যাচ্ছে না!`;
                    dispatch(toastAction.setWarnedNotification(notification))
                }
                return;
            } else {
                dispatch(playlistAction.addSingleSongToMyPlaylist(songInfo));
                notification = `প্লেলিস্টে যুক্ত হয়েছে!`;
                dispatch(toastAction.setSucessNotification(notification))
            }
            // setMyPlayList([...myPlayList, songInfo])

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function handlePlayButton() {

        dispatch(audioPlayerAction.togglePlay({
            audioIndex: audioIndex,
            audioscope: `details`,
            audioList: audioList,
            currentSongId: songInfo._id,
        }))




        const data = {
            ebook_id: songInfo.ebook_id,
            audio_id: songInfo._id,
            userId: loggedInUserId,
        }

        // console.log('Add to latest playlist data -,', data);
        // console.log('SongInfo--', songInfo);

        try {
            const response = await axios.post(`${apiBasePath}/addtolatestplaylist`, data);
            // console.log('add playlist response', response.data);
            if (response.data.status === "failed") {
             
                return;
            } else {
                dispatch(playlistAction.addSingleSongToLatestPlaylist(songInfo));
                notification = `প্লেলিস্টে যুক্ত হয়েছে!`;
                dispatch(toastAction.setSucessNotification(notification))

            }
            // setLatestPlaylist([...latestPlayList, songInfo])
        } catch (error) {
            console.error('Error posting data:', error);
        }

    }


    const title = replaceUnderscoresWithSpaces(songInfo.title)
    // console.log(title);

    let shortenedTitle = title;

    return (
        <>
            <div className='audio__tab__item'>
                <div className='audio__tab__left relative'>
                    <div>
                        <img src={`${apiBasePath}/${songInfo.image.slice(songInfo.image.indexOf('/') + 1)}`} className='absolute object-cover lg:w-[78px] md:w-[70px] sm:w-[65px] xs:w-[50px] lg:h-[78px] md:h-[70px] sm:h-[65px] xs:h-[50px] rounded-full' />
                    </div>
                    <div className='audio__tab__info'>
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

                <div className='audio__tab__playbutton'>
                    <button onClick={handlePlayButton}>{isAudioPlaying && currentSongId === songInfo._id ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
                    <button onClick={handleAddMyPlaylist} className='text-[#484848] text-opacity-[50%] lg:ml-[18px] md:ml-[15px] sm:ml-[12px] xs:ml-[10px]'><i class="ri-add-circle-fill"></i></button>
                </div>

            </div>
        </>

    )
}
