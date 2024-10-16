import Head from 'next/head';
import Procchod from '../components/procchod/Procchod';
import { ImageSlider } from '../components/slider/ImageSlider';
import AduioBookHome from '../components/AudioBook/AudioBookHome';

export default function Home() {

  return (
    <>
      <Head>
        <title>প্রচ্ছদ</title>

        <meta charSet="utf-8" />
        <meta property="og:title" content="লেখার পোকা" />
        <meta property="og:description" key="og:description" content=" লেখার পোকা  হলো কবিতা, গান, প্রবন্ধ গল্প এবং জীবনী লেখা প্রকাশের একটি ওয়েব সাইট। যেটা অভিব্যক্তির একটি সুন্দর রূপ যা ব্যক্তিদের তাদের চিন্তাভাবনা, আবেগ এবং অভিজ্ঞতা সৃজনশীল এবং শৈল্পিক উপায়ে প্রকাশ করতে দেয়। " />
        <meta property="og:image" content='https://lekharpoka.com/lekharPokaPreviewImage/lekharpokabanner.jpg' />
        <meta property="og:url" content="https://lekharpoka.com/" key="og:url" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="https://lekharpoka.com/lekharPokaPreviewImage/lekharpokabanner.jpg" />
        <meta name="twitter:title" content="লেখার পোকা" />
        <meta name="twitter:description" content=" লেখার পোকা  হলো কবিতা, গান, প্রবন্ধ গল্প এবং জীবনী লেখা প্রকাশের একটি ওয়েব সাইট। যেটা অভিব্যক্তির একটি সুন্দর রূপ যা ব্যক্তিদের তাদের চিন্তাভাবনা, আবেগ এবং অভিজ্ঞতা সৃজনশীল এবং শৈল্পিক উপায়ে প্রকাশ করতে দেয়। " />
        <meta name="twitter:image" content='https://lekharpoka.com/lekharPokaPreviewImage/lekharpokabanner.jpg' />

      </Head>
      <div>


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
