"use client"
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import MaincontentBody from "../common/maincontentBody";
import MainContentDivider from "../common/mainContentDivider";
import SobKobitaBody from "./sobKobitaBody";
import axios from "axios";
import Loading from "../common/loading";
import { apiBasePath } from "../../utils/constant";
import { countWords } from "../../function/api";

export default function SobKobitaLeftContent() {


  //   const [selectedId, setSelectedId] = useState("sob");
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State to store any errors
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5; // Number of posts to display per page
  const [isHasMore, setisHasMore] = useState(false);


  useEffect(() => {

    const fetchTotalPage = async () => {
      try {
        const response = await fetch(`${apiBasePath}/categorypostpages/কবিতা`);
        const data = await response.json();
        setTotalPages(data?.length);
        if (data?.length > 1) {
          setisHasMore(true)
        }
        console.log('total page ----->>>>', data.length)
      } catch (error) {
        setError(error);
      } finally {
        // setIsLoading(false)
      }
    };

    fetchTotalPage();


  }, []);


  const fetchPosts = async () => {
    console.log('fetch post called for page -----', currentPage)
    try {
      const response = await fetch(`${apiBasePath}/categoryposts/কবিতা/${currentPage}`);
      const data = await response.json();
      setPostList(postList.concat(data));

      console.log('main post by per page inside loader-------->>', data)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [totalPages]);


  const loadnextPage = () => {

    console.log({ currentPage, totalPages })
    setCurrentPage(currentPage + 1)

    if (currentPage <= totalPages) {
      fetchPosts();
    } else {
      setisHasMore(false)
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>Error fetching posts: {error.message}</div>
      ) : (
        <>
          <div className=''>
            {postList.length ?
              <div className='flex'>
                <div className="lakha__main__content pt-20  text-3xl lg:mr-[100px] md:mr-[70px] ">
                  {postList.length && (
                    postList?.map((post, index) => (
                      <>
                        <div key={index}>
                          <SobKobitaBody
                            id={post._id} // Assuming '_id' is the unique identifier
                            title={post.title}
                            writer={post.writer}
                            category={post.category}
                            // content={post.content.split(/\s+/).slice(0, 180).join(" ")}
                            content={countWords(post.content, 30)}

                          />
                        </div>
                        {index < postList.length - 1 && <MainContentDivider />}
                      </>
                    ))
                  )}
                  <InfiniteScroll
                    dataLength={postList?.length} //This is important field to render the next data
                    next={loadnextPage}
                    hasMore={isHasMore}
                    loader={<h6>ডাটা লোড হচ্ছে ...</h6>}

                  >
                  </InfiniteScroll>

                </div>
              </div> :

              <div className="pt-10">  এই মুহূর্তে কোনো লেখা নেই </div>


            }
            {/* {totalPages > -1 && <div className="pagination__btn py-10 space-x-4"> 
              <button
                className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                প্রথম পৃষ্ঠা
              </button>
              <button
                className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                পূর্ববর্তী পৃষ্ঠা
              </button>
              <span
                className="text-sm text-gray-700"
              >পৃষ্ঠা {currentPage} এর {totalPages}</span>
              <button
                className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                পরবর্তী পৃষ্ঠা
              </button>
              <button
                className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                শেষ পৃষ্ঠা
              </button>
            </div>
            } */}
          </div>
        </>
      )}
    </div>
  );

}

