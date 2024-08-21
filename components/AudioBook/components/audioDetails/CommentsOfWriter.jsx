import React from 'react'

export default function CommentsOfWriter({commentsOfWriter}) {
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>লেখকের বক্তব্য</h5>
                <hr></hr>
            </div>
            {commentsOfWriter?.trim()?.length <= 0 && <div>
                <p className='text-black pt-[15px]'>এই মুহূর্তে কোন লেখকের বক্তব্য নাই</p>
            </div>}
            <div className='audio__tab__details mb-[30px]' dangerouslySetInnerHTML={{__html:commentsOfWriter}}>

            </div>
        </div>
    )
}
