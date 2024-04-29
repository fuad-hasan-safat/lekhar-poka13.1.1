import Image from "next/image";
import { useRouter } from "next/navigation";

const SobJiboniBody = ({
  id,
  title,
  writer,
  content,
}) => {
  const router = useRouter();


  function handleClick(jiboniId) {
    router.push(`/post/${jiboniId}`);
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
          className="text-[16px] text-gray-500 text-justify"
          dangerouslySetInnerHTML={{__html:content}}
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

export default SobJiboniBody;
