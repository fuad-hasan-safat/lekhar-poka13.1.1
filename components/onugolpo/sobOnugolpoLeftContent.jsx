"use client"
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import MainContentDivider from "../common/mainContentDivider";
import axios from "axios";
import Loading from "../common/loading";
import SobOnugolpoBody from "./sobOnugolpoBody";
import { apiBasePath } from "../../utils/constant";
import { countWords } from "../../function/api";

export default function SobOnugolpoLeftContent() {

  //   const [selectedId, setSelectedId] = useState("sob");
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5; // Number of posts to display per page
  const [isHasMore, setisHasMore] = useState(false);


  useEffect(() => {


    const fetchTotalPage = async () => {
      try {
        const response = await fetch(`${apiBasePath}/categorypostpages/অনুগল্প`);
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
      const response = await fetch(`${apiBasePath}/categoryposts/অনুগল্প/${currentPage}`);
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
  }, []);


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
        <div>Error fetching posts: </div>
      ) : (
        <>

          <div className='container'>
            {postList.length > 0 ?
              <div className='flex'>
                <div className="lakha__main__content pt-20  text-3xl lg:mr-[100px] md:mr-[50px]">
                  {postList.length && (
                    postList?.map((post, index) => (
                      <>
                        <div key={index}>
                          <SobOnugolpoBody
                            id={post._id} // Assuming '_id' is the unique identifier
                            title={post.title}
                            writer={post.writer}
                            content={countWords(post.content, 70)}

                          // content={post.content.split(/\s+/).slice(0, 200).join(" ")}
                          />
                        </div>
                        {index < postList.length - 1 && <MainContentDivider />}
                      </>
                    ))
                  )}

                </div>
              </div> :
              <div className="pt-10">  এই মুহূর্তে কোনো লেখা নেই </div>
            }
            <InfiniteScroll
              dataLength={postList?.length} //This is important field to render the next data
              next={loadnextPage}
              hasMore={isHasMore}
              loader={<h6>ডাটা লোড হচ্ছে ...</h6>}
              scrollThreshold= {0.5}


            >
            </InfiniteScroll>
          </div>

        {/* </div> */}
    </>
  )
}
    </div >
  );


}
