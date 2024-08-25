import React, { Fragment } from 'react'
import AudioTabSingleItem from './audioList/AudioTabSilgleItem';

export default function AudioTabComponent({audioData}) {
  console.log({audioData})
  return (
    <div className='w-full'>
      {audioData?.length <= 0 && <div>
        <p className='text-black pt-[15px]'>এই মুহূর্তে কোন অডিও নাই</p>
         </div>}
      {audioData?.map((songInfo, index)=>{
         const length = audioData?.length;
      
         return(
             <div key={index} className='audio__tab__wrap'>
                 <AudioTabSingleItem songInfo={songInfo} audioIndex = {index} audioList={audioData} />
             </div>
 
         )
      })}
    </div>
  )
}
