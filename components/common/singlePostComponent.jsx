import Image from "next/image";
import { useRouter } from "next/navigation";
import UserPostTitleAndcover from "./userPostTitleAndcover";

const SinglePostConponent = ({
  id,
  title,
  writer,
  writer_id,
  content,
  image,
  postStatus,
  uploadedBy,
  updatedAt,
  isProfile,
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
        image={image}
        postStatus={postStatus}
        uploadedBy={uploadedBy}
        updatedAt={updatedAt}
        isProfile={isProfile}
      />

      <div className=" pt-[10px] pb-3">

        <div
          className="text-[16px] text-gray-500 text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />

      </div>

      <div className="flex space-x-2">

        <button
          onClick={() => handleClick(id)}
          className="page__common__btn bg-[#FCD200] text-[#484848] text-[16px] px-[14px] py-[2px] rounded">
          পুরোটা পড়ুন <i class="ri-arrow-right-s-line"></i>
        </button>
      </div>

    </>
  );
};

export default SinglePostConponent;
