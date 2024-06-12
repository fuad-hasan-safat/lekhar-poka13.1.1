import React from 'react'

import { audioPlaylist } from '../sampleData/audioPlaylist'
import PlaylistItem from './PlaylistItem'

export default function PlayList() {
  return (
    <>
    {audioPlaylist.map((songInfo, index)=>{
        return(
            <PlaylistItem songInfo={songInfo} />
        )
    })}
    </>
  )
}
