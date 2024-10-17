import ContactUs from '../components/contactus/contactus'
import Head from 'next/head';


export default function Home() {
  const description = 'আমাদের সাথে যোগাযোগ করুন । ঠিকানা ঃ ১৩/২ ওয়েস্ট পান্থপথ, ধানমন্ডী, ঢাকা';
  return (
    <>
      <div>
        <Head>
          <title>যোগাযোগ</title>
          <meta property="og:url" content="https://lekharpoka.com/contacts" />
          <meta property="og:site_name" content="Lekhar Poka" />
          <meta property="og:locale" content="bn_BD" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Privacy and Policy" key="og:title" />
          <meta property="og:description" content={`${description} #lekharpoka`} />
          <meta property="og:image" content='/lekharPokaPreviewImage/lekharpokabanner.jpg' key="og:image" />
        </Head>
      {/* lg:pt-[95px] md:pt-[90px] sm:pt-[85px] */}
      <div className=" text-black">
       
        <ContactUs />
      </div>
      </div>
    </>

  );
}
