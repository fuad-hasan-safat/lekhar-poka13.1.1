import React, { useContext } from 'react'
import UserProfile from '../../components/userprofile/UserProfile'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Toast from '../../components/toast/Toast';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  const isToastShow = useSelector((state) => state.toast.isToastShow);

  if (!router.isReady) return null;

  return (
    router.isReady &&
    <>
      <div className=''>
        <Head>
          <title>প্রোফাইল</title>
        </Head>
      
        <UserProfile/>
      </div>
    </>
  )
}
