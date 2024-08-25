import Head from 'next/head';
import SobKobita from '../components/kobita/sobKobita'
export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>কবিতা</title>
        </Head>
    {/* lg:pt-[95px] sm:pt-[90px] xm:pt-[85] */}

      <div className="">
        <SobKobita />
      </div>
      </div>
    </>
  );
}
