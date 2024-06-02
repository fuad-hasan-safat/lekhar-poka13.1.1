import React from 'react'

export default function UserAchivement({
    setProfileController,
    apprevedPost,
    follower = 0,
    following = 0,
    unApprovedPost }) {

    return (
        <>
            <div className="flex flex-row divide-x text-[#484848] lg:text-[20px] md:text-[17px] sm:text-[15px] xs:text-[12px]  place-content-center items-center m-auto">

                <div className="text-center pr-[22px]">
                    <h1 className='text-[32px] text-[#F9A106]'>{apprevedPost}</h1>
                    <h1>পোস্ট</h1>
                </div>

                <button
                    onClick={() => setProfileController('follower')}
                    className="px-[22px] text-center">

                    <h1 className='text-[32px] text-[#F9A106]'>{follower || '0'}</h1>
                    <h1>ফলোয়ার</h1>
                </button>
                <button
                    onClick={() => setProfileController('following')}
                    className="pl-[22px] text-center">
                    <h1 className='text-[32px] text-[#F9A106]'>{following || '0'}</h1>
                    <h1>ফলোয়িং</h1>
                </button>
                {/* <div className="pl-2 text-center">
                    <h1>{unApprovedPost}</h1>
                    <h1>অনুমোদনহীন পোস্ট</h1>
                </div> */}
            </div>
        </>
    )
}
