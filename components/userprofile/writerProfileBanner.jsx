'use client'
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { useRouter } from 'next/router'
import axios from 'axios'

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

    const [loggedInUser, setLoggedInUser] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false)
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')
    const [profileStats, setProfileStats] = useState([])
    const [approvedPost, setApprovedPost] = useState(0)
    const [unapprovedPost, setUnapprovedPost] = useState(0)


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


            // 
            let userid = profileInfo?.user_id;
            fetch(`${apiBasePath}/getprofile/${userid}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('pofile details writer profile--------------->>>>>>>', data);
                    setProfileStats(data.object.stats)
                    setApprovedPost(data.object.approved_post)
                    setUnapprovedPost(data.object.unapproved_post)


                    // console.log(' profile image----------->>>>', image)
                })
                .catch((error) => console.error("Error fetching data:", error));

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
    let birthDate = ''

    if (isSelfWriter) {
        image = profileInfo?.image;

        birthDate = profileInfo?.dob

        if (bio?.length > 0) {
            rendredBio = bio;

        } else {
            rendredBio = writerBio?.content;
        }

    } else {
        image = writerInfo?.image;
        rendredBio = writerBio?.content;
        birthDate = writerInfo?.birth_date;
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
            } catch (error) {
                // console.log("inside catch ----------------", error);
            }
        } else {
            alert(`আপনি ইতিমধ্যেই ${writerInfo.name} কে অনুসরণ করছেন `)
        }
    }

    console.log('image --------- length >>>>>', profileInfo?.image)
    return (
        <>

            <div className='container border pb-[20px]'>
                <div className="flex justify-center">
                    <img
                        className="lg:w-[264px] lg:h-[264px]  md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[180px] xs:h-[180px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                        src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                    />
                </div>
                <h1><span className='text-[35px] text-[#FCD200]'>{writerInfo?.name}</span> <span className='text-[#595D5B] text-[22px]'>{profileInfo?.designation}</span></h1>

                <ul className='flex flex-row space-x-[25px] text-[#737373] text-[20px] lg:mt-[28px]'>


                    {birthDate?.length > 0 && <li>
                        <span className='text-[#F9A106]'><i class="ri-calendar-2-line"></i></span> <span className='text-[#737373]'>{birthDate}</span>
                    </li>}

                    {isSelfWriter && profileInfo?.gender?.length > 0 && <li>
                        <span className='text-[#F9A106]'>{profileInfo?.gender === 'male' ? <i class="ri-men-line"></i> : <i class="ri-women-line"></i>}</span> <span className='capitalize text-[#737373]'>{profileInfo?.gender}</span>
                    </li>}

                </ul>
                {isSelfWriter && <ul className={`text-[#737373] text-[20px] lg:mt-[14px]  lg:space-y-[14px] ${isSelfWriter ? '' : 'mb-[44px]'}`}>

                    <li>
                        <span className='text-[#F9A106]'><i class="ri-map-pin-line"></i></span> <span className='text-[#737373]'>{profileInfo?.address}</span>
                    </li>

                    <li>
                        <span className='text-[#F9A106] '><i class="ri-phone-line"></i></span> <span className='text-[#737373] '>+{profileInfo?.phone}</span>
                    </li>

                    <li>
                        <span className='text-[#F9A106]'><i class="ri-mail-line"></i></span> <span className='text-[#737373] '>{profileInfo?.email}</span>
                    </li>
                </ul>}

                {isSelfWriter && <div className='w-full mt-[44px] mb-[44px]'>
                    <button
                        className='page__common__yello__btn w-full py-[13px] bg-[#F9A106] px-[75px] p-1 rounded-md text-white text-[16px]'
                        onClick={() => followUserhandler(profileInfo?.user_id, userUuid)}
                    >
                        <span><i class="ri-add-box-fill"></i></span> <span> {isAlreadyFollowing ? 'অনুসরণ করছেন' : 'অনুসরণ করুন'}</span>
                    </button>
                </div>}

                {isSelfWriter && <hr></hr>}


                {isSelfWriter && <div className='mt-[30px] mb-[40px] flex justify-center'>
                    <UserAchivement
                        setProfileController={setProfileController}
                        follower={profileStats?.follower}
                        following={profileStats?.following}
                        apprevedPost={approvedPost}
                        unApprovedPost={unapprovedPost} />
                </div>}

                {isSelfWriter && <hr></hr>}

                {rendredBio?.length > 0 && <div className='mb-[25px]'>
                    <h1 className='mt-[30px] text-[#F9A106] text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                    <p className='text-[20px] text-[#737373] mt-[10px]'>{rendredBio}</p>
                </div>}

            </div>
        </>
    )
}
