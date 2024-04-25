"use client";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useEffect, useState } from "react";

import FullPost from '../../components/common/fullContent'
import { fetchData } from "../../function/api";
import AudioPlayer from '../../components/musicbar/AudioPlayer'
import RatingComponent from '../../components/common/starRating'
import { apiBasePath } from "../../utils/constant";
import { useRouter } from "next/router";


export default function PostDetails() {
    const router = useRouter();
    const slug = router.query.slug;
  //console.log("----slug-------", slug);

  const [data, setData] = useState([]); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [rating, setRating] = useState(0);
  const [isAudioAvailable, setIsAudioAvailAble] = useState(false);



  useEffect(() => {
    console.log("in side use effect");
    async function fetchDataAsync() {
      try {
        const result = await fetchData(
          `${apiBasePath}/getslider/${slug}`
        );
        //console.log("result         ->>>>>>>>>>>>>>>>", result.object);
        setData(result.object.post);
      } catch (error) {
        alert(error)
      }
    }

    fetchDataAsync();
  }, []);

  //console.log('----DDDDDDDDD AAAAAAAAA TTTTTTTT AAAAAAAAAAA-------', data)

  return (
    <>
      <section className="all__post__sec__wrap">
        <div>
          {/* <Image
            src={"/images/pages-banner-svg/golpo.svg"}
            height={380}
            width={1920}
            alt={"kobita banner"}
          /> */}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-col pt-[115px]">
                <div className="flex flex-row">
                  <div className="flex flex-col w-[70%]">
                    <FullPost
                      content={data.content}
                      title={data.title}
                      writer={data.writer}
                    />
                    <RatingComponent setRating={setRating} rating={rating} post_id={data._id} />
                  </div>

                  <div className="w-sidebarwidth">
                    <Sidebar />
                  </div>
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
      )}
    </>
  );
}
