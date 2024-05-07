"use client";
import react, { useEffect } from "react";
import { apiBasePath } from "../../utils/constant";
// import { useEffect, useState } from "react";

const ButtonItem = ({
  id,
  selectedId,
  height,
  weidth,
  title,
  setSelectedId,
  setPostList,
  postList,
  postsPerPage,
  setTotalPages,
  setCurrentPage,
  buttons,
  setisHasMore,
  totalPages,
  currentPage,
  setIsLoading,
  setSelectedCategory,
}) => {




  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(`${apiBasePath}/posts/${currentPage}`);
  //       const data = await response.json();
  //       setPostList(data);

  //       console.log('main post by per page-------->>', data)
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   };

  //   fetchPosts();



  // }, [totalPages]);


  function handleButton(title) {
    setSelectedId(id)
    setCurrentPage(1)
    setSelectedCategory(title)

    console.log('buton ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', title);

    // if (title === 'সব') {
    //   fetch(`${apiBasePath}/posts`)
    //     .then(response => response.json())
    //     .then(data => {
    //       // setPostList(data)
    //       // setTotalPages(Math.ceil(data.length / 5))
    //       // console.log('data --->>>>>>>>>>>>>>>>>>>>>>>>>', data);

    //     })
    //     .catch(error => console.error("Error fetching data:", error));


    // }
    // else {

      console.log(`${apiBasePath}/categorypostpages/${title}`)
      fetch(`${apiBasePath}/categorypostpages/${title}`)
        .then(response => response.json())
        .then(data => {
          setTotalPages(data?.length);
          if (data.length > 1) {
            setisHasMore(true)
          }else{
            setisHasMore(false)
          }
          console.log('category data --->>>>>>>>>>>>>>>>>>>>>>>>>', data);

        })
        .catch(error => console.error("Error fetching data:", error));

    // }






  }

  return (
    <>
      <div
        className={`procchod__button`}
      >
        <button
          onClick={() => handleButton(title)}
          className={`w-full py-1 rounded-md border border-gray-300  text-gray-600 font-semibold ${selectedId === id ? " bg-yellow-400 shadow-md" : "bg-gray-300"
            }`}
        >
          {title}
        </button>
      </div>
    </>
  );
};

export default ButtonItem;
