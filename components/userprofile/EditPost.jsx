import React from 'react'

export default function EditPost({prevPostData}) {
    console.log({prevPostData})
  return (
    <div className='text-black'>{prevPostData.title}</div>
  )
}
