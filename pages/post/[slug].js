"use client";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import FullPost from '../../components/common/fullContent'
import RatingComponent from '../../components/common/starRating'
import AudioPlayer from '../../components/musicbar/AudioPlayer'
import { fetchData } from "../../function/api";
import { apiBasePath } from "../../utils/constant";
// import SimpleAudioPlayer from '../components/musicbar/SimpleAudioPlayer'

export default function PostDetails() {
  const router = useRouter();
  const slug = router.query.slug;
  console.log("----slug-------", slug);

  const [data, setData] = useState([]); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [isAudioAvailable, setIsAudioAvailAble] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [audioData, setAudioData] = useState(null);
  //const [catagory, setcategory] = useState('')

  const [rating, setRating] = useState(0);


  useEffect( () => {
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
      console.log('post data -------- post', result.object)
      //setcategory(result.object.category);
      if (result.object.audio.length > 0) {
        setIsAudioAvailAble(true);
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR");
    } finally {
      //setcategory(kobita)
    }
    }

    fetchDataAsync();
  }, []);

  //console.log("----DDDDDDDDD AAAAAAAAA TTTTTTTT AAAAAAAAAAA-------", data);


  return (
    <>
      <section className="all__post__sec__wrap">
        <div className="relative">
          <Image
            src={"/images/pages-banner-svg/baseBanner.png"}
            height={380}
            width={1920}
            alt={"kobita banner"}
          />
          <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%]">{data.category}</h2>

        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-row">
                {<div className="flex flex-col w-[70%]">
                  <FullPost
                    content={data.content}
                    title={data.title}
                    writer={data.writer}
                    catagory={data.category}
                  />
                  <RatingComponent setRating={setRating} rating={rating} post_id={data._id} />
                </div>

                }

                <div className="w-sidebarwidth">
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isAudioAvailable && (
        <AudioPlayer
          playlist={[
            {
              audioSrc: `${apiBasePath}/${data.audio}`,
              metadata: {
                title: data.title,
                writer: data.writer,
                image: "/images/writerimage/nazrul.jpg",
              },
            },
          ]}
        />

        // <SimpleAudioPlayer playlist={[{ audioSrc: `${apiBasePath}/${data.audio}`}]} />
      )}
    </>
  );
}
