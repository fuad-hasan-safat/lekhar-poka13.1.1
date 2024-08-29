import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router';
import PostPage from '../../components/common/categorypage/PostPage';

export default function CatagoryPostPage() {

    const router = useRouter();
    const catTitle = router.query.catTitle;

  return (
    router.isReady &&
    <>
     <div>
        <Head>
          <title>{catTitle}</title>
        </Head>
    {/* lg:pt-[95px] sm:pt-[90px] xm:pt-[85] */}

      <div className="">
        <PostPage catTitle={catTitle}/>
      </div>
      </div>
    </>
  )
}
