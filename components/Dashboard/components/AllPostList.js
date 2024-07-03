'use client'

import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import ContentList from "./ContentList";
import StyledModal from './styleModal';

const AllPostList = () => {

  const router = useRouter();

  const [userType, setUserType] = useState("");
  const [isLoaded, setIsloaded] = useState(false);
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
      .then(datas => {
        // setPostList(data);

        const filteredPost = datas.map(data => ({
          title: data.title,
          writer: data.writer,
          content: data.content,
          _id: data._id,
          status: data.status,
          category: data.category,
        }));

        setPostList(filteredPost)
     

        setIsloaded(true)
      })
      .catch(error => console.error("Error fetching data:", error));

  }, []);


  function recoveStatusOfSelectedPost(id){
    setPostList(prevPostList => 
      prevPostList.map(post => 
        post._id === id ? { ...post, status: !post.status } : post
      )
    );

  }

  function revokeStatus(id, status) {
    console.log('status before -----------------', status)

    const data = {
      status: !status
    };


    const jsonData = JSON.stringify(data);

    console.log('status after -----------------', jsonData)


    fetch(`${apiBasePath}/toggleposts/${id}`, {
      method: 'PUT', // Specify PUT method for update
      headers: {
        'Content-Type': 'application/json' // Set content type as JSON
      },
      body: jsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(updatedData => {

        recoveStatusOfSelectedPost(id);
        console.log('Data updated successfully:', updatedData);

      })
      .catch(error => {
        console.error('Error updating data:', error);
      });


  }

function deletSelectedPost(id){
  setPostList(prevPostList => prevPostList.filter(post => post._id !== id));

}
  async function deleteData(id) {
    try {
      const response = await axios.delete(`${apiBasePath}/posts/${id}`);
      console.log('Delete successful:', response.data);
      deletSelectedPost(id);
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
    // router.refresh()
  }

  if (!isLoaded) return null;

  if (userType === 'admin') {
    return (
      <div className="all__page__content__block">
         <div className="all__post__list__wrap">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Check</th>
                  <th scope="col">Post Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {postList.length &&
                postList.map((post, index) => (
                  <tr>
                    <td>Check</td>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.writer}</td>
                    <td><i class="ri-delete-bin-6-line"></i></td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div >
    )
  } else {
    return <NotFound />
  }
}

export default AllPostList;