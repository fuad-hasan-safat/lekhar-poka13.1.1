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


    function deletePost(id) {






        // fetch(`${apiBasePath}/posts/${id}`, {
        //   method: 'PUT', // Specify PUT method for update
        //   headers: {
        //     'Content-Type': 'application/json' // Set content type as JSON
        //   },
        //   body: jsonData
        // })
        //   .then(response => response.json()) // Parse the response as JSON
        //   .then(updatedData => {
        //     console.log('Data updated successfully:', updatedData);

        //   })
        //   .catch(error => {
        //     console.error('Error updating data:', error);
        //   });

        router.push(`/admin/postsdelete`);

    }

    if (userType === 'admin') {
        return (
            <div className="pt-[115px]  text-black mx-10">
                <div className="flex flex-row">
                    <div className="w-1/2">
                        <div className="text-7xl pb-4">Post List</div>
                        <ContentList content={postList} onOpenModal={handleOpenModal} setIsTitleClick={setIsTitleClick}/>
                       {istitleClick && <StyledModal isOpen={isOpen} selectedContent={selectedContent} onClose={handleCloseModal} />}


                    </div>
                    <div className="w-1/2">
                        <div className="text-7xl pb-4 ">Delete Post</div>
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