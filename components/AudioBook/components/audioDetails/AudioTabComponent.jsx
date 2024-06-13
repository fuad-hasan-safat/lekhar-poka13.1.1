import React, { Fragment } from 'react'
import AudioTabSingleItem from './audioList/AudioTabSilgleItem';

export default function AudioTabComponent({audioData}) {
  return (
    <div className='w-full'>
      {audioData?.map((songInfo, index)=>{
         const length = audioData?.length;
      
         return(
             <div key={index} className='audio__tab__wrap'>
                 <AudioTabSingleItem songInfo={songInfo} />
             </div>
 
         )
      })}
    </div>
  )
}
