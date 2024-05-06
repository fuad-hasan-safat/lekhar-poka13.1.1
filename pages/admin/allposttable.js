'use client'

import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import ContentList from './ContentList';
// import StyledModal from './Modal';
import { apiBasePath } from "../../utils/constant";
import NotFound from "../../components/common/nofFound"
import axios from "axios";
import StyledModal from "./styleModal";
import AdminLayOut from "./admin";

const PostTable = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  const [postList, setPostList] = useState([])


  const [isOpen, setIsOpen] = useState(false);
  const [istitleClick, setIsTitleClick] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedContent(item);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsTitleClick(false)
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

    // router.push(`/admin/allposttable`);
    router.refresh()

  }


  async function deleteData(id) {
    try {
        const response = await axios.delete(`${apiBasePath}/posts/${id}`);
        console.log('Delete successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}


  
  async function deletePost(id) {
    try {
        await deleteData(id);
        // If successful, update state or do something else
        alert('Delete Sucessfully')
    } catch (error) {
        // Handle error
        alert('Failed to Delete')

    }
    router.refresh()
}

  if (userType === 'admin') {
    return (
      <AdminLayOut>
      <div className="pt-[115px]  text-black mx-10">
        <div className="flex flex-row">
          <div className="w-1/3">
            <div className="text-3xl pb-4">Post List</div>
            <ContentList content={postList} onOpenModal={handleOpenModal} setIsTitleClick={setIsTitleClick}/>
            {istitleClick && <StyledModal isOpen={isOpen} selectedContent={selectedContent} onClose={handleCloseModal} />}


          </div>
          <div className="w-1/3">
            <div className="text-3xl pb-4 ">Toggle Ststud</div>
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
                      }}
                    >
                      {post.status ? 'Revoke Status' : 'Give Status'}
                    </button>
                    <hr />


                  </li>
                ))}
            </ul>
          </div>
          <div className="w-1/3">
          <div className="text-3xl pb-4 ">Delete Post</div>
                        <ul>
                            {postList.length &&
                                postList.map((post, index) => (
                                    <li key={index}>
                                        <button
                                            id={index}
                                            className="text-red-600"
                                            onClick={() => { deletePost(post._id) }}
                                        >
                                            Delete
                                        </button>
                                        <hr />

                                    </li>
                                ))}
                        </ul>

          </div>
        </div>
      </div >
      </AdminLayOut>
    )
  } else {
   return <NotFound />
    // <div className="text-9xl text-black">
    //   <p>not available</p>

    // </div>
  }
}

export default PostTable