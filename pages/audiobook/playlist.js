'use client'
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { AudioPlayListContext } from '../../components/store/audioPlayer-context';
import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import { audioPlaylist } from '../../components/AudioBook/components/sampleData/audioPlaylist';
import SeeMoreListPlayList from '../../components/AudioBook/components/SeeMoreList/seeMorePlayList';
import Loading from '../../components/common/loading';
import LoginPage from '../../components/login/login';
import { useRouter } from 'next/router';
import { apiBasePath } from '../../utils/constant';
import { fetchDataWithAxios } from '../../utils/apiService';




const PlaylistSeeAll = () => {

    const router = useRouter();
    const currentUrl = router.asPath;

    const { playListRenderScope } = useContext(AudioPlayListContext)

    const [seeAllRenderInfo, setSeeAllRenderInfo] = useState({
        playListScope: '',
        playList:[],
        isLoadedDone: false,
    })

    useEffect(() => {

        const type = localStorage.getItem("playListRenderScope");
        let scope = '';

        if (type === 'latestPlayList') {
            scope = 'সর্বশেষ প্লেলিস্ট';
        } else if (type === 'myPlayList') {
            scope = 'আমার প্লেলিস্ট';
        } else if (type === 'details') {
            scope = 'প্লেলিস্ট'
        }
        if (!type) {
            scope = 'সর্বশেষ প্লেলিস্ট';
        }

        setSeeAllRenderInfo((prevSeeAllRenderInfo) => ({
            ...prevSeeAllRenderInfo,
            playListScope: scope,
            isLoadedDone: true
        }))


        // api call
    let playListUrl = `${apiBasePath}/showlatestplaylist/${localStorage.getItem('uuid')}`;
    if(scope === 'আমার প্লেলিস্ট'){
        playListUrl = `${apiBasePath}/showplaylist/${localStorage.getItem('uuid')}`;
    }

    getdata(playListUrl);

    }, [playListRenderScope])


    const getdata = async (url) =>{
        try{
            const playList = await fetchDataWithAxios(url);
            setSeeAllRenderInfo((prevSeeAllRenderInfo)=>({
                ...prevSeeAllRenderInfo,
                playList: playList.object,
            }))
        }catch(error){
            console.log('Playlist fetch error ', error)
        }
    
    }


    if (!seeAllRenderInfo.isLoadedDone) return <Loading />;


    return (
        <>{localStorage.getItem('uuid')?.trim().length ?
            <>
                <Head>
                    <title>প্লেলিস্ট</title>
                </Head>
                <section className="banner-sec-wrap">
                    <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden"
                        style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                        <h2 className=" absolute top-[50%] left-[50%] lg:text-[40px] md:text-[35px] sm:text-[30px] xs:text-[25px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">
                            {seeAllRenderInfo.playListScope}
                        </h2>
                    </div>
                </section>
                <section className="all__page__main__content">
                    <div className="container">
                        <div className="all__post__content flex flex-row">
                            <div className="lg:w-[70%]">
                                <div className='see__more__list__wrap clearfix'>
                                    <SeeMoreListPlayList audioPlaylist={seeAllRenderInfo.playList} playListScope={seeAllRenderInfo.playListScope} />

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