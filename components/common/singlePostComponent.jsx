import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from 'html-react-parser';
import UserPostTitleAndcover from "./userPostTitleAndcover";

const SinglePostConponent = ({
  id,
  title,
  writer,
  writer_id,
  content,
}) => {
  const router = useRouter();


  function handleClick(jiboniId) {
    router.push(`/post/${jiboniId}`);
  }
  return (
    <>
     <UserPostTitleAndcover
     id={id}
     title={title}
     writer={writer}
     writer_id={writer_id}
     />

      <div className="pb-3">
        <div
          className="text-[16px] text-gray-500 text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />
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

export default SinglePostConponent;
