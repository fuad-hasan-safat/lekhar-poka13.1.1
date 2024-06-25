import Head from 'next/head';
import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import { singleAudioData } from '../../components/AudioBook/components/sampleData/singleAudioDetailsPage';
import AudioTabs from '../../components/AudioBook/components/audioDetails/AudioTabs';

export default function Home() {

    return (
        <>
            <div>
                <Head>
                    <title>Single AUdio</title>
                </Head>

                <section className='banner-sec-wrap lg:pt-[96px] md:pt-[75 px]'>
                    <div className="relative  flex justify-center items-center  w-full xl:h-[380px] lg:h-[380px] md:h-[360px] sm:h-[280px] xs:h-[270px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                        <div className='audio_banner__info__wrap flex flex-row place-content-center justify-center items-center'>
                            <div className=''>
                                <img className='w-[180px] h-[270px] -rotate-[19deg]' src={singleAudioData?.banner_img} alt=''/>

                            </div>
                            <div className='ml-[98px] text-center relative'>
                                <h5  className='text-[#F9A106] lg:text-[48px] md:text-[45px] sm:text-[42px] xs:text-[38px] font-semibold'>{singleAudioData?.title}</h5>
                                <img className='absolute -top-[10px] -right-[30px] ' src={singleAudioData?.category_icon}/>
                                <h5 className='text-[#484848] lg:text-[28px] md:text-[26px] sm:text-[24px] xs:text-[20px] font-semibold'>{singleAudioData.type} | {singleAudioData.writer} </h5>
                                <div className='flex flex-row text-center place-content-center'><img src='/audioBook/listiningIcon.png'/> 
                                <p className='text-[16px] text-[#484848] ml-[4px]'>{singleAudioData?.lisening_time}</p></div>

                            </div>

                        </div>
                    </div>

                </section>

                <div className='container lg:flex md:flex sm:block xs:block flex-row lg:pt-[95px] md:pt-[90px] sm:pt-[92px]'>

                    <div className='lg:w-[70%] md:w-[70%] sm:w-full xs:w-full'>
                        <AudioTabs audioData={singleAudioData} />
                    </div>


                    <div className='lg:w-[30%] md:w-[30%] sm:w-full xs:w-full'>
                        <AudioDetailsSideBar />
                    </div>

                </div>


            </div>
        </>
    );
}
