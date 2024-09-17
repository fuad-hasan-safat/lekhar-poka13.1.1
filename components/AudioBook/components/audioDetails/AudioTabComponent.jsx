import React from 'react'
import AudioTabSingleItem from './audioList/AudioTabSilgleItem';

export default function AudioTabComponent({ singleAudioData }) {
  const audioData = singleAudioData?.audio?.map((audio, index) => ({
    ...audio,
    writer: singleAudioData.writer,
  }))
  console.log({ audioData })
  return (
    <div className='w-full mb-[100px]'>
      {audioData?.length <= 0 && <div>
        <p className='text-black pt-[15px]'>এই মুহূর্তে কোন অডিও নাই</p>
      </div>}
      {audioData?.map((songInfo, index) => {
        const length = audioData?.length;
        const songDetails = {
          ...songInfo,
          writer: singleAudioData.writer,
        }
        return (
          <div key={index} className='audio__tab__wrap '>
            <AudioTabSingleItem songInfo={songDetails} audioIndex={index} audioList={audioData} />
          </div>

        )
      })}
    </div>
  )
}
