
import React from 'react'
import { apiBasePath } from '../../utils/constant'

export default function UserProfileBanner({ image = '', username = 'demo', designation = 'demo', profileStatus = 'demo', post = 1, follower = 4, following = 6 }) {

    console.log({ username, designation, profileStatus, post })
    return (
        <>

            <section className="all__post__sec__wrap">
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[220px]  overflow-hidden" style={{ background: `url('/images/usericons/userbanner.svg')center center / cover no-repeat` }}>
                </div>
            </section>
            {/* <div>
                <img
                    className="w-full"
                    src="/images/usericons/userbanner.svg"
                    alt="banner"
                />
            </div> */}
            <section>
                <div className="md:flex md:flex-row container">
                    <div className="profile-img lg:pl-[10%] relative">
                        <img
                            className="w-[264px] h-[264px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                            src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'} />
                    </div>



                    <div className='md:flex md:flex-row pt-[20px] md:lg:pl-[6%] ]'>

                        <div className="grid place-content-center  text-center space-y-4 ">
                            <h1 className="text-[#FCD200] text-[35px]  items-center">
                                {username}
                            </h1>
                            <h1 className="text-[#595D5B] text-[22px]  items-center">
                                {designation}
                            </h1>
                            <h1 className="text-[#737373] text-[22px]  items-center">
                                {profileStatus}
                            </h1>
                        </div>
                        <div className="flex flex-row text-[#484848] lg:text-[28px] md:text-[26px] sm:text-[24px] xs:text-[20px] justify-items-center  m-auto divide-x-2 space-x-3 pt-4 lg:pl-[130px] 
                    place-content-center">

                            <div className="text-center">
                                <h1>{post}</h1>
                                <h1>পোস্ট</h1>
                            </div>

                            <div className="pl-2 text-center">
                                <h1>{follower}</h1>
                                <h1>ফলোয়ার</h1>
                            </div>
                            <div className="pl-2 text-center">
                                <h1>{following}</h1>
                                <h1>ফলোয়িং</h1>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}
