"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MaincontentBody = ({
  id,
  title,
  writer,
  content,
  buttons,
  category,
}) => {
  const router = useRouter();

  // const [html, setHTML] = useState({ __html: content });


  function handleClick(postId) {
    router.push(`/post/${postId}`);
  }
  return (
    <>
      {category === 'কবিতা' ? (
        <div className="text-center">
          <div className="pb-3">
            <div className="text-3xl text-yellow-400 font-bold">{title}</div>
          </div>
          <div className="pb-4">
            <div className="text-xl text-gray-800 font-semibold ">{writer}</div>
          </div>
          <div className="pb-3">
            <div
              className="text-[16px] text-gray-500 "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <div className="text-center">
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
        </div >
      ) :
        (<>


          <div className="pb-3">
            <div className="text-3xl text-yellow-400 font-bold">{title}</div>
          </div>
          <div className="pb-4">
            <div className="text-xl text-gray-800 font-semibold ">{writer}</div>
          </div>
          <div className="pb-3">
            <div
              className="text-[16px] text-gray-500 "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleClick(id, buttons.title)}
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

        </>)}

      {/* button -- it would be conditionally appaer */}

    </>
  );
};

export default MaincontentBody;
