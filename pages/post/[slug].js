"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from 'next/head';


import FullPost from '../../components/common/fullContent'
import RatingComponent from '../../components/common/starRating'
import { fetchData } from "../../function/api";
import { apiBasePath } from "../../utils/constant";
import MusicPlayer from "../../components/musicbar/MusicPlayer";
import ShareOnFacebook from "../../components/share/share";
import { FacebookShareButton } from "react-share";
import axios from "axios";
import ReaderModeModal from "../../components/readerMode/ReaderModeModal";
import FullPostReaderMode from "../../components/common/fullContentReadermood";

export default function PostDetails() {
  const router = useRouter();
  const slug = router.query.slug;
  const { asPath } = router;

  const [data, setData] = useState(null); // State to store fetched data
  const [writerImage, setWriterImage] = useState('')
  const [error, setError] = useState(null); // State to store any errors
  const [isAudioAvailable, setIsAudioAvailAble] = useState(false);
  const [isdataFetch, setisDataFetch] = useState(false)
  const [uploaderName, setUploaderName] = useState('')
  const [profileName, setProfileName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);


  //  focus mood ----

  const [rating, setRating] = useState(0);


  useEffect(() => {

    async function fetchDataAsync() {

      try {
        const result = await axios.get(
          `${apiBasePath}/getpost/${slug}`
        );
        setData(result.data.object);
        setWriterImage(result.data.profile_image)
        setUploaderName(result.data.uploader_name)
        setProfileName(result.data.profile_name)
        console.log('post page single postss ====================>>>>>>>>>>>>>>>>>>>>', result)
        if (result.data.object.audio?.length > 0) {
          setIsAudioAvailAble(true);
        } else {
          setIsAudioAvailAble(false)
        }

        if (result.data.status === 'success') {
          setisDataFetch(true)
        } else if (result.data.status === 'failed') {
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


  function readMoodHandler(postId) {
    router.push(`/post/readermood/${postId}`)
  }


  // select image

  let selectedcoverImage = writerImage;

  if (data?.image?.length > 0) {
    selectedcoverImage = data?.image;
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
      <body className=" body__control" >
        <div className="all__post__content__overlay">
          <section className="banner-sec-wrap place-content-center">
            <div className="relative w-full xl:h-[190px] lg:h-[180px] md:h-[180px] sm:h-[180px] xs:h-[170px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
              {<h2 className=" absolute top-[63%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">{data?.category}</h2>}
            </div>
          </section>
          <section className="all__post__main__content">
            <div className="container">
              <div className="lg:flex lg:flex-row">
                {(
                  <div className="flex flex-col w-full relative z-50">
                    {isdataFetch &&
                      <>
                        <div className="kobita__dsc__lft relative flex lg:mb-[110px] md:mb-[84px]">
                          <div>
                            <FullPost
                              id={slug}
                              content={data?.content}
                              title={data?.title}
                              writer={data?.writer}
                              writer_id={data?.writer_id}
                              image={selectedcoverImage}
                              uploadedBy={uploaderName}
                              writer_image={writerImage}
                              profileName={profileName}
                              updatedAt={data?.updatedAt}
                              catagory={data?.category}
                              url={asPath}
                            />

                          </div>
                          <div>
                            <button onMouse className="absolute  w-[35px] h-[35px] right-2 mt-[5px] text-white rounded-xl bg-orange-400" onClick={() => setIsModalOpen(true)}><i class="ri-book-read-fill text-[22px]"></i></button>
                          </div>




                        </div>
                        <div className="rating__share__wrap">
                          <ShareOnFacebook url={`lekharpoka.com/post/${slug}`} title={'লেখার পোকায় আপনাকে স্বাগতম'} image={''} />
                          <RatingComponent setRating={setRating} rating={rating} post_id={data?._id} />
                        </div>
                      </>
                    }
                    {!isdataFetch &&
                      <>
                        <div className="text-black text-2xl mb-[75px]">
                          আপনার অনুসন্ধানকৃত লেখাটি পাওয়া যাচ্ছে না !
                        </div>
                      </>
                    }
                  </div>

                )

                }
                {/* <div className="kobita__dsc__rgt lg:w-[30%]">
              <Sidebar />
            </div> */}
              </div>
            </div>


          </section>
        </div>


        <ReaderModeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <section className="read__mod__sec__wrap py-[100px] pb-[470px]" onCopy={(e) => { e.preventDefault(); alert('এই ওয়েবসাইটের যেকোনো লেখা আমাদের অনুমতি ছাড়া কপি করলে আইনগত ব্যবস্থা গ্রহণ করা হবে।') }}>
            <div className="read__mod__wrap">
              {/* <div className="read__mod__btn">
                <button className="w-[40px] h-[40px] text-white rounded-full bg-orange-400" onClick={() => readMoodHandler(data?._id)}><i class="ri-close-large-fill"></i></button>
              </div> */}
              <div className="read__mod__innr">
                <FullPostReaderMode
                  title={data?.title}
                  writer={data?.writer}
                  writer_id={data?.writer_id}
                  catagory={data?.category}
                  content={data?.content}
                  // fontSize={fontSize}

                  
                   />
              </div>
            </div>
          </section>

        </ReaderModeModal>


        {isAudioAvailable && (

          <MusicPlayer songs={[{
            id: data?._id,
            title: data?.title,
            src: `${apiBasePath}/${data?.audio?.slice(data.audio.indexOf("/") + 1)}`,
            writer: data?.writer,
            image: `${apiBasePath}/${writerImage?.slice(writerImage.indexOf("/") + 1)}`,

          }]} />

        )}
      </body>
    </>
  );
}
