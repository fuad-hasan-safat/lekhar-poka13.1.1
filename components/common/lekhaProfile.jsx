import Star from "./Star";
import Image from "next/image";
import Link from "next/link";
import { apiBasePath } from "../../utils/constant";
import { useState } from "react";
import { useSelector } from "react-redux";

const LekhaPokaProfile = ({
  image,
  id,
  title,
  writer,
  writer_id,
  star,
  uploaded_by,
}) => {

  const userUuid = useSelector((state) => state.usersession.userUuid);
  const [isMounted, setIsMounted] = useState(false);

  useState(() => {
    setIsMounted(true);
  }, [])


  if (!isMounted) return null;

  let redurectUrl = `/postswriter/${writer_id}`;
  if (userUuid) {
    if (userUuid === uploaded_by)
      redurectUrl = `/user/${uploaded_by}`;
  }

  let shortenTitle = title?.length > 26 ? `${title?.slice(0, 25)}...` : title;
  let shortenWriter = writer?.length > 26 ? `${writer?.slice(0, 25)}...` : writer;

  return (
    <>

      <div className="flex relative w-full">

        <div className="w-full">

          <div className="iteam absolute left-0">

            <Link href={redurectUrl}>

              <img
                className="border border-[#A5A5A536] "
                src={image === null ? '/images/defaultUserPic/profile.jpg' : `${apiBasePath}/${image?.slice(image.indexOf("/") + 1)}`}
                height={100} width={100} alt={''}
              />

            </Link>

          </div>

          <div className="sidebar__post pl-[80px] ">

            <Link
              className="text-[18px] text-gray-800 "
              href={`/post/${id}`}
            >
              <p className="charLim">
                {title}
              </p>
            </Link>

            <diV>

              <Link
                className="text-[16px] text-gray-600"
                href={redurectUrl}>
                {shortenWriter}
              </Link>

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
