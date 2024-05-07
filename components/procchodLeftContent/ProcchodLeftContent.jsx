"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import MaincontentBody from "../common/maincontentBody";
import MainContentDivider from "../common/mainContentDivider";
import ProcchodButtonList from "./ProcchodButtonList";
import { apiBasePath } from "../../utils/constant";

import { countWords } from "../../function/api";
import Loading from "../common/loading";

export default function ProcchodLeftContent() {

  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("sob");
  const [postList, setPostList] = useState([])
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5; // Number of posts to display per page
  const [isHasMore, setisHasMore] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('')

  const [buttons, setButtons] = useState([
    {
      _id: "",
      title: " ",
      __v: 0,
    },
  ]);


  useEffect(() => {
    const fetchTotalPage = async () => {
      try {
        const response = await fetch(`${apiBasePath}/postpages`);
        const data = await response.json();
        setTotalPages(data?.length);
        if(data?.length> 1){
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



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiBasePath}/posts/${currentPage}`);
        const data = await response.json();
        setPostList(data);

        console.log('main post by per page-------->>', data)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchPosts();



  }, [totalPages]);


  const fetchPosts = async () => {
    try {
      const response = await fetch(`${apiBasePath}/posts/${currentPage}`);
      const data = await response.json();
      setPostList(postList.concat(data));

      console.log('main post by per page inside loader-------->>', data)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false)
    }
  };


  
  const fetcCategoryhPosts = async () => {
    try {
      const response = await fetch(`${apiBasePath}/categorypostpages/${selectedCategory}/${currentPage}`);
      const data = await response.json();
      setPostList(postList.concat(data));

      console.log('main post by per page inside loader-------->>', data)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false)
    }
  };


  const loadnextPage = () => {

    console.log({ currentPage, totalPages })

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)

   
      if(selectedCategory===''){
      fetchPosts();
      }else{
        fetcCategoryhPosts();
      }

    }else{
      setisHasMore(false)
    }
  }


  if (isLoading) {
    <Loading />
  } else {

    return (
      <div>
        <ProcchodButtonList buttons={buttons} setButtons={setButtons} selectedId={selectedId} setSelectedId={setSelectedId} setPostList={setPostList} postList={postList} setTotalPages={setTotalPages} totalPages={totalPages} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} setisHasMore={setisHasMore} setIsLoading={setIsLoading} setSelectedCategory={setSelectedCategory}/>
        <div className="text-3xl">

          {error ? (
            <div></div>
          ) : (
            <>
              {postList?.length > 0 ?
                (<div className="lakha__main__content pt-20 text-3xl">
                  {postList?.map((post, index) => (
                    <>
                      <div key={index}>
                        <MaincontentBody
                          id={post._id}
                          buttons={buttons}
                          title={post.title}
                          writer={post.writer}
                          category={post.category}
                          content={post.category === 'কবিতা' ? countWords(post.content, 30) : countWords(post.content, 70)}
                        />
                      </div>
                      {index < postList?.length && <MainContentDivider />}
                    </>
                  ))}
                </div>) : (

                  <div className="pt-10">  এই মুহূর্তে কোনো লেখা নেই </div>

                )

              }

              <InfiniteScroll
                dataLength={postList?.length} //This is important field to render the next data
                next={loadnextPage}
                hasMore={isHasMore}
                loader={<h6>ডাটা লোড হচ্ছে ...</h6>}
              // endMessage={
              //   <p style={{ textAlign: 'center' }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
              // // below props only if you need pull down functionality
              // refreshFunction={this.refresh}
              // pullDownToRefresh
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
              // }
              // releaseToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              // }
              >
                {/* {items} */}
              </InfiniteScroll>

            </>
          )}

        </div>
      </div>
    );
  }
}
