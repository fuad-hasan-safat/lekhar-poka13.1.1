import Star from "./Star";
import Image from "next/image";
import Link from "next/link";
import { apiBasePath } from "../../utils/constant";

const LekhaPokaProfile = ({
  image,
  id,
  title,
  writer,
  writer_id,
  star,
}) => {
  // console.log('lekhok details --- image -------------------->>>>>>>>>>>>>>>>', image)
  return (
    <>

      <div className="flex relative w-full">
        <div className="">
          <div className="iteam absolute left-0">
            <a href={`/postswriter/${writer_id}`}>
            <img
              className="border border-[#A5A5A536] "
              src={image === null ? '/images/defaultUserPic/profile.jpg' : `${apiBasePath}/${image?.slice(image.indexOf("/") + 1)}`}

              height={100} width={100} alt={image} />
              </a>
          </div>
          <div className="sidebar__post pl-[80px] space-y-2 w-full">
            <Link className="text-[20px] text-gray-800 " href={`/post/${id}`}>
              {title}
            </Link>
            <diV>
              <a className="text-[16px] text-gray-600" href={`/postswriter/${writer_id}`}>{writer}</a>


            </diV>
            <div className="pt-2">
              <Star star={star} alt="" width={20} height={20} />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default LekhaPokaProfile;
