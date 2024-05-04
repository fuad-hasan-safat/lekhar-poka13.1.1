import Head from 'next/head';
import SobProbondho from '../components/probondho/sobProbondho'


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>প্রবন্ধ</title>
        </Head>
      {/* lg:pt-[95px] md:pt-[90px] sm:pt-[90px] */}
      <div className=" ">
        <SobProbondho />
      </div>
      </div>
    </>
  );
}
