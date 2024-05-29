import Image from "next/image";
import { useRouter } from "next/navigation";

const SobPostsOfWriterBody = ({ id, title, writer, content, category }) => {
  const router = useRouter();

  function handleClick(postid) {
    router.push(`/post/${postid}`);
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

export default SobPostsOfWriterBody;
