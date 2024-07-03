'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import CreateWriterBioModal from "../../admin/createWriterBioModal";
import ContentList from "./ContentList";
import StyledModal from "./styleModal";

const AllWriterBio = () => {

    const router = useRouter();
    const [userType, setUserType] = useState("");
    const [bioList, setBioList] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [istitleClick, setIsTitleClick] = useState(false)
    const [selectedContent, setSelectedContent] = useState(null);
    const [isCategoryAdded, setIsCategoryAdded] = useState(false)
    const [showModal, setShowModal] = useState(false);





    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/listwriterbio`)
            .then(response => response.json())
            .then(data => {
                setBioList(data);
                console.log('-----------', data)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, [bioList]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleOpenModal = (item) => {
        setSelectedContent(item);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsTitleClick(false)
        setSelectedContent(null);
    };

    function deletSelectedBio(id) {
        setBioList(prevBio => prevBio.filter(bio => bio._id !== id));

    }

    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/deletewriterbio/${id}`);
            deletSelectedBio(id);
            console.log('Delete successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deleteBio(id) {
        try {
            await deleteData(id);
            // If successful, update state or do something else
            alert('Delete Sucessfully')
        } catch (error) {
            // Handle error
            alert('Failed to Delete')

        }
    }

    if (userType === 'admin') {

        return (
            <div className="pt-[115px]  text-black mx-10">
                <div>
                    <button
                        className="bg-[#FCA000] hover:bg-[#eeb249] text-white py-2 px-[25px] rounded mt-[20px]"
                        onClick={handleShow}
                    >
                        Bio Add
                    </button>
                    <CreateWriterBioModal setBioList={setBioList} showModal={showModal} handleClose={handleClose} setIsCategoryAdded={setIsCategoryAdded} />
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2">
                        <div className="text-5xl pb-4">Bio List</div>
                        {/* <ContentList content={bioList} isSlider={true} /> */}
                        <ContentList content={bioList} onOpenModal={handleOpenModal} setIsTitleClick={setIsTitleClick} />
                        {istitleClick && <StyledModal isOpen={isOpen} selectedContent={selectedContent} onClose={handleCloseModal} />}
                    </div>
                    <div className="w-1/2">
                        <div className="text-5xl pb-4 ">Bio</div>
                        <ul>
                            {bioList.length &&
                                bioList.map((post, index) => (

                                    <li key={index}>
                                        {/* {setToggleStatus(post.status)} */}
                                        <button
                                            id={index}
                                            className={`text-green-500`}

                                            onClick={() => { console.log(post); deleteBio(post._id) }}
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
        )
    } else {
        return <NotFound />
        // <div className="text-9xl text-black">
        //   <p>not available</p>

        // </div>
    }
}

export default AllWriterBio