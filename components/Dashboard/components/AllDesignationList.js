'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiBasePath } from "../../../utils/constant";
import CreateDesignationModal from "../../admin/createDesignationModal";
import NotFound from "../../common/nofFound";
import ContentList from "./ContentList";

const AllDesignation = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("");

    const [sliderList, setSliderList] = useState([])


    const [isOpen, setIsOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isCategoryAdded, setIsCategoryAdded] = useState(false)

    const [showModal, setShowModal] = useState(false);





    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/designation`)
            .then(response => response.json())
            .then(data => {
                setSliderList(data);
                console.log('-----------', data)
                console.log('-----------', sliderList)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/designation/${id}`);
            console.log('Delete successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deleteCategory(id) {



        try {
            await deleteData(id);
            // If successful, update state or do something else
            alert('Delete Sucessfully')
        } catch (error) {
            // Handle error
            alert('Failed to Delete')

        }
        // router.reload()

    }

    if (userType === 'admin') {

        return (
            <div className="pt-[115px]  text-black mx-10">
                <div>
                    <button
                        className="bg-[#FCA000] hover:bg-[#eeb249] text-white py-2 px-[25px] rounded mt-[20px]"
                        onClick={handleShow}
                    >
                        নতুন লেখার ধরণ করুন
                    </button>
                    <CreateDesignationModal showModal={showModal} handleClose={handleClose} setIsCategoryAdded={setIsCategoryAdded} />
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2">
                        <div className="text-5xl pb-4">Designation List</div>
                        <ContentList content={sliderList} isSlider={true} />

                    </div>
                    <div className="w-1/2">
                        <div className="text-5xl pb-4 ">Designation</div>
                        <ul>
                            {sliderList.length &&
                                sliderList.map((post, index) => (

                                    <li key={index}>
                                        {/* {setToggleStatus(post.status)} */}
                                        <button
                                            id={index}
                                            className={`text-green-500`}

                                            onClick={() => { deleteCategory(post._id) }}
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

export default AllDesignation;