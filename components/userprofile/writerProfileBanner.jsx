
import React from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'

export default function WriterProfileBanner({
    image = '',
    username = '',
    birth_date,
    expiry_date,
    setUsername,
    designation = '',
    profileStatus = '',
    apprevedPost = 0,
    unApprovedPost = 0,
    follower = 0,
    following = 0,
}) {

    console.log('image --------- length >>>>>', image)
    return (
        <>

            <section className="all__post__sec__wrap">
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[220px]  overflow-hidden" style={{ background: `url('/images/usericons/userbanner.svg')center center / cover no-repeat` }}>
                </div>
            </section>
            <section>
                <div className="profile-img__wrap md:flex md:flex-row relative container">
                    <div className="profile-img">
                        <img
                            className="w-[264px] h-[264px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                            src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                        />
                        {/* <ImageCropProvider>
                            <ImageCrop image={image=== '' ? '/images/defaultUserPic/profile.jpg'  : `${apiBasePath}/${image.slice(image.indexOf('/')+1)}`} />
                        </ImageCropProvider> */}
                    </div>



                    <div className='md:flex md:flex-row pt-[20px] md:lg:pl-[6%] ]'>

                        <div className="grid place-content-center  text-center  ">
                            <h1 className="text-[#FCD200] lg:text-[35px] md:text-[34px] sm:text-[32px] xs:text-[30px]  items-center">
                                <h2 className='px-3 py-2 text-center'>  {username} </h2>
                            </h1>

                            {designation.length > 0 &&
                                <h1 className="text-[#595D5B] lg:text-[22px] md:text-[21px] sm:text-[20px] xs:text-[17px] items-center">
                                    {designation}
                                </h1>
                            }

                            {profileStatus.length > 0 &&
                                <h1 className="text-[#737373] lg:text-[22px] md:text-[21px] sm:text-[20px] xs:text-[17px]  items-center">
                                    {profileStatus}
                                </h1>
                            }

                            <h1 className="text-[#737373] lg:text-[22px] md:text-[21px] sm:text-[20px] xs:text-[17px]  items-center">
                                {birth_date} থেকে {expiry_date?.length> 0 ? expiry_date : 'বর্তমান'}
                            </h1>
                        </div>


                    </div>

                </div>
            </section>
        </>
    )
}
