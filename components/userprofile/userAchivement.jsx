import React from 'react'

export default function UserAchivement({ apprevedPost, follower, following, unApprovedPost }) {
    return (
        <>
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
        </>
    )
}
