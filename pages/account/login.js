import Head from 'next/head';
import LoginPage from '../../components/login/login'



export default function Home() {

  return (
    <div>
      <Head>
        <title>লগ ইন</title>
      </Head>
    <div className="h-screen flex items-center justify-center ">
      <LoginPage />
    </div>
    </div>
  );
}
