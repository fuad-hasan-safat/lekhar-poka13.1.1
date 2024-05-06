import Link from 'next/link'
import React from 'react'

export default function AdminLayOut({children}) {
  return (
    <div className='px-[70px] pt-[70px] text-black'>
        <h1 className='text-3xl '> Admin Control Page List </h1>
        <div className='flex flex-row space-x-5'>
            <Link className=' hover:text-red-500' href={`/admin/allposttable`}>All Post </Link>
            <Link className=' hover:text-red-500' href={`/admin/allcategory`}>All Category </Link>
            <Link className=' hover:text-red-500' href={`/admin/slider`}>create Slider</Link>
            <Link className=' hover:text-red-500' href={`/admin/writerlist`}>All writer</Link>
            <Link className=' hover:text-red-500' href={`/admin/allslidertable`}>Slider List</Link>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}
