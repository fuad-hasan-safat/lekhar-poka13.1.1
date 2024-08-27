'use client'
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import UserAchivement from './userAchivement'
import { useRouter } from 'next/router'
import axios from 'axios'
import { convertToBanglaPhoneNumber, convertToBengaliDate } from '../../utils/convertToBanglaDate'
import Bio from '../common/Bio'
import { useDispatch, useSelector } from 'react-redux'
import { toastAction } from '../redux/toast-slice'

export default function WriterProfileBanner({
    setProfileController,
    profileInfo,
    isSelfWriter,

}) {
    const router = useRouter()
    const slug = router.query.slug;
    const dispatch = useDispatch();
    const userUuid = useSelector((state) => state.usersession.userUuid);

    let notification = ''
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false)
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')
    const [profileStats, setProfileStats] = useState([])
    const [followerNumber, setFollowerNumber] = useState(0)
    const [approvedPost, setApprovedPost] = useState(0)
    const [unapprovedPost, setUnapprovedPost] = useState(0)


    useEffect(() => {
        if (isSelfWriter) {
            const fetchUserBioData = async () => {
                const response = await fetch(`${apiBasePath}/bio/${profileInfo?.user_id}`);
                const data = await response.json();
                setBio(data?.content)
                setBioId(data?._id)
                // console.log('------------>>> BIO  <<<-------------', data)

            };

            fetchUserBioData();

            getFollowingStatus(profileInfo?.user_id, userUuid)


            // 
            let userid = profileInfo?.user_id;
            fetch(`${apiBasePath}/getprofile/${userid}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('pofile details writer profile--------------->>>>>>>', data);
                    setProfileStats(data.object.stats)
                    setFollowerNumber(data.object.stats?.follower)
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
            // rendredBio = writerBio?.content;
        }

    } else {
        image = writerInfo?.image;
        rendredBio = writerBio?.content;
        birthDate = writerInfo?.birth_date;
    }

    const banglaBirthDate = convertToBengaliDate(birthDate)
    const banglaGender = profileInfo?.gender === 'male' ? 'পুরুষ' : 'নারী';



    async function followUserhandler(user_id, following) {
        if (!userUuid) {
            notification = 'অনুসরণ করতে লগইন করুন';
            dispatch(toastAction.setWarnedNotification(notification));
            return;
        }
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
                setIsAlreadyFollowing(true);
                setFollowerNumber(followerNumber + 1)
                console.log('following ------------------------- writer in response message---------------->>>>>>', response)
                notification = 'অনুসরণ করছেন'
                dispatch(toastAction.setSucessNotification(notification));

            } catch (error) {
            }
        } else {
            notification = `আপনি ইতিমধ্যেই অনুসরণ করছেন `;
            dispatch(toastAction.setWarnedNotification(notification));
        }
    }


    console.log('image --------- length >>>>>', profileInfo?.image)

    const phoneNumber = convertToBanglaPhoneNumber(profileInfo?.phone);
    const maskedNumber = phoneNumber.substring(0, 5) + '*'.repeat(phoneNumber.length - 5);
    return (
        <>

            <div className='container border pb-[20px]'>
                <div className="flex justify-center">
                    <img
                        className="lg:w-[264px] lg:h-[264px]  md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[180px] xs:h-[180px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                        src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                    />
                </div>
                <h1><span className='text-[35px] text-[#FCD200]'>{profileInfo?.name}</span> <span className='text-[#595D5B] pl-[20px] text-[22px]'>{profileInfo?.designation}</span></h1>

                <ul className='profile__info__wrap flex flex-row text-[#737373] text-[20px] lg:mt-[10px]'>


                    {birthDate?.length > 0 && <li>
                        <span className='text-[#F9A106]'><img src='/images/usericons/birthdate.svg' /></span> <span className='text-[#737373]'>{banglaBirthDate}</span>
                    </li>}

                    {isSelfWriter && profileInfo?.gender?.length > 0 && <li>
                        <span className='text-[#F9A106] ml-[30px]'>{profileInfo?.gender === 'male' ? <img src='/images/usericons/sexicon.svg' /> : <img src='/images/usericons/sexicon.svg' />}</span> <span className='capitalize text-[#737373]'>{banglaGender}</span>
                    </li>}

                </ul>
                {isSelfWriter && <ul className={` profile__info__wrap text-[#737373] text-[20px] lg:mt-[14px] ${isSelfWriter ? '' : 'mb-[44px]'}`}>

                    {profileInfo?.address?.length > 0 && <li>
                        <span className='text-[#F9A106]'><img src='/images/usericons/location.svg' /></span> <span className='text-[#737373]'>{profileInfo?.address}</span>
                    </li>}

                    {profileInfo?.phone?.length > 0 && <li>
                        <span className='text-[#F9A106] '><img src='/images/usericons/phone.svg' /></span> <span className='text-[#737373] '>+{maskedNumber}</span>
                    </li>}

                    {profileInfo?.email?.length > 0 && <li>
                        <span className='text-[#F9A106]'><img src='/images/usericons/email.svg' /></span> <span className='text-[#737373] '>{profileInfo?.email}</span>
                    </li>}
                </ul>}

                {isSelfWriter && <div className='w-full mt-[44px] mb-[44px]'>
                    <button
                        disabled={isAlreadyFollowing}
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
                        follower={followerNumber}
                        following={profileStats?.following}
                        apprevedPost={approvedPost}
                        unApprovedPost={unapprovedPost} />
                </div>}

                {isSelfWriter && <hr></hr>}

                {rendredBio?.length > 0 && <div className='mb-[25px]'>
                    <h1 className='mt-[30px] text-[#F9A106] text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                    <Bio bio={rendredBio} />
                </div>}

            </div>
        </>
    )
}