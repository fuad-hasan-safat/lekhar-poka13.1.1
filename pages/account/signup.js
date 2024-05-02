import Head from 'next/head';
import SignUpPage from '../../components/signup/SignUpPage'

export default function Home() {
  return (
    <div>
      <Head>
        <title>সাইন আপ</title>
      </Head>
      <div className="h-screen flex items-center justify-center ">
        <SignUpPage />
      </div>
    </div>
  );
}
