import Head from 'next/head';
import Procchod from '../components/procchod/Procchod';
import { ImageSlider } from '../components/slider/ImageSlider';
import AduioBookHome from '../components/AudioBook/AudioBookHome';

export default function AudioHome() {

  return (
    <>
      <div>
        <Head>
          <title>অডিও</title>
        </Head>

        <div className="hm__slider__wrp lg:pt-[95px] md:pt-[90px] sm:pt-[92px] text-black " oncontextmenu="return false;">
          <ImageSlider />
         
        </div>
      </div>
    </>
  );
}
