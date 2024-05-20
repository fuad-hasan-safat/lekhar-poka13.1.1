"use client";
import React, { useState, useEffect } from "react";
import LekhokDetails from "../../common/lekhok";
import SidebarPostDivider from '../../common/sidebarpostdivider'
import { apiBasePath } from "../../../utils/constant";
import { useRouter } from "next/navigation";

const Lekhok = () => {
  const router = useRouter()

  const [lekhokList, setLekhokList] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [writersPerPage, setWritersPerPage] = useState(3); // Number of writers per page

  useEffect(() => {
    fetch(`${apiBasePath}/writers`)
      .then((response) => response.json())
      .then((data) => {
        setLekhokList(data);
        console.log(" user id-----------", data.user_id);
        // console.log("-----------", setLekhokList);
        // console.log('lekhok ----- data=================>>>>>', data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  function allWriterHandler() {
    router.push(`/allwriter`)
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(lekhokList.length / writersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisibleWriters = () => {
    const startIndex = (currentPage - 1) * writersPerPage;
    const endIndex = Math.min(startIndex + writersPerPage, lekhokList.length);
    return lekhokList.slice(startIndex, endIndex);
  };


  return (
    <>
      <div>
        <div>
          <h1 className="text-[20px] text-yellow-500 font-semibold">লেখক</h1>
        </div>
        {lekhokList.length > 0 ?
          <div className="pt-[23px] ">

            {getVisibleWriters().length > 0 &&
              getVisibleWriters().map((item, index) => (
                <div key={index}>
                  <div className="pb-3">
                    <LekhokDetails
                      image={`${apiBasePath}/${item.image.replace('/uploads/', '/')
                        }`}
                      writer={item.name}
                      id={item._id}
                      user_id={item.user_id}
                      lifeCycle={`  ${item.birth_date === null ? `বর্তমান` : `${item.birth_date} `} থেকে  ${item.expiry_date === null? '' : ` ${item.expiry_date}` } `}
                    />
                  </div>
                  <div className="pb-3">
                    {index < getVisibleWriters().length - 1 ? (
                      <SidebarPostDivider />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
          </div> :
          <div className="pt-10"> লেখক নেই </div>

        }
        <div>
          <div className="pb-[60px] pt-[30px] flex justify-center ">
            <div>
              <button
                onClick={allWriterHandler}
                className="sidebar__all__see bg-yellow-500 lg:w-[180px] md:w-[160px] sm:w-[150px] h-[43px] text-white rounded-md mr-3">
                সব দেখুন
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePreviousPage}
                className="pl-2 bg-white rounded-md border border-gray-300  w-[50px] h-[43px] ">

                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 16.2715L10 12.2715L14 8.27148"
                    stroke="#A3A3A3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextPage}
                className="pl-4 bg-white rounded-md border border-gray-300 w-[50px] h-[43px] ">

                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 8.24268L14 12.2427L10 16.2427"
                    stroke="#A3A3A3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lekhok;
