'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentList from './ContentList';
import { apiBasePath } from "../../utils/constant";
import NotFound from "../../components/common/nofFound"
import axios from "axios";
import AdminLayOut from "./admin";

const WriterList = () => {
    const router = useRouter();
    const [userType, setUserType] = useState("");

    const [writerList, setWriterList] = useState([])





    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/writers`)
            .then(response => response.json())
            .then(data => {
                setWriterList(data);
                console.log('-----------', data)
                console.log('-----------', sliderList)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, []);


    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/writers/${id}`);
            console.log('Delete successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deleteWriter(id) {



        try {
            await deleteData(id);
            // If successful, update state or do something else
            alert('Delete Sucessfully')
        } catch (error) {
            // Handle error
            alert('Failed to Delete')

        }





        router.push(`/admin/writerlist`);

    }

    if (userType === 'admin') {
        return (
            <AdminLayOut>
                <div className="pt-[115px]  text-black mx-10">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <div className="text-7xl pb-4">Writer List</div>
                            <ul>
                                {writerList.length &&
                                    writerList.map((writer, index) => (

                                        <li key={index}>
                                            <p className="mb-4">{writer.name}</p>
                                            <hr />

                                        </li>
                                    ))}
                            </ul>

                        </div>
                        <div className="w-1/2">
                            <div className="text-7xl pb-4 ">Delete Writer</div>
                            <ul>
                                {writerList.length &&
                                    writerList.map((writer, index) => (

                                        <li key={index}>
                                            {/* {setToggleStatus(post.status)} */}
                                            <button
                                                id={index}
                                                className={`text-red-500 hover:text-red-950 mb-4`}

                                                onClick={() => { deleteWriter(writer._id) }}
                                            >
                                                Delete Writer
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

export default WriterList
