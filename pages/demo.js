import Head from 'next/head';
import Procchod from '../components/procchod/Procchod';
import { ImageSlider } from '../components/slider/ImageSlider';
import AduioBookHome from '../components/AudioBook/AudioBookHome';
import PlayList from '../components/AudioBook/components/audioPlaylist/PlayList';

export default function Home() {

  return (
    <>
      <div>
        <Head>
          <title>DELETE KOrte hobe </title>
        </Head>

        <div className="hm__slider__wrp lg:pt-[95px] md:pt-[90px] sm:pt-[92px] text-black " oncontextmenu="return false;">
          <ImageSlider />
          <PlayList/>
        </div>
      </div>
    </>
  );
}
