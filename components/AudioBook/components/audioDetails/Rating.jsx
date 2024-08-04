import React, { useState } from 'react'
import CreateRating from './CreateRating'

export default function Rating({singleAudioData}) {
    const userComments = singleAudioData.rating;
    
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>শ্রোতাদের মন্তব্য</h5>
                <hr></hr>
            </div>
            <CreateRating singleAudioData={singleAudioData} />

            <div className='audio__tab__details mt-[40px]'>
                {userComments?.map((comment, index)=>{
                    return(
                        <div key={index}>
                            <p>{comment?.name}: {comment?.comment}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
