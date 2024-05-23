"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import parse from 'html-react-parser';

import { useRouter } from "next/navigation";

const MaincontentBody = ({
  id,
  title,
  writer,
  writer_id,
  content,
  buttons,
  category,
}) => {
  const router = useRouter();

  console.log({ content })

  const elementRef = useRef(null);



  function handleClick(postId) {
    router.push(`/post/${postId}`);
  }
  return (
    <>
      <div className="flex space-x-[10px]">
        <div className="profile__auth__img">
          <a  href={`/postswriter/${writer_id}`} >
          <img  className="w-[100px] h-[100px] rounded-[10px] block m-auto shadow-lg" src="/images/user/coverimage.jpg" alt="" />
          </a>
        </div>
        <div className="">
          <div className="pb-3">
            <div className="text-3xl text-yellow-400 font-bold">{title}</div>
          </div>
          <div className="pb-4">
            <a className="text-xl text-gray-800 font-semibold " href={`/postswriter/${writer_id}`} >{writer}</a>
          </div>
        </div>
      </div>
      <div className="pb-3">
        <div
          className="text-[16px] text-gray-500 "
          dangerouslySetInnerHTML={{ __html: content }}
        />

      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleClick(id)}
          className="text-yellow-500 text-xs"
        >
          <Image
            src={"/images/svgs/purotadekhun.svg"}
            height={30}
            width={190}
            alt="next"
          />
        </button>
      </div>
    </>
  );
};

export default MaincontentBody;
