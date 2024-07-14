"use client"

import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import MainContentDivider from "../common/mainContentDivider";
import Loading from "../common/loading";
import { apiBasePath } from "../../utils/constant";
import { countWords } from "../../function/api";
import SinglePostConponent from "../common/singlePostComponent";


export default function SobJiboniLeftContent() {

  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State to store any errors
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isHasMore, setisHasMore] = useState(false);


  useEffect(() => {

    const fetchTotalPage = async () => {

      try {

        const response = await fetch(`${apiBasePath}/categorypostpages/জীবনী`);
        const data = await response.json();
       
        setTotalPages(data?.length);

        if (data?.length > 1) {
          setisHasMore(true)
        }

      } catch (error) {
        setError(error);
      } finally {
        // setIsLoading(false)
      }

    };

    fetchTotalPage();

  }, []);


  const fetchPosts = async () => {

    try {

      const response = await fetch(`${apiBasePath}/categoryposts/জীবনী/${currentPage}`);
      const data = await response.json();
      console.log("JIBONI:::::::", data)
      setPostList(postList.concat(data));

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
            <div className='flex'>
              {postList.length > 0 ?
                <div className="lakha__main__content pt-20  text-3xl lg:mr-[100px] md:mr-[50px]">
                  {postList.length && (
                    postList?.map((post, index) => (
                      <>
                        <div key={index}>
                          <SinglePostConponent
                            id={post._id}
                            title={post.title}
                            writer={post.writer}
                            writer_id={post.writer_id}
                            image={post?.image}
                            uploadedBy={post?.uploader_name}
                            updatedAt={post?.updatedAt}
                            writer_image={post?.profile_image}
                            profileName={post?.profile_name}
                            content={countWords(post.content, 70)}
                          />
                        </div>
                        {index < postList.length - 1 && <MainContentDivider />}
                      </>
                    ))
                  )}
                </div> :
                <div className="pt-10">  এই মুহূর্তে কোনো লেখা নেই </div>
              }
            </div>
        </>
      )}


      <InfiniteScroll
        dataLength={postList?.length} //This is important field to render the next data
        next={loadnextPage}
        hasMore={isHasMore}
        loader={<h6>ডাটা লোড হচ্ছে ...</h6>}
        scrollThreshold={0.5}


      >
      </InfiniteScroll>


    </div>
  );



}

