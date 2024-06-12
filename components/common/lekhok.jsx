import Link from "next/link";

const LekhokDetails = ({
    image,
    id,
    user_id = '',
    writer,
    writer_id,
    lifeCycle,
}) => {
    let redirectAddress = `/postswriter/${writer_id}`;
    if (user_id === localStorage.getItem('uuid')) {
        redirectAddress = `/user/${user_id}`;
    }

    return (
        <>
            <div className="flex">

                <div className="lekhokIteam">

                    <a href={redirectAddress}>

                        <img
                            src={image}
                            alt={`img ${id}`}
                        />

                    </a>

                </div>

                <div className="pl-4 text-[16px] text-gray-900 font-semibold">

                    <Link href={redirectAddress}>
                        {writer}
                    </Link>

                    <h1 className="text-[14px] text-gray-600 font-[400]">{lifeCycle}</h1>

                </div>

            </div>

        </>
    );
};

export default LekhokDetails;
