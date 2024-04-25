'use client'
import React, { useEffect, useState } from "react";

import LekhaPokaProfile from "../../common/lekhaProfile";
import SidebarPostDivider from "../../common/sidebarpostdivider";
import { fetchData } from "../../../function/api";
import { apiBasePath } from "../../../utils/constant";

const Samprotik = () => {



  
const [samprotikPost, setSamprotikPost] = useState([])

useEffect(() => {
  console.log("in side use effect");

  async function fetchDataAsync() {
    try {
      const result = await fetchData(
        `${apiBasePath}/recentpost`
      );
      //console.log("result         ->>>>>>>>>>>>>>>>", result.object);
      setSamprotikPost(result.posts);
    } catch (error) {
      // alert(error)
      console.log(error);
    }
  }

  fetchDataAsync();
}, []);

  
  return (
    <>
      <div>
        <div>
          <h1 className="text-[20px] text-yellow-500 font-semibold">সাম্প্রতিক</h1>
        </div>
        <div className="pt-[23px]">
          {samprotikPost.length &&
            samprotikPost.map((item, index) => (
              <>
               <div className="pb-1">
                <LekhaPokaProfile
                   key={index}
                   image={'/images/writerimage/robi.jpg'}
                   title={item.title}
                   writer={item.writer}
                   id={item._id}
                   star={item.rating}
                />
              </div>
              <div className="pb-[14px]">
              {index <= samprotikPost.length - 2 ? (
                  <SidebarPostDivider />
              ) : (
                  ""
              )}
          </div>
              </>
             
            ))}
        </div>
      </div>
    </>
  );
};

export default Samprotik;
