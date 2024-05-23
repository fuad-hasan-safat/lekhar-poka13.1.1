import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from 'html-react-parser';

const SobKobitaBody = ({
  id,
  title,
  writer,
  writer_id,
  content,
  category
}) => {
  const router = useRouter();

  function handleClick(kobitaId) {
    router.push(`/post/${kobitaId}`);
  }
  return (
    <>
      {category === 'কবিতা' ? (
        <div className="">
          <div className="pb-3">
            <div className="text-3xl text-yellow-400 font-bold">{title}</div>
          </div>
          <div className="pb-4">
            <a className="text-xl text-gray-800 font-semibold " href={`/postswriter/${writer_id}`}>{writer}</a>
          </div>
          <div className="pb-3">
            <div
              className="text-[16px] text-gray-500 "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          
          </div>
          <div className="text-left">
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
            {/* <div
              className="text-[16px] text-gray-500 "
              dangerouslySetInnerHTML={{ __html: content }}
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

        </>)}


    </>
  );
};

export default SobKobitaBody;
