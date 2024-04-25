import React from 'react'
import UserProfile from '../../components/userprofile/UserProfile'
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter()
  const slug = router.query.slug;

  return (
    router.isReady &&
    <>
      <div className='global_padding'>
        <UserProfile slug={slug} />
      </div>
    </>
  )
}
