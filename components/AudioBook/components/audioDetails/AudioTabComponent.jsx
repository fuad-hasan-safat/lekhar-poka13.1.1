import React, { Fragment } from 'react'
import AudioTabSingleItem from './audioList/AudioTabSilgleItem';

export default function AudioTabComponent({audioData}) {
  return (
    <div className='w-full'>
      {audioData?.map((songInfo, index)=>{
         const length = audioData?.length;
      
         return(
             <div key={index} className='audio__playlist__wrap'>
                 <AudioTabSingleItem songInfo={songInfo} />
                 {index + 1 < length && <div className='audio__playlist__devider'>
                     <hr></hr>
                     </div>}
             </div>
 
         )
      })}
    </div>
  )
}
