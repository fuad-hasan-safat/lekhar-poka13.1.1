"use client";
import { useState } from "react";
import Image from "next/image";
import parse from 'html-react-parser';
import { useRouter } from "next/navigation";

const SobGolpoBody = ({id, title, writer, content}) => {
  const router = useRouter();

  const [html, setHTML] = useState({ __html: content });


  function handleClick(golpoId) {
    router.push(`/post/${golpoId}`);
  }
  return (
    <>
      <div className="pb-3">
        <div className="text-3xl text-yellow-400 font-bold">{title}</div>
      </div>
      <div className="pb-4">
        <div className="text-xl text-gray-800 font-semibold ">{writer}</div>
      </div>
      <div className="pb-3">
        {/* <div
          className="text-[16px] text-gray-500 text-justify"
          dangerouslySetInnerHTML={html}
        /> */}
         {content && (
          <div className="text-[16px] text-gray-500">
            {parse(content, {
              replace: (domNode) => {
                if (domNode.attribs && domNode.attribs.style) {
                  delete domNode.attribs.style;
                }
                return domNode;
              },
              onError: (error) => {
                console.error('Error parsing content:', error);
              },
            })}
          </div>
        )}
      </div>

      {/* button -- it would be conditionally appaer */}
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

export default SobGolpoBody;
