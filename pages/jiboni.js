import Head from 'next/head';
import SobJiboni from '../components/jiboni/sobJiboni'


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>জীবনী</title>
        </Head>
      
      <div className="lg:pt-[95px] md:pt-[90px] sm:pt-[85px]">

        <SobJiboni />
      </div>
      </div>
    </>
  );
}
