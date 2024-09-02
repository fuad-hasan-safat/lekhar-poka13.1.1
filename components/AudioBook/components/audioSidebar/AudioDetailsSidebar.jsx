import React, { useContext, useEffect, useState } from 'react';
import Login from '../../../sidebar/login-sidebar/Login';
import PlayList from '../audioPlaylist/PlayList';
import Link from 'next/link';
import AudioSidebarLekhok from './AudioSidebarLekhok';
import { AudioPlayListContext } from '../../../store/audioPlayer-context';
import { fetchDataWithAxios } from '../../../../utils/apiService';
import { apiBasePath } from '../../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { playlistAction } from '../../../redux/playlist-slice';
import Loading from '../../../common/loading';

export default function AudioDetailsSideBar() {

    const dispatch = useDispatch();
    const userUuid = useSelector(state => state.usersession.userUuid);
    const myPlaylist = useSelector((state) => state.playlist.myPlaylist);
    const lattestPlaylist = useSelector((state) => state.playlist.lattestPlaylist);
    const isPlayListChanged = useSelector((state) => state.playlist.isPlayListChanged);


    useEffect(() => {
        getData();
    }, [isPlayListChanged])


    const getData = async () => {
        const myPlayListUrl = `${apiBasePath}/showplaylist/${userUuid}`;
        const latestPlayListUrl = `${apiBasePath}/showlatestplaylist/${userUuid}`;
        console.log({ myPlayListUrl, latestPlayListUrl })


        try {
            const myplayList = await fetchDataWithAxios(myPlayListUrl);
            console.log('my play list', myplayList)
            dispatch(playlistAction.addMyPlaylist(myplayList.object))

        } catch (error) {
            console.log('playlist api call error', error)
        }

        try {
            const latestPlayList = await fetchDataWithAxios(latestPlayListUrl);
            console.log('latest playlist get response', latestPlayList);
            if (lattestPlaylist?.length <= 0) {
                dispatch(playlistAction.addLatestPlaylist(latestPlayList.object))
            }

        } catch (error) {
            console.log('playlist api call error', error)
        }


    };

    function setPlayListRenderScope(scope) {
        dispatch(playlistAction.setPlayListScope(scope))
    }

    return (
        <>
            <div className="flex flex-col pr-[]">

                {!localStorage.getItem('uuid') && <div className="sidebar__iteam__wrap">
                    <Login />
                </div>}
                {lattestPlaylist?.length > 0 && <div className='sidebar__iteam__wrap mt-[32px]'>
                    <h2 className='audio__sidebar__heading'>সর্বশেষ প্লেলিস্ট</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <PlayList audioPlaylist={lattestPlaylist} audioScope={'latestPlayList'} />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/audiobook/playlist' onClick={() => setPlayListRenderScope('latestPlayList')}>সব দেখুন</Link>
                    </div>
                </div>}
                {/* {latestPlayList?.length >= 0 && <div  className='text-black'>No Audio</div>} */}
                <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>লেখক</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <AudioSidebarLekhok />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/allwriter'>সব দেখুন</Link>
                    </div>
                </div>

                {myPlaylist?.length > 0 && <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>আমার প্লেলিস্ট</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <PlayList audioPlaylist={myPlaylist} audioScope={'myPlayList'} />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/audiobook/playlist' onClick={() => setPlayListRenderScope('myPlayList')}>সব দেখুন</Link>
                    </div>
                </div>}
                {/* {myPlayList?.length >= 0 && <div className='text-black'>No Audio</div>} */}

            </div>
        </>
    )
}
