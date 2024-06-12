import React from 'react'

import { audioPlaylist } from '../sampleData/audioPlaylist'
import PlaylistItem from './PlaylistItem'

export default function PlayList() {
  return (
    <>
    {audioPlaylist.map((songInfo, index)=>{
        const length = audioPlaylist?.length;
        console.log({length})
        return(
            <div key={index} className='audio__playlist__wrap'>
                <PlaylistItem songInfo={songInfo} />
                {index + 1 < length && <div className='audio__playlist__devider'>
                    <hr></hr>
                    </div>}
            </div>

        )
    })}
    </>
  )
}
