import Link from "next/link";

const cl = (wrt) => {
    console.log("wrt ", wrt)
}

const LekhokDetails = ({
    image,
    id,
    writer,
    lifeCycle,
}) => {
    return (
        <>
            <div className="flex">
                <div className="lekhokIteam">
                    <img 
                    src={image}  
                    alt={`img ${id}`}
                   />
                </div>
                <div className="pl-4 text-[20px] text-gray-900">
                    <Link 
                        onClick={cl(writer)}
                        href={`/postswriter/${writer}`}
                        // href={`/user/user/${id}`}
                        >
                        {writer}
                    </Link>
                    <h1 className="text-[16px] text-gray-600">{lifeCycle}</h1>
                </div>
            </div>
            
        </>
    );
};

export default LekhokDetails;
