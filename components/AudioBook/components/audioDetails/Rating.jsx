import React from 'react'

export default function Rating({userComments}) {
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>শ্রোতাদের মন্তব্য</h5>
                <hr></hr>
            </div>

            <div className='audio__tab__details'>
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
