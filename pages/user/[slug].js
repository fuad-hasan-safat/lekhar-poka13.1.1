import React, { useContext } from 'react'
import UserProfile from '../../components/userprofile/UserProfile'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UserContext } from '../../components/lekharpokaStore/user-context';
import LoginPage from '../../components/login/login';



export default function Home() {
  const router = useRouter();
  const currentUrl = router.asPath;
  const slug = router.query.slug;
  const { userUuid } = useContext(UserContext)

  if(!router.isReady) return null;

  return (
    router.isReady ?
      <>
        <div className=''>
          <Head>
            <title>প্রোফাইল</title>
          </Head>
          <UserProfile slug={slug} />
        </div>
      </> :
      <>
        <div className='pb-[-80px]'>
          <LoginPage url={currentUrl} />
        </div>
      </>
  )
}
