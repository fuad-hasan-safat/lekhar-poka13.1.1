import React from 'react'

export default function AudioSingleCategory({color, title, image}) {
  return (
    <div className={`audio__cat__iteam  bg-[${color}]`}>
        <div className=''>
            <h5> {title} </h5>
        </div>
        <div>
            <img src={image} alt=''/>
        </div>
    </div>
  )
}
