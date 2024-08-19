import Head from 'next/head';
import PassRecoveryPageBeforeOTP from '../../components/recoverypage/UpdateRecoveryPage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';




export default function Home() {

  const router = useRouter();
  const [isLanded, setIsLanded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('uuid').length > 0) {
      router.push('/')
    }
    setIsLanded(true);
  }, []);

  if (!isLanded) return null;

  return (
    <div>
      <Head>
        <title>পাসওয়ার্ড রিকভারি</title>
      </Head>

      <div className="">
        {localStorage.getItem('uuid').length > 0 ? <>

        </> : <>
          <PassRecoveryPageBeforeOTP />
        </>}
      </div>
    </div>
  );
}
