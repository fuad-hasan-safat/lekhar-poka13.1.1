import Head from 'next/head';
import RecoveryPage from '../../components/recoverypage/RecoveryPage'
import PassRecoveryPageBeforeOTP from '../../components/recoverypage/UpdateRecoveryPage';



export default function Home() {

  return (
    <div>
      <Head>
        <title>পাসওয়ার্ড রিকভারি</title>
      </Head>

      <div className="">
        <PassRecoveryPageBeforeOTP/>
      </div>
    </div>
  );
}
