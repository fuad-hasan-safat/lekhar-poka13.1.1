'use client'

import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import ContentList from './ContentList';
import StyledModal from './Modal';
import { apiBasePath } from "../../utils/constant";
import NotFound from "../../components/common/nofFound"

const DeletePosts = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  const [postList, setPostList] = useState([])


  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedContent(item);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedContent(null);
  };

  useEffect(() => {
    setUserType(localStorage.getItem("usertype") || "");
  }, []);


  useEffect(() => {
    fetch(`${apiBasePath}/postlist`)
      .then(response => response.json())
      .then(data => {
        setPostList(data);
        console.log('-----------', data)
        console.log('-----------', postList)
      })
      .catch(error => console.error("Error fetching data:", error));

  }, []);


  function revokeStatus(id, status) {
    console.log('status before -----------------', status)

    const data = {
      status: !status
    };


    const jsonData = JSON.stringify(data);

    console.log('status after -----------------', data)


    fetch(`${apiBasePath}/posts/${id}`, {
      method: 'PUT', // Specify PUT method for update
      headers: {
        'Content-Type': 'application/json' // Set content type as JSON
      },
      body: jsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(updatedData => {
        console.log('Data updated successfully:', updatedData);

      })
      .catch(error => {
        console.error('Error updating data:', error);
      });

    router.push(`/admin/allposttable`);

  }

  if (userType === 'admin') {
    return (
      <div className="pt-[115px]  text-black mx-10">
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="text-7xl pb-4">Post List</div>
            <ContentList content={postList} onOpenModal={handleOpenModal} />
            <StyledModal isOpen={isOpen} selectedContent={selectedContent} onClose={handleCloseModal} />


          </div>
          <div className="w-1/2">
            <div className="text-7xl pb-4 ">Toggle Ststud</div>
            <ul>
              {postList.length &&
                postList.map((post, index) => (

                  <li key={index}>
                    {/* {setToggleStatus(post.status)} */}
                    <button
                      id={index}
                      className={`${post.status ? 'text-green-500' : 'text-red-500'}`}

                      onClick={() => {
                        revokeStatus(post._id, post.status);
                        router.refresh();
                      }}
                    >
                      {post.status ? 'Revoke Status' : 'Give Status'}
                    </button>

                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div >
    )
  } else {
   return <NotFound />
    // <div className="text-9xl text-black">
    //   <p>not available</p>

    // </div>
  }
}

export default DeletePosts