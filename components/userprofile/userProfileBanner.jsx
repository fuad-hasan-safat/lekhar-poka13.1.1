
import React, { useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { countWords } from '../../function/api'
import ProfileModal from './profileUpdate/ProfileModal'

export default function UserProfileBanner({ image = '',
    username = '',
    setUsername,
    phone = '',
    email = '',
    address = '',
    dob = '',
    gender = '',
    designation = '',
    profileStatus = '',
    bio = '',
    apprevedPost = 0,
    unApprovedPost = 0,
    follower = 0,
    following = 0,
    setProfileController,
}) {
    const selectedBio = countWords(bio, 55);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

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

                        <div className='mt-[25px] ml-[20px]'>
                            <ul className='text-[20px]'>

                                <li>
                                    <span className='text-[#F9A106]'><i class="ri-phone-line"></i></span> <span className='text-[#737373] '>+{phone}</span>
                                </li>

                                <li>
                                    <span className='text-[#F9A106]'><i class="ri-mail-line"></i></span> <span className='text-[#737373] '>{email}</span>
                                </li>

                            </ul>
                        </div>

                        <div>
                            <UserAchivement
                                setProfileController={setProfileController}
                                follower={follower}
                                following={following}
                                apprevedPost={apprevedPost}
                                unApprovedPost={unApprovedPost} />
                        </div>

                    </div>

                    <div className='w-[70%] py-[25px] '>

                        <h1><span className='text-[35px] text-[#FCD200]'>{username}</span> <span className='text-[#595D5B] text-[22px]'>{designation}</span></h1>

                        <ul className='flex flex-row space-x-[25px] text-[#737373] text-[20px]'>

                            <li>
                                <span className='text-[#F9A106]'><i class="ri-map-pin-line"></i></span> <span className='text-[#737373]'>{address}</span>
                            </li>

                            <li>
                                <span className='text-[#F9A106]'><i class="ri-calendar-2-line"></i></span> <span className='text-[#737373]'>{dob}</span>
                            </li>

                            <li>
                                <span className='text-[#F9A106]'>{gender === 'male' ? <i class="ri-men-line"></i> : <i class="ri-women-line"></i>}</span> <span className='capitalize text-[#737373]'>{gender}</span>
                            </li>
                            
                        </ul>

                        {selectedBio.length > 0 && <>
                            <h1 className=' mt-[15px] text-[#F9A106] text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                            <p className='text-[20px] text-[#737373] '>{selectedBio}</p>
                        </>}

                        <button onClick={() => setShowModal(true)} className='bg-[#F9A106] text-white hover:bg-[#FCD200] rounded-[5px] px-[75px] py-[10px] mt-[15px]'>সম্পাদন করুন</button>
                        {<ProfileModal setShowModal={setShowModal} image={image} showModal={showModal} handleClose={handleClose} />}


                    </div>

                </div>
            </section>
        </>
    )
}
