import React from 'react'
import UserProfile from '../../components/userprofile/UserProfile'
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function Home() {
  const router = useRouter();

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
