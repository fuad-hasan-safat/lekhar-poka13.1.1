import Star from "./Star";
import Image from "next/image";
import Link from "next/link";

const LekhaPokaProfile= ({
  image,
  id,
  title,
  writer,
  star,
}) => {
  return (
    <>
      <div className="flex ">
        <div className="iteam">
          <img src={image} height={100} width={100} alt="" />
        </div>
        <div className="pl-4  space-y-2">
          <Link className="text-[20px] text-gray-800 " href={`/post/${id}`}>
            {title}
          </Link>
          <h1 className="text-[16px] text-gray-600">{writer}</h1>
          <div className="pt-2">
            <Star star={star} alt="" width={20} height={20} />
          </div>

        </div>

      </div>
      
    </>
  );
};

export default LekhaPokaProfile;
