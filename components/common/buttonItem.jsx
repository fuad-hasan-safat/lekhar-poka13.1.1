// "use client";
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
}) => {


  function handleButton(title) {
    setSelectedId(id)
    setCurrentPage(1)

    console.log('buton ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', title);

    if (title === 'সব') {
      fetch(`${apiBasePath}/posts`)
        .then(response => response.json())
        .then(data => {
          setPostList(data)
          setTotalPages(Math.ceil(data.length / 5))
          console.log('data --->>>>>>>>>>>>>>>>>>>>>>>>>', data);

        })
        .catch(error => console.error("Error fetching data:", error));


    }
    else {

      fetch(`${apiBasePath}/posts/${title}`)
        .then(response => response.json())
        .then(data => {
          setPostList(data.object)
          setTotalPages(Math.ceil(data.object.length / 5))
          console.log('data --->>>>>>>>>>>>>>>>>>>>>>>>>', data);

        })
        .catch(error => console.error("Error fetching data:", error));

    }



  }

  return (
    <>
      <div
        className={`procchod__button py-1 rounded-md border border-gray-300  ${selectedId === id ? " bg-yellow-400 shadow-md" : "bg-gray-300"
          }`}
      >
        <button
          onClick={() => handleButton(title)}
          className={`w-[120px] h-[12px] text-gray-600 font-semibold`}
        >
          {title}
        </button>
      </div>
    </>
  );
};

export default ButtonItem;
