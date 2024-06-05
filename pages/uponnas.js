import Head from 'next/head';
import SobUponnas from '../components/uponnas/sobUponnas'

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>উপন্যাস</title>
        </Head>
        {/* lg:pt-[95px] md:pt-[90px] sm:pt-[85px] */}
      
      <div className=" ">
        <SobUponnas />
      </div>
      </div>
    </>
  );
}
