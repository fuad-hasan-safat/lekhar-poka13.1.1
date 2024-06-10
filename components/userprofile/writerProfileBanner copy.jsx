'use client'
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { useRouter } from 'next/router'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WriterProfileBanner({
    apprevedPost = 0,
    unApprovedPost = 0,
    follower = 0,
    following = 0,
    setProfileController,
    writerInfo,
    writerBio,
    profileInfo,
    isSelfWriter,

}) {
    const router = useRouter()
    const slug = router.query.slug;

    let notification = ''

    const [loggedInUser, setLoggedInUser] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false)
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        // setUserPhone(localStorage.getItem("phone") || "");

        if (isSelfWriter) {
            const fetchUserBioData = async () => {
                const response = await fetch(`${apiBasePath}/bio/${profileInfo?.user_id}`);
                const data = await response.json();
                setBio(data?.content)
                setBioId(data?._id)
                // console.log('------------>>> BIO  <<<-------------', data)

            };

            fetchUserBioData();

            getFollowingStatus(profileInfo?.user_id, localStorage.getItem("uuid"))

        }


    }, []);

    async function getFollowingStatus(user_id, following) {
        try {
            const followingResponse = await axios.post(
                `${apiBasePath}/followstatus`,
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

            setIsAlreadyFollowing(followingResponse.data.status)
            console.log('followingResponse ------------------------- writer in response message---------------->>>>>>', followingResponse)
        } catch (error) {
            // console.log("inside catch ----------------", error);
        }
    }

    let image = ''
    let rendredBio = ''

    if (isSelfWriter) {
        image = profileInfo?.image;
        if (bio?.length > 0) {
            rendredBio = bio;

        } else {
            rendredBio = writerBio?.content;
        }
    } else {
        image = writerInfo?.image;
        rendredBio = writerBio?.content
    }

    async function followUserhandler(user_id, following) {
        if (!isAlreadyFollowing) {
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
                notification = 'অনুসরণ করছেন'
                notify1();
            } catch (error) {
                // console.log("inside catch ----------------", error);
            }
        } else {
            // alert(`আপনি ইতিমধ্যেই ${writerInfo.name} কে অনুসরণ করছেন `)
            notification = `আপনি ইতিমধ্যেই ${writerInfo.name} কে অনুসরণ করছেন `;
            notify();
        }
    }


    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });

    const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    console.log('image --------- length >>>>>', profileInfo?.image)
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

                                className="rounded-full w-[250px] h-[250px]  border-4 border-solid border-white -mt-[110px]  "
                                src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                            />
                        </div>

                        {isSelfWriter && <>  <div>
                            <UserAchivement
                                setProfileController={setProfileController}
                                follower={follower}
                                following={following}
                                apprevedPost={apprevedPost}
                                unApprovedPost={unApprovedPost} />
                        </div>

                            <button
                                className='py-[13px] bg-[#F9A106] hover:bg-[#c67256] px-[75px] p-1 rounded-md text-white text-[16px]'
                                onClick={() => followUserhandler(profileInfo?.user_id, userUuid)}
                            >
                                <span><i class="ri-add-box-fill"></i></span> <span> {isAlreadyFollowing ? 'অনুসরণ করছেন' : 'অনুসরণ করুন'}</span>
                            </button>
                            <ToastContainer />

                        </>
                        }

                    </div>

                    <div className='w-[70%] py-[25px] '>

                        <h1><span className='text-[35px] text-[#FCD200]'>{isSelfWriter && profileInfo.name ? profileInfo.name : writerInfo.name}</span> <span className='text-[#595D5B] text-[22px]'>{isSelfWriter && profileInfo.designation}</span></h1>
                        <ul className='flex flex-row space-x-[25px] text-[#737373] text-[20px]'>
                            {isSelfWriter && <li>
                                <span className='text-[#F9A106]'><i class="ri-map-pin-line"></i></span> <span className='text-[#737373]'>{profileInfo.address}</span>
                            </li>}
                            <li>
                                <span className='text-[#F9A106]'><i class="ri-calendar-2-line"></i></span> <span className='text-[#737373]'>{writerInfo?.birth_date}</span>
                            </li>
                            {isSelfWriter && <li>
                                <span className='text-[#F9A106]'>{profileInfo.gender === 'male' ? <i class="ri-men-line"></i> : <i class="ri-women-line"></i>}</span> <span className='capitalize text-[#737373]'>{profileInfo.gender}</span>
                            </li>}
                        </ul>
                        <p className='text-[20px] text-[#737373] mt-[15px]'>{rendredBio}</p>



                    </div>

                </div>
            </section>

        </>
    )
}
