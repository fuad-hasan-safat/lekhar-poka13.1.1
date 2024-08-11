import Link from "next/link";

const LekhokDetails = ({
    image,
    id,
    user_id = '',
    writer,
    writer_id,
    lifeCycle,
}) => {
    console.log({ writer, writer_id, user_id })
    let redirectAddress = `/postbyuser/${user_id}`;
    console.log({ redirectAddress })

    if (user_id) {
        if (user_id === localStorage.getItem('uuid')) {
            redirectAddress = `/user/${user_id}`;
        }
    }


    console.log('redirected --- url', redirectAddress)
    return (
        <>
            <div className="flex">

                <div className="lekhokIteam">

                    <a href={redirectAddress}>

                        <img
                            src={image}
                            alt={`img`}
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
