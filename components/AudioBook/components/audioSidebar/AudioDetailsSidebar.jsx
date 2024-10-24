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

    const [loggedInUserId, setLoggedInUserId] = useState(null)

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userId') || null;
        // console.log('logged in user in profile -->', loggedInUser)
        setLoggedInUserId(loggedInUser);
    }, [])

    const dispatch = useDispatch();
    // const userUuid = useSelector(state => state.usersession.userUuid);
    const myPlaylist = useSelector((state) => state.playlist.myPlaylist);
    const lattestPlaylist = useSelector((state) => state.playlist.lattestPlaylist);
    const isPlayListChanged = useSelector((state) => state.playlist.isPlayListChanged);
    const isSongDeleted =  useSelector((state) => state.playlist.isSongDeleted);


    useEffect(() => {
        getData();
    }, [isPlayListChanged, loggedInUserId, isSongDeleted])


    const getData = async () => {
        const myPlayListUrl = `${apiBasePath}/showplaylist/${loggedInUserId}`;
        const latestPlayListUrl = `${apiBasePath}/showlatestplaylist/${loggedInUserId}`;
        // console.log({ myPlayListUrl, latestPlayListUrl })


        try {
            const myplayList = await fetchDataWithAxios(myPlayListUrl);
            // console.log('my play list', myplayList)
            const playList = myplayList?.object?.filter((obj) => obj.title !== 'Not Found');
            dispatch(playlistAction.addMyPlaylist(playList));

        } catch (error) {
            console.log('playlist api call error', error)
        }

        try {
            const latestPlayList = await fetchDataWithAxios(latestPlayListUrl);
            // console.log('latest playlist get response', latestPlayList);

            const playList = latestPlayList?.object?.filter((obj) => obj.title !== 'Not Found');

            dispatch(playlistAction.addLatestPlaylist(playList));


        } catch (error) {
            console.log('playlist api call error', error)
        }


    };

    function setPlayListRenderScope(scope) {
        localStorage.setItem('type', scope)
        dispatch(playlistAction.setPlayListScope(scope))
    }

    return (
        <>
            <div className="flex flex-col pr-[]">

                {!loggedInUserId && <div className="sidebar__iteam__wrap">
                    <Login />
                </div>}
                {lattestPlaylist?.length > 0 && <div className='sidebar__iteam__wrap mt-[16px]'>
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
