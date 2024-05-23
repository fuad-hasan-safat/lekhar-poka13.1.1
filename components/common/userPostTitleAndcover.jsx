import React from 'react'

export default function UserPostTitleAndcover({id, title, writer, writer_id}) {
  return (
    <>
     <div className="profile__auth__wrap space-x-[15px]">
        <div className="profile__auth__img">
          <a href={`/post/${id}`} >
            <img className="w-[100px] h-[100px] rounded-[10px] block m-auto shadow-lg" src="/images/user/coverimage.jpg" alt="" />
          </a>
        </div>
        <div className="">
          <div className="pb-[8px]">
            <div className="text-3xl text-yellow-400 font-bold">{title}</div>
          </div>
          <div className="">
            <a className="text-xl text-gray-800 font-semibold " href={`/postswriter/${writer_id}`} >{writer}</a>
          </div>
        </div>
      </div>
    </>
  )
}
