"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import parse from 'html-react-parser';

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

  const elementRef = useRef(null);
  useEffect(() => {
    const element = elementRef.current;

    const handleRightClick = (event) => {
      event.preventDefault(); // Prevent default context menu
      // Implement custom logic here (e.g., display an alert)
      alert('Right-click detected!');
    };

    element.addEventListener('contextmenu', handleRightClick);

    return () => {
      element.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);


  // const [html, setHTML] = useState({ __html: content });


  function handleClick(postId) {
    router.push(`/post/${postId}`);
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
          className="text-[16px] text-gray-500 "
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
         {content && (
          <div className="text-[16px] text-gray-500" ref={elementRef}>
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
    </>
  );
};

export default MaincontentBody;
