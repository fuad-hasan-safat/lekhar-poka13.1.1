'use client'
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SeeMoreListGrid from '../../components/AudioBook/components/SeeMoreList/SeeMoreListGrid';
import { audioList, bgAudioList } from '../../components/AudioBook/components/sampleData/samprotikData';
import { SeeAllSliderContext } from '../../components/store/seeall-slider-context';
import SeeMoreListBackground from '../../components/AudioBook/components/SeeMoreList/SeeMoreListColorBg';



const SeeMoreList = () => {


    const [seeAllRenderInfo, setSeeAllRenderInfo] = useState({
        sliderType: '',
        slideCategory: '',
        isLoadedDone: false,
    })

    useEffect(() => {

        const type = localStorage.getItem("slideType");
        const category = localStorage.getItem("slideCategory");

        console.log(type, category)

        setSeeAllRenderInfo((prevSeeAllRenderInfo) => ({
            ...prevSeeAllRenderInfo,
            sliderType: type,
            slideCategory: category,
            isLoadedDone: true,
        }))
    }, [])




    let audioData = audioList.data;

    if(seeAllRenderInfo.isLoadedDone){
        if(seeAllRenderInfo.sliderType === 'background'){
            audioData = bgAudioList.data;
        }
    }


    if (!seeAllRenderInfo.isLoadedDone) return null;

    return (
        <>
            <Head>
                <title>সব দেখুন</title>
            </Head>
            <section className="banner-sec-wrap">
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden"
                    style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">
                        {seeAllRenderInfo.slideCategory}
                    </h2>
                </div>
            </section>
            <section className="all__page__main__content">
                <div className="container">
                    <div className="all__post__content flex flex-row">
                        <div className="lg:w-[70%]">
                            <div className='see__more__list__wrap clearfix'>
                                {
                                    seeAllRenderInfo.sliderType === 'no_background' &&
                                    <SeeMoreListGrid audioData={audioData} />
                                }
                                {
                                    seeAllRenderInfo.sliderType === 'background' &&
                                    <SeeMoreListBackground audioData={audioData} />
                                }
                            </div>
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