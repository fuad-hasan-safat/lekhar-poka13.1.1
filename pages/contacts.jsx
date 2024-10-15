import ContactUs from '../components/contactus/contactus'
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>যোগাযোগ</title>
        </Head>
      {/* lg:pt-[95px] md:pt-[90px] sm:pt-[85px] */}
      <div className=" text-black">
       
        <ContactUs />
      </div>
      </div>
    </>

  );
}
