import Head from 'next/head';

import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';
import { singleAudioData } from '../../components/AudioBook/components/sampleData/singleAudioDetailsPage';

export default function Home() {

    return (
        <>
            <div>
                <Head>
                    <title>Single AUdio</title>
                </Head>

                <section className='banner-sec-wrap'>
                    <div className="relative w-full xl:h-[380px] lg:h-[380px] md:h-[360px] sm:h-[280px] xs:h-[270px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    </div>

                </section>

                <div className='container flex flex-row lg:pt-[95px] md:pt-[90px] sm:pt-[92px]'>

                    <div className='w-[70%]'>

                    </div>


                    <div className='w-[30%]'>
                        <AudioDetailsSideBar />
                    </div>

                </div>


            </div>
        </>
    );
}
