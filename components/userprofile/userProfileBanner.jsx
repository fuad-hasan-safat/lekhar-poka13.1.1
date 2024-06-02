
import React, { useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { countWords } from '../../function/api'
import ProfileModal from './profileUpdate/ProfileModal'

export default function UserProfileBanner({
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
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    return (
        <div className='container border'>
            <div className="flex justify-center">
                <img
                    className="lg:w-[264px] lg:h-[264px]  md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[180px] xs:h-[180px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                    src={profileInfo?.image?.length > 0 ? `${apiBasePath}/${profileInfo?.image.slice(profileInfo?.image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                />
            </div>
            <h1><span className='text-[35px] text-[#FCD200]'>{profileInfo?.name}</span> <span className='text-[#595D5B] text-[22px]'>{profileInfo?.designation}</span></h1>

            <ul className='flex flex-row space-x-[25px] text-[#737373] text-[20px] lg:mt-[28px]'>


                <li>
                    {profileInfo?.dob?.length > 0 && <>  <span className='text-[#F9A106]'><i class="ri-calendar-2-line"></i></span> <span className='text-[#737373]'>{profileInfo?.dob}</span> </>}
                </li>

                <li>
                    {profileInfo?.gender?.length > 0 && <> <span className='text-[#F9A106]'>{profileInfo?.gender === 'male' ? <i class="ri-men-line"></i> : <i class="ri-women-line"></i>}</span> <span className='capitalize text-[#737373]'>{profileInfo?.gender}</span> </>}
                </li>

            </ul>
            <ul className='text-[#737373] text-[20px] lg:mb-[44px] md:mb-[40px] sm:mb-[22px] xs:mb-[22px]  space-y-[14px]'>

                <li>
                    {profileInfo?.address?.length > 0 && <> <span className='text-[#F9A106]'><i class="ri-map-pin-line"></i></span> <span className='text-[#737373]'>{profileInfo?.address}</span></>}
                </li>

                <li>
                    {profileInfo?.phone?.length > 0 && <> <span className='text-[#F9A106] '><i class="ri-phone-line"></i></span> <span className='text-[#737373] '>+{profileInfo?.phone}</span> </>}
                </li>

                <li>
                    {profileInfo?.email?.length > 0 && <>  <span className='text-[#F9A106]'><i class="ri-mail-line"></i></span> <span className='text-[#737373] '>{profileInfo?.email}</span> </>}
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

            {selectedBio.length > 0 && <>
                <h1 className='mt-[44px] text-[#F9A106] text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                <p className='text-[20px] text-[#737373] mt-[16px]'>{selectedBio}</p>
            </>}

            <div className='flex justify-center'>
                <button onClick={() => setShowModal(true)} className='page__common__yello__btn bg-[#F9A106] text-white rounded-[5px] px-[75px] py-[10px] mt-[44px] mb-[50px]'>সম্পাদন করুন</button>

            </div>
            {<ProfileModal setShowModal={setShowModal} image={profileInfo?.image} showModal={showModal} handleClose={handleClose} />}

        </div>
    )
}
