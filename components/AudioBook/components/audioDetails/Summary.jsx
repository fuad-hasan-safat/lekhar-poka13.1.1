import React from 'react'

export default function Summary({ summary }) {
  return (
    <div className='audio__tab__content_wrap'>
      <div className='audio__tab__caption'>
        <h5>সারসংক্ষেপ</h5>
        <hr></hr>
      </div>
      {summary?.trim()?.length <= 0 && <div>
        <p className='text-black pt-[15px]'>এই মুহূর্তে কোন সারসংক্ষেপ নাই</p>
      </div>}
      <div className='audio__tab__details mb-[30px]' dangerouslySetInnerHTML={{ __html: summary }}>

      </div>


    </div>
  )
}
