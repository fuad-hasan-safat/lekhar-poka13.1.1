"use client";
import { useEffect, useState } from "react";
import ButtonItem from "../common/buttonItem";
import { apiBasePath } from "../../utils/constant";
import { fetchData } from "../../function/api";

const ProcchodButtonList = ({
  selectedId,
  setSelectedId,
  setPostList,
  postList,
  setTotalPages,
  postsPerPage,
  setCurrentPage,
  buttons,
  setButtons,
}) => {


   useEffect(() => {
 

    async function fetchDataAsync() {
      try {
        const result = await fetchData(`${apiBasePath}/categories`);
        //console.log("result         ->>>>>>>>>>>>>>>>", result.object);
        setButtons(result);
      } catch (error) {
        alert(error)
      }
    }

    fetchDataAsync();
  }, []);

  return (
    <div className="all__button__list pt-16 clearfix">
    
      {buttons.length &&
        buttons.map((button, index) => (
          <ButtonItem
            key={button._id}
            id={button._id}
            title={button.title}
            height={50}
            weidth={100}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setPostList={setPostList}
            postList={postList}
            setTotalPages={setTotalPages}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            buttons={buttons}
          />
        ))}
        </div>
  );
};

export default ProcchodButtonList;
