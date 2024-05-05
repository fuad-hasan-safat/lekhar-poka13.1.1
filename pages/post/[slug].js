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
// import SimpleAudioPlayer from '../components/musicbar/SimpleAudioPlayer'

export default function PostDetails() {
  const router = useRouter();
  const slug = router.query.slug;
  // console.log("----slug-------", slug);

  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [isAudioAvailable, setIsAudioAvailAble] = useState(false);

  //const [catagory, setcategory] = useState('')

  const [rating, setRating] = useState(0);


  useEffect(() => {
    // console.log(
    //   "<<<<<<<<<<<<<<<<<<<<<<-------------------------in side use effect----------------------->>>>>>>>>>>>>>>>"
    // );

    async function fetchDataAsync() {

      try {
        const result = await fetchData(
          `${apiBasePath}/getpost/${slug}`
        );
        //console.log("result->>>>>>>>>>>>>>>>", result.object);
        setData(result.object);
        // console.log('post data -------- post', result.object)
        //setcategory(result.object.category);
        if (result.object.audio?.length > 0) {
          setIsAudioAvailAble(true);
        }else{
          setIsAudioAvailAble(false)
        }

        console.log('is audio available ------->>>', isAudioAvailable)
      } catch (error) {
        setError(error)
        console.log(error);
        // console.log("ERROR");
      } finally {
        //setcategory(kobita)
      }
    }

    fetchDataAsync();
  }, [router.query]);

  //console.log("----DDDDDDDDD AAAAAAAAA TTTTTTTT AAAAAAAAAAA-------", data);


  return (
    <>
      <div>
          <Head>
            <title>{data?.title}</title>
          </Head>
       </div>
       <section className="banner-sec-wrap ">
           <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                {<h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">{data?.category}</h2>}

            </div>
        </section>
      <section className="all__page__main__content">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="lg:flex lg:flex-row">
                  {(<div className="flex flex-col lg:w-[70%]">
                    <FullPost
                      content={data?.content}
                      title={data?.title}
                      writer={data?.writer}
                      catagory={data?.category}
                    />
                    <RatingComponent setRating={setRating} rating={rating} post_id={data?._id} />
                  </div>)
                    // : (

                    //   <div className="lg:w-[70%] pt-[110px] text-black" > সার্ভার এ পোস্টটি পাওয়া যায় নি </div>
                    // )

                  }


                  <div className="lg:w-[30%]">
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>


      {isAudioAvailable && (
        // <AudioPlayer
        //   playlist={[
        //     {
        //       audioSrc: `${apiBasePath}/${data.audio.slice(data.audio.indexOf("/") + 1)}`,
        //       metadata: {
        //         title: data.title,
        //         writer: data.writer,
        //         image: "/images/defaultUserPic/profile.jpg",
        //       },
        //     },
        //   ]}
        // />
        <MusicPlayer songs={[{
          id: data._id,
          title: data.title,
          src: `${apiBasePath}/${data.audio?.slice(data.audio.indexOf("/") + 1)}`,
          writer: data.writer,
          image: '/images/defaultUserPic/profile.jpg'

        }]} />

        // <SimpleAudioPlayer playlist={[{ audioSrc: `${apiBasePath}/${data.audio}`}]} />
      )}
    </>
  );
}
