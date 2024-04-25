'use client'

import { apiBasePath } from '../../utils/constant'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'


export default function RatingComponent({ post_id, setRating, rating }) {

  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [userToken, setUserToken] = useState("");


  // check if user is logged in
  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
  }, []);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  async function submitRating(id) {


    if(userUuid.length>0){
      const data = {
        rating: rating,
      }
      const response = await fetch(`${apiBasePath}/rating/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating data: ${response.statusText}`);
      } else {
        alert('Rating Sucessfully update');
      }

    }else{
      alert('Looged In first')
    }
    
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index, rating)



  return (
    <div className='start__rating place-content-center justify-center  pt-[20px] pb-[20px] mx-[40px] rounded-xl float-left text-center border-2 text-black border-gray-400'>
     <p>রেটিং দিন ।</p> 

     <div>

     <Rating
        style={{ float: 'left', textAlign: 'center' }}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
      /* Available Props */
      />

     </div>

      <button
        onClick={() => submitRating(post_id)}
        className='bg-orange-400 px-2 py-1 text-white h-[34px] w-[195px] rounded-md'
      >Submit </button>
    </div>
  )
}