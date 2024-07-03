'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import ContentList from "./ContentList";

const Allcategory = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("");

    const [categoryList, setCategoryList] = useState([])


    const [isOpen, setIsOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);



    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategoryList(data);
                console.log('-----------', data)
                console.log('-----------', categoryList)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, []);


    function deletSelectedPost(id) {
        setCategoryList(prevCategoryList => prevCategoryList.filter(category => category._id !== id));

    }

    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/categories/${id}`);
            console.log('Delete successful:', response.data);
            deletSelectedPost(id);
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


    }

    if (userType === 'admin') {

        return (
            <div className="pt-[115px]  text-black mx-10 z-[99999999]">
                <div className="flex flex-row">
                    <div className="w-1/2">
                        <div className="text-7xl pb-4">Category List</div>
                        <ContentList content={categoryList} isSlider={true} />

                    </div>
                    <div className="w-1/2">
                        <div className="text-7xl pb-4 ">Delete Category</div>
                        <ul>
                            {categoryList.length &&
                                categoryList.map((post, index) => (

                                    <li key={index}>
                                        {/* {setToggleStatus(post.status)} */}
                                        <button
                                            id={index}
                                            className={`text-green-500`}

                                            onClick={() => { deleteCategory(post._id) }}
                                        >
                                            Delete Category
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

export default Allcategory