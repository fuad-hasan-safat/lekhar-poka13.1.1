import Head from 'next/head';
import PassRecoveryPageBeforeOTP from '../../components/recoverypage/UpdateRecoveryPage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Home() {

  const router = useRouter();
  const userUuid = useSelector((state) => state.usersession.userUuid);
  const [isLanded, setIsLanded] = useState(false);

  useEffect(() => {
    if (userUuid) {
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
        {userUuid ? <>

        </> : <>
          <PassRecoveryPageBeforeOTP />
        </>}
      </div>
    </div>
  );
}
