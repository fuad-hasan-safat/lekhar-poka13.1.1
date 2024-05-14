
import React from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'

export default function UserProfileBanner({ image ='', username = '', designation = '', profileStatus = '', apprevedPost = 0, unApprovedPost = 0, follower = 0, following = 0 }) {

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
                        {/* <img
                            className="w-[264px] h-[264px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                            src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                        /> */}
                        <ImageCropProvider>
                        <ImageCrop image={`${apiBasePath}/${image}`} />
                        </ImageCropProvider>
                    </div>



                    <div className='md:flex md:flex-row pt-[20px] md:lg:pl-[6%] ]'>

                        <div className="grid place-content-center  text-center space-y-4 ">
                            <h1 className="text-[#FCD200] lg:text-[35px] md:text-[34px] sm:text-[32px] xs:text-[30px]  items-center">
                                {username}
                            </h1>
                            <h1 className="text-[#595D5B] lg:text-[22px] md:text-[21px] sm:text-[20px] xs:text-[17px] items-center">
                                {designation}
                            </h1>
                            <h1 className="text-[#737373] lg:text-[22px] md:text-[21px] sm:text-[20px] xs:text-[17px]  items-center">
                                {profileStatus}
                            </h1>
                        </div>
                        <div className="flex flex-row text-[#484848] lg:text-[18px] md:text-[14px] sm:text-[14px] xs:text-[12px] justify-items-center  m-auto divide-x-2 space-x-3 pt-4 lg:pl-[130px] 
                    place-content-center">

                            <div className="text-center">
                                <h1>{apprevedPost}</h1>
                                <h1>অনুমোদিত পোস্ট</h1>
                            </div>

                            <div className="pl-2 text-center">
                                <h1>{follower}</h1>
                                <h1>ফলোয়ার</h1>
                            </div>
                            <div className="pl-2 text-center">
                                <h1>{following}</h1>
                                <h1>ফলোয়িং</h1>
                            </div>
                            <div className="pl-2 text-center">
                                <h1>{unApprovedPost}</h1>
                                <h1>অনুমোদনহীন পোস্ট</h1>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}
