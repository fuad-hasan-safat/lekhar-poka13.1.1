'use client'
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { AudioPlayListContext } from '../../components/store/audioPlayer-context';
import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import AudioPlayer from '../../components/AudioBook/AudioPlayer/AudioPlayer';

import { audioPlaylist } from '../../components/AudioBook/components/sampleData/audioPlaylist';
import SeeMoreListPlayList from '../../components/AudioBook/components/SeeMoreList/SeeMorePlayList';
import Loading from '../../components/common/loading';




const PlaylistSeeAll = () => {


    const [seeAllRenderInfo, setSeeAllRenderInfo] = useState({
        playListScope: '',
        isLoadedDone: false,
    })

    useEffect(() => {

        const type = localStorage.getItem("playlistScope");
        let scope = '';

        if (type === 'latestPlayList') {
            scope = 'সর্বশেষ প্লেলিস্ট';
        } else if (type === 'myPlayList') {
            scope = 'আমার প্লেলিস্ট';
        } else if (type === 'details') {
            scope = 'অডিও'
        }

        setSeeAllRenderInfo((prevSeeAllRenderInfo) => ({
            ...prevSeeAllRenderInfo,
            playListScope: scope,
            isLoadedDone: true
        }))

    }, [])


    if (!seeAllRenderInfo.isLoadedDone) return <Loading />;


    return (
        <>
            <Head>
                <title>প্লেলিস্ট</title>
            </Head>
            <section className="banner-sec-wrap">
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden"
                    style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">
                        {seeAllRenderInfo.playListScope}
                    </h2>
                </div>
            </section>
            <section className="all__page__main__content">
                <div className="container">
                    <div className="all__post__content flex flex-row">
                        <div className="lg:w-[70%]">
                            <div className='see__more__list__wrap clearfix'>
                                <SeeMoreListPlayList audioPlaylist={audioPlaylist} />

                            </div>
                        </div>
                        <div className="lg:w-[30%]">
                            <AudioDetailsSideBar />
                        </div>
                    </div>
                </div>
            </section>
            <AudioPlayer />
        </>
    );
};

export default PlaylistSeeAll;