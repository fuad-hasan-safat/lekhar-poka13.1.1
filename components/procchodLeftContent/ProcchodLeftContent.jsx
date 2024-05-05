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


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const firstPage = () => {
    handlePageChange(1);
  };

  const lastPage = () => {
    handlePageChange(totalPages);
  };

  const nextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const prevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, postList.length); // Ensure endIndex doesn't exceed posts length

  const displayedPosts = postList.slice(startIndex, endIndex); // Slice the posts for the current page

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
                  {displayedPosts.map((post, index) => (
                    <>
                      <div key={index}>
                        <MaincontentBody
                          id={post._id}
                          buttons={buttons}
                          title={post.title}
                          writer={post.writer}
                          category={post.category}
                          content={post.category === 'কবিতা' ? countWords(post.content, 30) : countWords(post.content, 70)}

                        // content={post.category === 'কবিতা' ? post.content.match(/(\S+\s*){1,100}/)?.[0] : post.content.match(/(\S+\s*){1,200}/)?.[0]}
                        // content={post.summary}
                        // content={post.category === 'কবিতা' ? `${post.content.split().slice(0, 10)}` : `${post.content.split().slice(0, 30)}`} // Truncate content
                        />
                      </div>
                      {index < displayedPosts.length - 1 && <MainContentDivider />}
                    </>
                  ))}
                </div>) : (

                  <div className="pt-10">  এই মুহূর্তে কোনো লেখা নেই </div>

                )

              }
              {totalPages > 1 && <div className="post__pagination py-10 space-x-4"> {/* Add a class for styling */}
                <button
                  className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"
                  onClick={firstPage} disabled={currentPage === 1}>
                  প্রথম পৃষ্ঠা
                </button>
                <button
                  className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"
                  onClick={prevPage} disabled={currentPage === 1}>
                  পূর্ববর্তী পৃষ্ঠা
                </button>
                <span
                  className="text-sm text-gray-800"
                >পৃষ্ঠা {currentPage} এর {totalPages}</span>
                <button
                  className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"
                  onClick={nextPage} disabled={currentPage === totalPages}>
                  পরবর্তী পৃষ্ঠা
                </button>
                <button
                  className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"
                  onClick={lastPage} disabled={currentPage === totalPages}>
                  শেষ পৃষ্ঠা
                </button>
              </div>
              }
            </>
          )}

        </div>
      </div>
    );
  }
}
