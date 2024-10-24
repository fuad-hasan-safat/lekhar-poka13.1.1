'use client'
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SeeMoreListGrid from '../../components/AudioBook/components/SeeMoreList/SeeMoreListGrid';
import { audioList, bgAudioList } from '../../components/AudioBook/components/sampleData/samprotikData';
import SeeMoreListBackground from '../../components/AudioBook/components/SeeMoreList/SeeMoreListColorBg';
import axios from 'axios';
import { apiBasePath } from '../../utils/constant';
import Loading from '../../components/common/loading';
import { useSelector } from 'react-redux';



const SeeMoreList = () => {
    const playListScope = useSelector((state) => state.playlist.playListScope)

    const [seeAllRenderInfo, setSeeAllRenderInfo] = useState({
        sliderType: '',
        slideCategory: '',
        allbooks: [],
        isLoadedDone: false,
    })

    useEffect(() => {

        const type = localStorage.getItem("slideType");
        const category = localStorage.getItem("slideCategory");

        // console.log(type, category)

        setSeeAllRenderInfo((prevSeeAllRenderInfo) => ({
            ...prevSeeAllRenderInfo,
            sliderType: type,
            slideCategory: category,
        }))

        getData(category);

        
        setSeeAllRenderInfo((prevSeeAllRenderInfo) => ({
            ...prevSeeAllRenderInfo,
            isLoadedDone: true,
        }))

    }, [])


    async function getData(category) {
        let apiurl = `${apiBasePath}/books/${category}`;
        if (category === 'সাম্প্রতিক') {
            apiurl = `${apiBasePath}/recentbooks`;
        }
        try {
            const url = apiurl;
            const response = await axios.get(url);
            let bookList;
            if (category === 'সাম্প্রতিক') {
                bookList = response.data.books;

            } else {
                bookList = response.data.ebooks;

            }

            setSeeAllRenderInfo((prevSeeAllRenderInfo) => ({
                ...prevSeeAllRenderInfo,
                allbooks: bookList
            }))

        } catch (error) {
            console.log({ error })

        }

    }


    if (!seeAllRenderInfo.isLoadedDone) return <Loading />;


    let audioData = audioList.data;

    if (seeAllRenderInfo.isLoadedDone) {
        if (seeAllRenderInfo.sliderType === 'background') {
            audioData = bgAudioList.data;
        }
    }



    return (
        seeAllRenderInfo.isLoadedDone&& 
        <>
            <Head>
                <title>সব দেখুন</title>
            </Head>
            <section className="banner-sec-wrap">
                <div className="banner__bg__wrap relative w-full xl:h-[380px] lg:h-[380px] md:h-[360px] sm:h-[280px] xs:h-[250px]  overflow-hidden"
                    style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] lg:text-[40px] md:text-[38px] sm:text-[35px] xs:text-[24px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">
                        {seeAllRenderInfo.slideCategory}
                    </h2>
                </div>
            </section>
            <section className="all__page__main__content">
                <div className="container">
                    <div className="all__post__content flex flex-row">
                        <div className="lg:w-[70%]">
                            {seeAllRenderInfo.allbooks.length ?
                                <div className='see__more__list__wrap clearfix'>
                                    {
                                        seeAllRenderInfo.sliderType === 'no_background' &&
                                        <SeeMoreListGrid audioData={seeAllRenderInfo.allbooks} />
                                    }
                                    {
                                        seeAllRenderInfo.sliderType === 'background' &&
                                        <SeeMoreListBackground audioData={seeAllRenderInfo.allbooks} />
                                    }
                                </div> :
                                <div className='text-gray-700 text-[20px]'>
                                    কোন অডিওবুক খুঁজে পাওয়া যায় নি !
                                </div>
                            }
                        </div>
                        <div className="lg:w-[30%]">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SeeMoreList;