import Link from "next/link";

const LekhokDetails = ({
    image,
    id,
    user_id = '',
    writer,
    writer_id,
    lifeCycle,
}) => {
    console.log(' user id --------', user_id, writer, writer_id, localStorage.getItem('uuid'))
    return (
        <>
            <div className="flex">
                <div className="lekhokIteam">
                    <a href={`/postswriter/${writer_id}`}>
                        <img
                            className=""
                            src={image}
                            alt={`img ${id}`}
                        />
                    </a>
                </div>
                <div className="pl-4 text-[20px] text-gray-900">
                    {user_id === localStorage.getItem('uuid') ? <Link
                        href={`/user/${user_id}`}>
                        {writer}
                    </Link> :
                        <Link
                            href={`/postswriter/${writer_id}`}
                        >
                            {writer}
                        </Link>
                    }



                    <h1 className="text-[16px] text-gray-600">{lifeCycle}</h1>
                </div>
            </div>

        </>
    );
};

export default LekhokDetails;
