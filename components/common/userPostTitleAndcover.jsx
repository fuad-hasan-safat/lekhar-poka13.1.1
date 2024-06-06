'use client'
import React, { useEffect, useRef, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import { useRouter } from 'next/router'
import axios from 'axios'
import { convertToBengaliDate } from '../../utils/convertToBanglaDate'

export default function UserPostTitleAndcover({
  id,
  title = '',
  writer = '',
  writer_id,
  writer_image = '',
  image = '',
  postStatus = false,
  isProfile = false,
  uploadedBy = '',
  profileName = '',
  updatedAt = '',
}) {
  const router = useRouter()

  const editPostRef = useRef()
  useOutsideAlerter(editPostRef);
  const [isMoreClick, setIsMoreClick] = useState(false)

  console.log("WRITER IMAGE FROM TITLE", { writer_image })

  function moreOptionHandler() {
    setIsMoreClick((prevState) => !prevState)
  }

  const formattedDate = formatDate(updatedAt);



  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setIsMoreClick(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  async function deletePost(id) {
    const confirmPostDelete = window.confirm('আপনি কি পোস্টটি মুছে ফেলতে চান?');
    if (confirmPostDelete) {
      try {
        const response = await axios.delete(`${apiBasePath}/posts/${id}`);
        console.log('Delete successful:', response.data);

        alert('পোস্টটি মুছে ফেলা হয়েছে')
        router.reload()

        return response.data;
      } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
      }

    }


  }


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
    router.reload()

  }


  const banglaDate = convertToBengaliDate(formattedDate)

  let bannerImage = image;

  if (image === undefined || image === null || image === 'undefined') {
    bannerImage = ''
  }

  let writerImage = writer_image

  if (writer_image === undefined || writer_image === null || writer_image === 'undefined') {
    writerImage = ''
  }

  let postuploadedBy = uploadedBy;

  if (profileName) {
    postuploadedBy = profileName;
  }

  let shortenTitle = title?.length > 23 ? `${title?.slice(0, 22)}...` : title;
  let shortenWriter = writer?.length > 26 ? `${writer?.slice(0, 25)}...` : writer;
  let shortenUploadedBy = postuploadedBy?.length > 12 ? `${postuploadedBy?.slice(0, 12)}...` : postuploadedBy;



  return (
    <>
      <div className="profile__auth__wrap space-x-[15px]">

        <div className="profile__auth__img">
          {/* <a href={`/post/${id}`} > */}

          <img className="object-cover lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[110px] sm:w-[100px] sm:h-[100px] xs:w-[80px] xs:h-[80px] rounded-[10px] block m-auto" src={bannerImage === '' ? `/images/user/coverimage.jpg` : `${apiBasePath}/${bannerImage?.slice(bannerImage?.indexOf('/') + 1)}`} alt="" />

          {/* </a> */}
        </div>

        <div className="lg:w-[400px] md:w-[270px] sm:w-[270px] xs:w-[240px] relative">

          <div className="lg:pb-[2px]  ">
            <h1 className="lg:text-[32] md:text-[28px] sm:text-[24px] xs:text-[20px] leading-7 lg:pr-[50px] text-yellow-400 font-bold" style={{ lineHeight: '1.2' }}>{shortenTitle}</h1>
          </div>

          <a className="lg:text-[22px] md:text-[16px] sm:text-[16px] xs:text-[14px]  text-[#595D5B] font-semibold " href={`/postswriter/${writer_id}`} >{shortenWriter}</a>

          <div className="text-[16px] font-thin leading-1">
            <a className="flex place-content-start items-center leading-1 lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[12px]  text-[#595D5B]" href={`/postswriter/${writer_id}`} style={{ lineHeight: '1' }} >
              {((uploadedBy !== null) && uploadedBy.length > 0) && <> <span className='inline-block mr-[10px]'>
                <img className="w-[24px] h-[24px] rounded-full block m-auto shadow-lg" src={writerImage === '' ? `/images/user/coverimage.jpg` : `${apiBasePath}/${writerImage?.slice(writerImage.indexOf('/') + 1)}`} alt="" />
              </span>
                <span className='inline-block lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[12px] color-[#595D5B] mr-[15px]'>
                  {shortenUploadedBy}

                </span></>}
              {updatedAt.length > 0 && <>  <span className='inline-block '>
                <img src='/images/usericons/calender.svg' />
              </span>
                <span className='inline-block leading-1 ml-[10px] lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[12px] color-[#595D5B]'>
                  {banglaDate}
                </span></>}
            </a>
          </div>

          {isProfile &&
            <>
              <button
                onClick={moreOptionHandler}
                className='absolute top-0 right-0 text-[20px] rounded-full bg-[#EFEFEF] w-[38px]'><i class="ri-more-2-line"></i>
                </button>
              {isMoreClick &&
                <ul ref={editPostRef} className=' mt-[15px] absolute top-[35px] right-0 lg:text-[15px] sm:text-[13px] xs:text-[13px] backdrop-blur-md shadow-xl bg-[#FCF7E8] z-[1000] origin-top-right w-[110px] rounded-md  ring-opacity-5 focus:outline-none'>
                  <li
                    className="block cursor-pointer hover:bg-[#F9A106]  hover:text-white"

                  >
                    <button onClick={() => router.push(`/user/editpost/${id}`)} className=' w-full text-center'>সম্পাদন</button>
                  </li>
                  <hr />

                  {/* <li
                    className="block cursor-pointer   hover:bg-[#F9A106]  hover:text-white"

                  >
                    <button
                      onClick={() => revokeStatus(id, postStatus)}
                      className=' w-full text-center'>{postStatus ? 'অপ্রকাশিত' : 'প্রকাশিত'}</button>
                  </li>
                  <hr /> */}
                  <li
                    className="block cursor-pointer  hover:bg-[#F9A106]  hover:text-white"

                  >
                    <button onClick={() => deletePost(id)} className=' w-full text-center'>মুছে ফেলুন</button>
                  </li>


                </ul>}
            </>
          }

        </div>

      </div>
    </>
  )
}
