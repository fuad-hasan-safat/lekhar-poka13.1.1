import React from 'react'
import { audioCategory } from '../../sampleData/audioCat'
import AudioSingleCategory from './AudioSingleCategory'

export default function AudioCategory() {
  return (
    <>
      <div className='audio__cat_iteam clearfix'>
        {audioCategory.map((category, index) => {
          return (

            <AudioSingleCategory
              key={index}
              title={category.title}
              image={category.image}
              color={category.color} />
          )
        })}

      </div>

    </>
  )
}