import React, { useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function UserPostTitleAndcover({
  id,
  title,
  writer,
  writer_id,
  image = '',
  postStatus = false,
  isProfile = false,
  uploadedBy = '',
  updatedAt = '১৩ জানুয়ারি, ২০২৪',
}) {
  const router = useRouter()
  const [isMoreClick, setIsMoreClick] = useState(false)

  console.log({uploadedBy})

  function moreOptionHandler() {
    setIsMoreClick((prevState) => !prevState)
  }

  const formattedDate = formatDate(updatedAt);

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


  return (
    <>
      <div className="profile__auth__wrap space-x-[15px]">

        <div className="profile__auth__img">
          <a href={`/post/${id}`} >
            <img className="lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[110px] sm:w-[100px] sm:h-[100px] xs:w-[80px] xs:h-[80px] rounded-[10px] block m-auto" src={image === '' ? `/images/user/coverimage.jpg` : `${apiBasePath}/${image?.slice(image.indexOf('/') + 1)}`} alt="" />
          </a>
        </div>

        <div className="lg:w-[400px] md:w-[270px] sm:w-[270px] xs:w-[270px] relative">

          <div className="lg:pb-[2px]  ">
            <h1 className="lg:text-[32] md:text-[28px] sm:text-[24px] xs:text-[22px] leading-7 lg:pr-[50px] text-yellow-400 font-bold">{title}</h1>
          </div>

          <a className="lg:text-[22px] md:text-[16px] sm:text-[16px] xs:text-[14px]  text-[#595D5B] font-semibold " href={`/postswriter/${writer_id}`} >{writer}</a>

          <div className="text-[16px] font-thin leading-1">
            <a className="flex place-content-start items-center lg:text-xl md:text-[16px] sm:text-[16px] xs:text-[16px]  text-[#595D5B]" href={`/postswriter/${writer_id}`} >
              {((uploadedBy !== null) && uploadedBy.length>0 )&& <> <span className='inline-block mr-[10px]'>
                <img className="w-[24px] h-[24px] rounded-full block m-auto shadow-lg" src={image === '' ? `/images/user/coverimage.jpg` : `${apiBasePath}/${image?.slice(image.indexOf('/') + 1)}`} alt="" />
              </span>
                <span className='inline-block text-[16px] color-[#595D5B] mr-[15px]'>
                  {uploadedBy}
                </span></>}
              <span className='inline-block '>
                <img src='/images/usericons/calender.svg' />
              </span>
              <span className='inline-block ml-[10px] text-[16px] color-[#595D5B]'>
                {formattedDate}
              </span>
            </a>
          </div>

          {isProfile &&
            <>
              <button
                onClick={moreOptionHandler}
                className='absolute top-0 right-0 text-[20px] rounded-full bg-[#EFEFEF] w-[38px]'><i class="ri-more-2-line"></i></button>
              {isMoreClick &&
                <ul className='mt-[15px] absolute top-[35px] right-0 lg:text-[15px] sm:text-[13px] lg:backdrop-blur-md md:backdrop-blur-md  lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none lg:bg-[#FCF7E8] md:bg-[#FCF7E8] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static w-[190px] rounded-md  ring-opacity-5 focus:outline-none'>
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
