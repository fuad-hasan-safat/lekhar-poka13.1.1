
// import Procchod from "@/components/procchod/Procchod";
import Head from 'next/head';
import Procchod from '../components/procchod/Procchod'
//import { ImageSlider } from "@/components/slider/MySlider";
import { ImageSlider } from '../components/slider/ImageSlider'


// export const metadata = {
//   title: "প্রচ্ছদ",
//   description: "লেখার পোকা",
// };
export default function Home() {

  return (
    <>
      <div>
        <Head>
          <title>প্রচ্ছদ</title>
        </Head>

        <div className="lg:pt-[95px] md:pt-[76px] sm:pt-[92px] text-black " oncontextmenu="return false;">


          <ImageSlider />
          <Procchod />
        </div>
      </div>
    </>
  );
}
