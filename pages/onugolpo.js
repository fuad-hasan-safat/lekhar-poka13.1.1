import Head from 'next/head';
import SobOnuGolpo from '../components/onugolpo/sobOnugolpo'


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>অনুগল্প</title>
        </Head>
      
      <div className="lg:pt-[95px] md:pt-[90px] sm:pt-[85px] text-black">
        <SobOnuGolpo />
      </div>
      </div>
    </>
  );
}
