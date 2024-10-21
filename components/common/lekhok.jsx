import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LekhokDetails = ({
    image,
    id,
    user_id = '',
    writer,
    writer_id,
    lifeCycle,
}) => {

    const router = useRouter();
    // const userUuid = useSelector((state)=> state.usersession.userUuid);
    const [loggedInUserId, setLoggedInUserId] = useState(null)

    useEffect(()=>{
      const loggedInUser = localStorage.getItem('userId') || null ;
    //   console.log('logged in user in profile -->', loggedInUser)
      setLoggedInUserId(loggedInUser);
    },[])

    // console.log({ writer, writer_id, user_id })
    let redirectAddress = `/postbyuser/${writer_id}`;
    // console.log({ redirectAddress })

    if (user_id) {
        if (user_id === loggedInUserId) {
            redirectAddress = `/user/${user_id}`;
        }
    }

    function handleClick(){
        router.push(redirectAddress);
    }

    // console.log('redirected --- url', redirectAddress)
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

                    <button onClick={handleClick}>
                        {writer}
                    </button>

                    <h1 className="text-[14px] text-gray-600 font-[400]">{lifeCycle}</h1>

                </div>

            </div>

        </>
    );
};

export default LekhokDetails;