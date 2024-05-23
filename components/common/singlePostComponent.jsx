import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from 'html-react-parser';

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
      <div className="flex space-x-[15px]">
        <div className="profile__auth__img">
          <a href={`/post/${id}`} >
            <img className="w-[100px] h-[100px] rounded-[10px] block m-auto shadow-lg" src="/images/user/coverimage.jpg" alt="" />
          </a>
        </div>
        <div className="">
          <div className="pb-[8px]">
            <div className="text-3xl text-yellow-400 font-bold">{title}</div>
          </div>
          <div className="pb-[55px]">
            <a className="text-xl text-gray-800 font-semibold " href={`/postswriter/${writer_id}`} >{writer}</a>
          </div>
        </div>
      </div>

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
