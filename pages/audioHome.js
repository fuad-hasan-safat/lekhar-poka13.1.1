import Head from 'next/head';
import { ImageSlider } from '../components/slider/ImageSlider';
import AudioHomePage from '../components/AudioBook/components/audioHome/AudioHome';

export default function AudioHome() {

    return (
        <>
            <div>
                <Head>
                    <title>অডিও</title>
                </Head>

                <div className="hm__slider__wrp lg:pt-[95px] md:pt-[90px] sm:pt-[92px] text-black " oncontextmenu="return false;">
                    <ImageSlider />
                    <AudioHomePage />
                </div>
            </div>
        </>
    );
}
