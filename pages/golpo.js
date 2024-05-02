import SobGolpo from '../components/golpo/sobGolpo'
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>গল্প</title>
        </Head>
      {/* lg:pt-[95px] sm:pt-[90px] xm:pt-[85] text-black */}
      <div className="">
        <SobGolpo />
      </div>
      </div>
    </>
  );
}
