'use client'
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { useRouter } from 'next/router'

export default function WriterProfileBanner({
    image = '',
    username = '',
    birth_date,
    expiry_date,
    setUsername,
    bio,
    designation = '',
    profileStatus = '',
    apprevedPost = 0,
    unApprovedPost = 0,
    follower = 0,
    following = 0,
    setProfileController,
}) {
    const router = useRouter()
    const slug = router.query.slug;

    const [loggedInUser, setLoggedInUser] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        // setUserPhone(localStorage.getItem("phone") || "");

    }, []);


    async function followUserhandler(user_id, following) {
        try {
            const response = await axios.post(
                `${apiBasePath}/follow`,
                {
                    user_id: following,
                    following: user_id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            console.log('following ------------------------- writer in response message---------------->>>>>>', response)






        } catch (error) {
            // console.log("inside catch ----------------", error);
        }


    }

    console.log('image --------- length >>>>>', image)
    return (
        <>
            <section className="all__post__sec__wrap">
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[220px] -z-10  overflow-hidden" style={{ background: `url('/images/usericons/userbanner.svg')center center / cover no-repeat` }}>
                </div>
            </section>
            <section className='text-gray-600'>
                <div className="container lg:flex lg:flex-row">
                    <div className='w-[23%]'>
                        <div className="">
                            <img
                                className="w-[264px] h-[264px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                                src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                            />
                        </div>

                        <div>
                            <UserAchivement
                                setProfileController={setProfileController}
                                follower={follower}
                                following={following}
                                apprevedPost={apprevedPost}
                                unApprovedPost={unApprovedPost} />
                        </div>

                        <button
                            className='py-[5px] bg-[#F9A106] hover:bg-[#c67256] px-[48px] p-1 rounded-md text-white text-[16px]'
                            onClick={() => followUserhandler(slug, userUuid)}
                        >
                            অনুসরণ করুন
                        </button>

                    </div>

                    <div className='w-[70%] py-[25px] '>

                        <h1><span className='text-[35px] text-[#FCD200]'>{username}</span> <span className='text-[#595D5B] text-[22px]'>{designation}</span></h1>
                        <ul className='flex flex-row space-x-[25px] text-[#737373] text-[20px]'>
                            {/* <li>
                                <span className='text-[#F9A106]'><i class="ri-map-pin-line"></i></span> <span className='text-[#737373]'>{address}</span>
                            </li> */}
                            <li>
                                <span className='text-[#F9A106]'><i class="ri-calendar-2-line"></i></span> <span className='text-[#737373]'>{birth_date}</span>
                            </li>
                            {/* <li>
                                <span className='text-[#F9A106]'>{gender === 'male' ? <i class="ri-men-line"></i> : <i class="ri-women-line"></i>}</span> <span className='capitalize text-[#737373]'>{gender}</span>
                            </li> */}
                        </ul>
                        <p className='text-[20px] text-[#737373] mt-[15px]'>{bio}</p>



                    </div>

                </div>
            </section>

        </>
    )
}
