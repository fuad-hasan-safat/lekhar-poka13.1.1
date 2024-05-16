"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from 'next/head';


import { fetchData } from "../../../function/api";
import { apiBasePath } from "../../../utils/constant";
import FullPostReaderMod from '../../../components/common/fullContentReadermood'

export default function PostDetailsReaderMood() {
  const router = useRouter();
  const slug = router.query.slug;

  const [data, setData] = useState(null); // State to store fetched data
  const [writerImage, setWriterImage] = useState('')
  const [error, setError] = useState(null); // State to store any errors
  const [isAudioAvailable, setIsAudioAvailAble] = useState(false);
  const [isdataFetch, setisDataFetch] = useState(false)

  //  focus mood ----



  useEffect(() => {

    async function fetchDataAsync() {

      try {
        const result = await fetchData(
          `${apiBasePath}/getpost/${slug}`
        );
        setData(result.object);
        setWriterImage(result.writer_image)
        // console.log('post page ====================>>>>>>>>>>>>>>>>>>>>', result.object)
        if (result.object.audio?.length > 0) {
          setIsAudioAvailAble(true);
        } else {
          setIsAudioAvailAble(false)
        }

        if (result.status === 'success') {
          setisDataFetch(true)
        } else if (result.status === 'failed') {
          setisDataFetch(false)
        }

        // console.log('is audio available ------->>>', isAudioAvailable)
      } catch (error) {
        setError(error)
        // console.log('post page ====================>>>>>>>>>>>>>>>>>>>>', error)

      } finally {
      }
    }

    fetchDataAsync();
  }, [router.query]);

  function readMoodHandler(postId){
    router.push(`/post/${postId}`)
  }


  return (
    router.isReady &&

    <>

      {/* <CustomHead title={data?.title} description={data?.writer} image={''} /> */}

      <div>
        <Head>

          <title>{data?.title}</title>
          <meta property="og:url" content={`lekharpoka.com/post/${slug}`} />
          <meta property="og:title" content={data?.title} />
          <meta property="og:description" content={'লেখার পোকা'} />
          <meta property="og:image" content={''} />
  

        </Head>
      </div>

     <section>
        <div className="container">
            <div className="flex">
            <div className="w-[20%] mt-[70px]">
                <button className="fixed  px-[15px] py-[5px] text-white rounded-xl bg-orange-400" onClick={()=>readMoodHandler(data?._id)}>X</button>

                </div>
                <div className="w-[60%] mt-[70px] mb-[70px]" >
                <FullPostReaderMod title={data?.title} writer={data?.writer} content={data?.content}/>

                </div>

            </div>
        

        </div>
     </section>
      
    </>
  );
}
