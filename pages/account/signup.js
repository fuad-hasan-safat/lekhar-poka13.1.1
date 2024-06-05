import Head from 'next/head';
import SignUpPageBeforeOTP from '../../components/signup/SignUpPageBeforeOTP';

export default function Home() {
  return (
    <div>
      <Head>
        <title>সাইন আপ</title>
      </Head>
      <div className="items-center justify-center ">
        {/* <SignUpPage /> */}
        <SignUpPageBeforeOTP/>
      </div>
    </div>
  );
}
