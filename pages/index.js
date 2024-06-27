import Head from 'next/head';
import Procchod from '../components/procchod/Procchod';
import { ImageSlider } from '../components/slider/ImageSlider';
import AduioBookHome from '../components/AudioBook/AudioBookHome';
import { useContext } from 'react';
import { SearchContext } from '../components/lekharpokaStore/search-context';
import SearchResult from '../components/common/SearchResult';

export default function Home() {
  const { isSearchbarActive } = useContext(SearchContext)

  return (
    <>
      <div>
        <Head>
          <title>প্রচ্ছদ</title>
        </Head>

        <div className="hm__slider__wrp lg:pt-[95px] md:pt-[90px] sm:pt-[92px] text-black " oncontextmenu="return false;">
          {isSearchbarActive && <SearchResult />}
          {!isSearchbarActive &&
            <>
              <ImageSlider />
              <AduioBookHome />
              <Procchod />
            </>
          }
        </div>
      </div>
    </>
  );
}
