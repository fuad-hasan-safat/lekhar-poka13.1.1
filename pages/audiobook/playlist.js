'use client'
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import SeeMoreListPlayList from '../../components/AudioBook/components/SeeMoreList/seeMorePlayList';
import LoginPage from '../../components/login/login';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/loading';
import { apiBasePath } from '../../utils/constant';
import { playlistAction } from '../../components/redux/playlist-slice';
import { fetchDataWithAxios } from '../../utils/apiService';


const PlaylistSeeAll = () => {

    const router = useRouter();
    const currentUrl = router.asPath;

    const playListScope = useSelector((state) => state.playlist.playListScope);
    const isSongDeleted =  useSelector((state) => state.playlist.isSongDeleted);

    const dispatch = useDispatch();
    const [loggedInUserId, setLoggedInUserId] = useState(null)
    const [type, setType] = useState('');
    const [playlist, setPlaylist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loggedInUser = localStorage.getItem('userId') || null;

        const scope = localStorage.getItem('type')
        // console.log('logged in user in profile -->', loggedInUser, scope)
        setLoggedInUserId(loggedInUser);
        setType(scope)



        const myPlayListUrl = `${apiBasePath}/showplaylist/${loggedInUser}`;
        const latestPlayListUrl = `${apiBasePath}/showlatestplaylist/${loggedInUser}`;

        const apiUrl = scope === 'latestPlayList' ?  latestPlayListUrl : myPlayListUrl;
        getData(apiUrl, scope)
    }, [type, playListScope, isSongDeleted])




    const getData = async (url, scope) => {
       
        try {
            const myplayList = await fetchDataWithAxios(url);
            // console.log('my play list', myplayList)
            const playList = myplayList?.object?.filter((obj) => obj.title !== 'Not Found');
            setPlaylist(playList)

            if(scope === 'latestPlayList'){
            // dispatch(playlistAction.addLatestPlaylist(playList));

            }else{
                // dispatch(playlistAction.addMyPlaylist(playList));

            }

        } catch (error) {
            console.log('playlist api call error', error)
        }

    


    };

    useEffect(() => {
        if (loggedInUserId?.length > 0) {
            setIsLoading(false)
        }
    }, [loggedInUserId])

    if (isLoading) {
        return <Loading />
    }


   
 const scope = type === 'latestPlayList' ? 'সর্বশেষ প্লেলিস্ট' :  'আমার প্লেলিস্ট' ;


    return (
        <>{loggedInUserId ?
            <>
                <Head>
                    <title>প্লেলিস্ট</title>
                </Head>
                <section className="banner-sec-wrap">
                    <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden"
                        style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                        <h2 className=" absolute top-[50%] left-[50%] lg:text-[40px] md:text-[35px] sm:text-[30px] xs:text-[25px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">
                            {scope}
                        </h2>
                    </div>
                </section>
                <section className="all__page__main__content">
                    <div className="container">
                        <div className="all__post__content flex flex-row">
                            <div className="lg:w-[70%]">
                                <div className='see__more__list__wrap clearfix'>
                                    <SeeMoreListPlayList audioPlaylist={playlist} playListScope={type} />

                                </div>
                            </div>
                            <div className="lg:w-[30%]">
                                <AudioDetailsSideBar />
                            </div>
                        </div>
                    </div>
                </section>
            </> :
            <div>
                <LoginPage url={currentUrl} />
            </div>
        }
        </>
    );
};

export default PlaylistSeeAll;