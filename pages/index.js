import Head from 'next/head';
import Procchod from '../components/procchod/Procchod';
import { ImageSlider } from '../components/slider/ImageSlider';
import AduioBookHome from '../components/AudioBook/AudioBookHome';

export default function Home() {

  return (
    <>
      <div>
        <Head>
          <title>প্রচ্ছদ</title>
        </Head>

        <div className="hm__slider__wrp lg:pt-[95px] md:pt-[90px] sm:pt-[92px] text-black " oncontextmenu="return false;">
            <>
              <ImageSlider />
              <AduioBookHome />
              <Procchod />
            </>
        </div>
      </div>
    </>
  );
}
