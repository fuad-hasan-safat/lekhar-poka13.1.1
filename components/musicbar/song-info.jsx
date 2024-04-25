import Image from "next/image";
import LekhaPokaProfile from "../common/lekhaProfile";

// type SongInfoProps = {
//     title?: string;
//     writer?: string;
//     image?: string;
//   };


const SongInfo =  ({ title, writer, image }) => {
    return (
        <>

            <div className="flex flex-row pt-10 space-x-2">
                <div className="">
                    <img 
                        src={image}
                        alt={title}
                        width={70}
                        height={70}
                        className="h-[70px] w-[70px] rounded-full"
                    ></img>
                </div>
                <div className="flex flex-col text-gray-600 space-y-2 mt-1">
                    <div className="">
                        <div className="text-xl  font-bold">{title}</div>
                    </div>
                    <div>
                        <div>{writer}</div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default SongInfo;