import Head from 'next/head';
import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import AudioTabs from '../../components/AudioBook/components/audioDetails/AudioTabs';
import { apiBasePath } from '../../utils/constant';
import { useEffect, useState } from 'react';
import RequiredLogin from '../../components/common/RequiredLogIn';
import LoginPage from '../../components/login/login';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const { slug } = context.params;
    try {

        const res = await fetch(`${apiBasePath}/getaudiobook/${slug}`);
        const singleAudioData = await res.json()


        const postRes = await fetch(`${apiBasePath}/updateview/${slug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const postResult = await postRes.json();

        console.log({ postResult })

        return { props: { singleAudioData } }

    }catch(error){
        console.log(error)
    }
    

    const singleAudioData = []

    return { props: { singleAudioData } }

}

export default function Home({ singleAudioData }) {

    const router = useRouter();
    const currentUrl = router.asPath;

    console.log({ singleAudioData })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
    }, [])

    if (!isLoading) return null;

    

    return (
        <>{localStorage.getItem('uuid')?.trim().length > 0 ?
            <div>
                <Head>
                    <title>{singleAudioData?.title}</title>
                </Head>

                <section className='banner-sec-wrap lg:pt-[96px] md:pt-[75px] sm:pt-[85px] xs:pt-[60px]'>
                    <div className="relative  flex justify-center items-center  w-full xl:h-[380px] lg:h-[380px] md:h-[360px] sm:h-[280px] xs:h-[270px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                        <div className='audio_banner__info__wrap flex flex-row place-content-center justify-center items-center'>
                            <div className=''>
                                <img className='object-cover lg:w-[180px] md:w-[170px] sm:w-[140px] xs:w-[75px] lg:h-[270px] md:h-[260px] sm:h-[190px] xs:h-[130px] -rotate-[19deg]' src={`${apiBasePath}/${singleAudioData?.banner_img.slice(singleAudioData?.banner_img.indexOf('/') + 1)}`} alt='' />

                            </div>
                            <div className='lg:ml-[98px] lg:ml-[90px] sm:ml-[80px] xs:ml-[30px] text-center relative'>
                                <h5 className='text-[#F9A106] lg:text-[48px] md:text-[45px] sm:text-[42px] xs:text-[24px] font-semibold'>{singleAudioData?.title}</h5>
                                {singleAudioData?.mature_content && <img className='absolute -top-[10px] -right-[30px] ' src={'/audioBook/audioCatIcon/18+.svg'} />}
                                <h5 className='text-[#484848] lg:text-[28px] md:text-[26px] sm:text-[24px] xs:text-[16px] font-semibold'>{singleAudioData.type} | {singleAudioData.writer} </h5>
                                <div className='flex flex-row text-center place-content-center'><img src='/audioBook/listiningIcon.png' />
                                    <p className='text-[16px] text-[#484848] ml-[4px]'>{singleAudioData?.lisening_time}</p></div>

                            </div>

                        </div>
                    </div>

                </section>

                <div className='container lg:flex md:flex sm:block xs:block flex-row lg:pt-[95px] md:pt-[90px] sm:pt-[60px] xs:pt-[60px]'>

                    <div className='lg:w-[70%] md:w-[70%] sm:w-full xs:w-full'>
                        <AudioTabs singleAudioData={singleAudioData} />
                    </div>


                    <div className='lg:w-[30%] md:w-[30%] sm:w-full xs:w-full'>
                        <AudioDetailsSideBar />
                    </div>

                </div>


            </div> : <div className='pb-[-80px]'>
                {/* <RequiredLogin/> */}
                <LoginPage url={currentUrl} />
            </div>
        }
        </>
    );
}
