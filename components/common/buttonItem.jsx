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

  function handleButton(title) {
    setSelectedId(id)
    setCurrentPage(1)
    setSelectedCategory(title)


      fetch(`${apiBasePath}/categorypostpages/${title}`)
        .then(response => response.json())
        .then(data => {
          setTotalPages(data?.length);
          if (data.length > 1) {
            setisHasMore(true)
          }else{
            setisHasMore(false)
          }

        })
        .catch(error => console.error("Error fetching data:", error));

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
