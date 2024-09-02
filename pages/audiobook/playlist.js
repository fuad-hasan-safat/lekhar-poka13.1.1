'use client'
import Head from 'next/head';
import React from 'react';
import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import SeeMoreListPlayList from '../../components/AudioBook/components/SeeMoreList/seeMorePlayList';
import LoginPage from '../../components/login/login';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


const PlaylistSeeAll = () => {

    const router = useRouter();
    const currentUrl = router.asPath;

    const userUuid = useSelector((state) => state.usersession.userUuid);
    const type = useSelector((state) => state.playlist.playListScope)
    const myPlaylist = useSelector((state) => state.playlist.myPlaylist);
    const lattestPlaylist = useSelector((state) => state.playlist.lattestPlaylist);

    const scope = type === 'latestPlayList'? 'সর্বশেষ প্লেলিস্ট' : 'আমার প্লেলিস্ট';
    const playlist = type === 'latestPlayList'? lattestPlaylist: myPlaylist;


    return (
        <>{ userUuid?
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