'use client'
import React, { useEffect, useState } from "react";


import LekhaPokaProfile from "../../common/lekhaProfile";
import SidebarPostDivider from "../../common/sidebarpostdivider";
import { fetchData } from "../../../function/api";
import { apiBasePath } from "../../../utils/constant";

const Somosamoyik = () => {

    
const [somosamoyikPost, setSomosamoyikPost] = useState([])

useEffect(() => {
  console.log("in side use effect");

  async function fetchDataAsync() {
    try {
      const result = await fetchData(
        `${apiBasePath}/contemporarypost`
      );
      console.log("result         ->>>>>>>>>>>>>>>>", result.object);
      setSomosamoyikPost(result.posts);
    } catch (error) {
      //alert(error)
      console.log(error)
    }
  }

  fetchDataAsync();
}, []);



  return (
    <>
      <div>
        <div>
          <div className="text-[20px] text-yellow-500 font-semibold">
            সমসাময়িক
          </div>
        </div>
        <div className="pt-[23px]">
          {somosamoyikPost.length &&
            somosamoyikPost.map((item, index) => (
              <>
                <div className="pb-1">
                  <LekhaPokaProfile
                   key={index}
                   image={'/images/defaultUserPic/profile.jpg'}
                   title={item.title}
                   writer={item.writer}
                   id={item._id}
                   star={item.rating}
                  />
                </div>
                <div className="pb-3">
                  {index <= somosamoyikPost.length - 2 ? (
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

export default Somosamoyik;
