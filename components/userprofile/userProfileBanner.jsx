
import React from 'react'
import { apiBasePath } from '../../utils/constant'

export default function UserProfileBanner({ image = '', username = 'demo', designation = 'demo', profileStatus = 'demo', post = 1, follower = 4, following = 6 }) {

    console.log({ username, designation, profileStatus, post })
    return (
        <>
            <div>
                <img
                    className="w-full"
                    src="/images/usericons/userbanner.svg"
                    alt="banner"
                />
            </div>
            <div className="md:flex md:flex-row container">
                <div className="lg:pl-[10%]">
                    <img
                        className="w-[264px] h-[264px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                        src={image.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'} />
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
                    <div className="flex flex-row text-[#484848] text-[28px] justify-items-center  m-auto divide-x-2 space-x-3 pt-4 lg:pl-[130px] 
                    place-content-center">

                        <div className="">
                            <h1>{post}</h1>
                            <h1>পোস্ট</h1>
                        </div>

                        <div className="pl-2">
                            <h1>{follower}</h1>
                            <h1>ফলোয়ার</h1>
                        </div>
                        <div className="pl-2">
                            <h1>{following}</h1>
                            <h1>ফলোয়িং</h1>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}