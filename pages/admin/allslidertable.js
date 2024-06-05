'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentList from './ContentList';
import { apiBasePath } from "../../utils/constant";
import NotFound from "../../components/common/nofFound"
import axios from "axios";
import AdminLayOut from "./admin";

const SliderTable = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("");

    const [sliderList, setSliderList] = useState([])


    const [isOpen, setIsOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);



    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/sliders`)
            .then(response => response.json())
            .then(data => {
                setSliderList(data);
                console.log('-----------', data)
                console.log('-----------', sliderList)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, []);


    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/sliders/${id}`);
            console.log('Delete successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deleteSlider(id) {



        try {
            await deleteData(id);
            // If successful, update state or do something else
            alert('Delete Sucessfully')
        } catch (error) {
            // Handle error
            alert('Failed to Delete')

        }





        router.push(`/admin/allslidertable`);

    }

    if (userType === 'admin') {
        return (
            <AdminLayOut>
                <div className="pt-[115px]  text-black mx-10">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <div className="text-7xl pb-4">Slider List</div>
                            <ContentList content={sliderList} isSlider={true} />

                        </div>
                        <div className="w-1/2">
                            <div className="text-7xl pb-4 ">Delete Slider</div>
                            <ul>
                                {sliderList.length &&
                                    sliderList.map((post, index) => (

                                        <li key={index}>
                                            {/* {setToggleStatus(post.status)} */}
                                            <button
                                                id={index}
                                                className={`text-green-500`}

                                                onClick={() => { deleteSlider(post._id) }}
                                            >
                                                Delete Slider
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

export default SliderTable