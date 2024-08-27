'use client'
import { useRouter } from 'next/router'
import { apiBasePath } from '../../utils/constant'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toastAction } from '../redux/toast-slice'


export default function RatingComponent({ post_id, setRating, rating, notification }) {

  const dispatch = useDispatch();
  const userUuid = useSelector((state) => state.usersession.userUuid);
  const isLoogedIn = useSelector((state) => state.usersession.isLoggedIn);

  const [isMounted, setIsMounted] = useState(false);
  const [userRating, setUserrating] = useState(0);

  useEffect(() => {

    async function getPostData() {
      try {
        const res = await axios.post(`${apiBasePath}/getpost/${post_id}`, {
          'logged_in': isLoogedIn,
          'user_id': userUuid,
        });
        setRating(res.data.object.rating)
        setUserrating(res.data.object.rating)
        console.log('Rating log', res.data.object);
      } catch (error) {
        console.log('Rating error ', error);
      }
    }

    if (userUuid) {
      getPostData();
    }
    setIsMounted(true)
  }, []);



  const handleRating = (rate) => {
    setRating(rate)
  }

  async function submitRating(id) {

    if (userRating > 0) {
      notification = 'আপনি ইতিমধ্যে রেটিং দিয়েছেন';
      dispatch(toastAction.setWarnedNotification(notification));
      return;
    }

    if (userUuid) {

      const data = {
        user_id: userUuid,
        rating: rating,
      }

      const response = await fetch(`${apiBasePath}/rating/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Rating sesponse ', response);

      if (!response.ok) {

        throw new Error(`Error updating data: ${response.statusText}`);

      } else {

        notification = 'রেটিং সফলভাবে সম্পন্ন হয়েছে';
        dispatch(toastAction.setSucessNotification(notification));

      }

    } else {

      notification = 'দয়া করে লগইন করুন';
      dispatch(toastAction.setWarnedNotification(notification));
    }

  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index, rating)

  if (!isMounted) return null;

  return (
    <div className=''>


      <div className='relative start__rating place-content-center justify-center  mt-[50px] pt-[50px] pb-[50px] mx-[40px] mb-[50px] rounded-xl float-left text-center border-2 text-black border-gray-400'>
        <p>রেটিং দিন ।</p>

        <div>
          <Rating
            style={{ float: 'left', textAlign: 'center' }}
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            initialValue={userRating}
          /* Available Props */
          />

        </div>

        <button
          onClick={() => submitRating(post_id)}
          className='bg-orange-400 px-2 py-1 text-white h-[34px] w-[195px] rounded-md'
        // disabled={userRating > 0}
        >
          সাবমিট
        </button>

      </div>
    </div>
  )
}