
import React, { useState } from 'react'
import UserAchivement from './userAchivement'
import { countWords } from '../../function/api'
import ProfileModal from './profileUpdate/ProfileModal'
import { convertToBanglaPhoneNumber, convertToBengaliDate } from '../../utils/convertToBanglaDate'
import Bio from '../common/Bio'

export default function UserProfileBanner({
    userProfileData,
    setuserprofiledata,
    bio,
    profileInfo,
    profileName,
    approvedPost,
    unapprovedPost,
    profileStatus,
    profileStats,
    setProfileController,
}) {
    const selectedBio = countWords(bio, 55);
    // const selectedBio = bio;
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const banglaBirthDate = convertToBengaliDate(userProfileData?.userBirthDate)

    const banglaGender = userProfileData?.userGender === 'male' ? 'পুরুষ' : 'নারী';

    const banglaPhoneNumber = convertToBanglaPhoneNumber(userProfileData?.userPhone)

    let defaultImage = '/images/defaultUserPic/userProfile.png';
    if(userProfileData?.userGender === 'male'){
        defaultImage = '/images/defaultUserPic/rounded/male.png';
    }else if(userProfileData?.userGender === 'famale'){
        defaultImage = '/images/defaultUserPic/rounded/famel.png';
    }

    const userProfileImage = userProfileData.userImage;
    // console.log('User Profile data, --->>>> length',userProfileImage.length);


    return (
        <div className='container border'>
            <div className="flex justify-center">
                <img
                    className="lg:w-[240px] lg:h-[240px]  md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[180px] xs:h-[180px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                    src={userProfileData?.userImage?.length > 0 ? userProfileImage : defaultImage}
                />
               
            </div>
            <h1><span className='text-[35px] font-bold text-[#FCD200]'>{userProfileData?.userName}</span> <span className='text-[#595D5B] pl-[20px] text-[22px]'>{userProfileData?.userDesignation}</span></h1>

            <ul className='profile__info__wrap flex flex-row text-[#737373] text-[20px] lg:mt-[10px]'>


                <li>
                    {userProfileData?.userBirthDate?.length > 0 && <>  <span className='text-[#F9A106]'><img src='/images/usericons/birthdate.svg' /></span> <span className='text-[#737373]'>{banglaBirthDate}</span> </>}
                </li>

                <li>
                    {userProfileData?.userGender?.length > 0 && <> <span className='text-[#F9A106] ml-[30px]'>{profileInfo?.gender === 'male' ? <img src='/images/usericons/sexicon.svg' /> : <img src='/images/usericons/sexicon.svg' />}</span> <span className='capitalize text-[#737373]'>{banglaGender}</span> </>}
                </li>

            </ul>

            <ul className='profile__info__wrap text-[#737373] text-[20px] pb-[30px]'>

                <li>
                    {userProfileData?.userAddress?.length > 0 && <> <span className='text-[#F9A106]'><img src='/images/usericons/location.svg' /></span> <span className='text-[#737373]'>{userProfileData?.userAddress}</span></>}
                </li>

                <li>
                    {userProfileData?.userPhone?.length > 0 && <> <span className='text-[#F9A106] '><img src='/images/usericons/phone.svg' /></span> <span className='text-[#737373] '>+{banglaPhoneNumber}</span> </>}
                </li>

                <li>
                    {userProfileData?.userEmail?.length > 0 && <>  <span className='text-[#F9A106]'><img src='/images/usericons/email.svg' /></span> <span className='text-[#737373] '>{userProfileData?.userEmail}</span> </>}
                </li>
            </ul>

            <hr></hr>


            <div className='mt-[44px] mb-[44px] flex justify-center'>
                <UserAchivement
                    setProfileController={setProfileController}
                    follower={profileStats?.follower}
                    following={profileStats?.following}
                    apprevedPost={approvedPost}
                    unApprovedPost={unapprovedPost} />
            </div>

            <hr></hr>

            {userProfileData?.userBio?.length > 0 && <>
                <h1 className='mt-[35px] text-[#F9A106] font-semibold text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                {/* <p className='text-[16px] text-[#737373] mt-[10px]'>{selectedBio}</p> */}
                <Bio bio={userProfileData?.userBio}/>

            </>}

            <div className='w-full'>
                <button onClick={() => setShowModal(true)} className='page__common__yello__btn w-full bg-[#F9A106] text-white rounded-[5px] px-[75px] py-[17px] mt-[30px] mb-[40px]'>সম্পাদন করুন</button>

            </div>
            {<ProfileModal  setuserprofiledata={setuserprofiledata} setShowModal={setShowModal} image={userProfileData?.userImage || ''} showModal={showModal} handleClose={handleClose} />}

        </div>
    )
}
