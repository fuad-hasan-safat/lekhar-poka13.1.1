import Head from 'next/head';
import RecoveryPage from '../../components/recoverypage/RecoveryPage'



export default function Home() {

  return (
    <div>
      <Head>
        <title>পাসওয়ার্ড রিকভারি</title>
      </Head>

      <div className="h-screen flex items-center justify-center ">
        <RecoveryPage />
      </div>
    </div>
  );
}
