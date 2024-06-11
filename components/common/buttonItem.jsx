"use client";

import { apiBasePath } from "../../utils/constant";

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
          className={`page__common__yello__btn w-full py-1 rounded-md  text-[#ffffff] ${selectedId === id ? " bg-[#FCD200] text-[#515151] shadow-md" : "bg-[#f9a106]"
            }`}
        >
          {title}
        </button>
        
      </div>
    </>
  );
};

export default ButtonItem;
