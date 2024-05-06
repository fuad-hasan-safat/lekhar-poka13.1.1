"use client";
import { useEffect, useState } from "react";
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

  const [buttons, setButtons] = useState([
    {
      _id: "",
      title: " ",
      __v: 0,
    },
  ]);




  useEffect(() => {


    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiBasePath}/posts`);
        const data = await response.json();
        setPostList(data);

        // Calculate total pages based on posts and postsPerPage
        setTotalPages(Math.ceil(data.length / postsPerPage));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchPosts();



  }, []);

  useEffect(() => {
    console.log('window inner height', window.innerHeight)
    console.log('document scroll ', document.documentElement.scrollTop)
    console.log('document scroll offset ', document.documentElement.offsetHeight)


    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 700
      )
        return;
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages]);


  

  if (isLoading) {
    <Loading />
  } else {

    return (
      <div>
        <ProcchodButtonList buttons={buttons} setButtons={setButtons} selectedId={selectedId} setSelectedId={setSelectedId} setPostList={setPostList} postList={postList} setTotalPages={setTotalPages} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />
        <div className="text-3xl">

          {error ? (
            <div></div>
          ) : (
            <>
              {postList.length > 0 ?
                (<div className="lakha__main__content pt-20 text-3xl">
                  {postList?.slice(0, currentPage * postsPerPage).map((post, index) => (
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
                      {index < postList.length  && <MainContentDivider />}
                    </>
                  ))}
                </div>) : (

                  <div className="pt-10">  এই মুহূর্তে কোনো লেখা নেই </div>

                )

              }
           
            </>
          )}

        </div>
      </div>
    );
  }
}
