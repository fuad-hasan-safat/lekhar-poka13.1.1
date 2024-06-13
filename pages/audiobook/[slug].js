import Head from 'next/head';

import AudioDetailsSideBar from '../../components/AudioBook/components/audioSidebar/AudioDetailsSidebar';

export default function Home() {

    return (
        <>
            <div>
                <Head>
                    <title>Single AUdio</title>
                </Head>

                <div className='container flex flex-row lg:pt-[95px] md:pt-[90px] sm:pt-[92px]'>
                    <div className="w-[70%] hm__slider__wrp  text-black " oncontextmenu="return false;">

                    </div>

                    <div className='w-[30%]'>
                        <AudioDetailsSideBar />
                    </div>

                </div>


            </div>
        </>
    );
}
