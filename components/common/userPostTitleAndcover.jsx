import React from 'react'
import { apiBasePath } from '../../utils/constant'

export default function UserPostTitleAndcover({id, title, writer, writer_id, image =''}) {
  return (
    <>
     <div className="profile__auth__wrap space-x-[15px]">

        <div className="profile__auth__img">
          <a href={`/post/${id}`} >
            <img className="w-[100px] h-[100px] rounded-[10px] block m-auto shadow-lg" src={image === ''? `/images/user/coverimage.jpg` : `${apiBasePath}/${image?.slice(image.indexOf('/')+1)}`} alt="" />
          </a>
        </div>

        <div className="">

          <div className="pb-[8px] relative">
            <div className="lg:text-[32] md:text-[28px] sm:text-[28px] xs:text-[28px] pr-[50px] text-yellow-400 font-bold">{title}</div>
            <span className='inline-block absolute top-0 right-0 text-[20px]'><i class="ri-more-2-line"></i></span>
          </div>

          <div className="">
            <a className="text-xl text-[#595D5B] font-semibold " href={`/postswriter/${writer_id}`} >{writer}</a>
          </div>

        </div>
        
      </div>
    </>
  )
}
