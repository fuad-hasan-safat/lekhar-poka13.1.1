import React from 'react'

export default function UserAchivement({
    setProfileController,
    apprevedPost,
    follower,
    following,
    unApprovedPost }) {

    return (
        <>
            <div className="flex flex-row text-[#484848] lg:text-[20px] md:text-[17px] sm:text-[15px] xs:text-[12px] justify-items-center  m-auto  space-x-3 pt-4  ">

                <div className="text-center">
                    <h1>{apprevedPost}</h1>
                    <h1>পোস্ট</h1>
                </div>

                <button
                    onClick={() => setProfileController('follower')}
                    className="pl-2 text-center">

                    <h1>{follower}</h1>
                    <h1>ফলোয়ার</h1>
                </button>
                <button
                    onClick={() => setProfileController('following')}
                    className="pl-2 text-center">
                    <h1>{following}</h1>
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
