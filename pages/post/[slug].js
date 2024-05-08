"use client";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from 'next/head';


import FullPost from '../../components/common/fullContent'
import RatingComponent from '../../components/common/starRating'
import AudioPlayer from '../../components/musicbar/AudioPlayer'
import { fetchData } from "../../function/api";
import { apiBasePath } from "../../utils/constant";
import MusicPlayer from "../../components/musicbar/MusicPlayer";
import ShareOnFacebook from "../../components/share/share";

export default function PostDetails() {
  const router = useRouter();
  const slug = router.query.slug;
  const { asPath } = router;

  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [isAudioAvailable, setIsAudioAvailAble] = useState(false);
  const [isdataFetch, setisDataFetch] = useState(false)


  const [rating, setRating] = useState(0);


  useEffect(() => {

    async function fetchDataAsync() {

      try {
        const result = await fetchData(
          `${apiBasePath}/getpost/${slug}`
        );
        setData(result.object);
        console.log('post page ====================>>>>>>>>>>>>>>>>>>>>', result.object)
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
        console.log('post page ====================>>>>>>>>>>>>>>>>>>>>', error)

      } finally {
      }
    }

    fetchDataAsync();
  }, [router.query]);



  return (
    router.isReady &&

    <>
      {/* <CustomHead title={data?.title} description={data?.writer} image={''} /> */}

      <div>
        <Head>
          <title>{data?.title}</title>
        </Head>
      </div>
      <section className="banner-sec-wrap">
        <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
          {<h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">{data?.category}</h2>}

        </div>
      </section>
      <section className="all__post__main__content">

        <div className="container">
          <div className="lg:flex lg:flex-row">
            {(
              <div className="flex flex-col lg:w-[70%]">
                {isdataFetch &&
                  <>
                    <div className="lg:mb-[110px] md:mb-[84px]">
                      <FullPost
                        content={data?.content}
                        title={data?.title}
                        writer={data?.writer}
                        catagory={data?.category}
                        url={asPath}
                      />
                    </div>
                    <ShareOnFacebook url={asPath} title={data?.title} description={data?.writer} image={' '} />
                    <RatingComponent setRating={setRating} rating={rating} post_id={data?._id} />
                  </>
                }
                {! isdataFetch && 
                <>
                <div className="text-black text-2xl">
                  আপনার অনুসন্ধানকৃত লেখাটি পাওয়া যাচ্ছে না !   
                </div>
                </>
                }
              </div>

            )

            }
            <div className="lg:w-[30%]">
              <Sidebar />
            </div>
          </div>
        </div>


      </section>


      {isAudioAvailable && (

        <MusicPlayer songs={[{
          id: data._id,
          title: data.title,
          src: `${apiBasePath}/${data.audio?.slice(data.audio.indexOf("/") + 1)}`,
          writer: data.writer,
          image: '/images/defaultUserPic/profile.jpg'

        }]} />

      )}
    </>
  );
}
