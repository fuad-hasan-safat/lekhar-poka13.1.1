'use client'
import React, { useEffect, useState } from "react";

import { fetchData } from "../../../function/api";
// import LekhaPokaProfile from "@/components/common/lekhaProfile";
import LekhaPokaProfile from '../../common/lekhaProfile'
import SidebarPostDivider from "../../common/sidebarpostdivider";
import { apiBasePath } from "../../../utils/constant";

const Jonopriyo = () => {

  const [jonopriyoData, setJanapriyoData] = useState([])

  useEffect(() => {
    console.log("in side use effect");

    async function fetchDataAsync() {
      try {
        const result = await fetchData(
          `${apiBasePath}/popularpost`
        );
        // console.log("result         ->>>>>>>>>>>>>>>>", result.object);
        setJanapriyoData(result.posts);
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
          <h1 className="text-[20px] text-yellow-500 font-semibold">জনপ্রিয়</h1>
        </div>
        {jonopriyoData.length > 0 ?
          <div className="pt-[23px]">
            {jonopriyoData.length &&
              jonopriyoData.map((item, index) => (
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
                    {index <= jonopriyoData.length - 2 ? (
                      <SidebarPostDivider />
                    ) : (
                      ""
                    )}
                  </div>
                </>


              ))}
          </div> :
          <div className="pt-10"> লেখা নেই </div>

        }
      </div>
    </>
  );
};

export default Jonopriyo;
