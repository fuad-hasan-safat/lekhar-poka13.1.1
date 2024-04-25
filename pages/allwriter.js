import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import AllWriterList from '../components/allwriterlist/AllWriterList'


export default function AllWriterPage () {
  return (
    <section>
        <div className='container'>
            <div className='flex flex-row'>
                <div className='w-[70%]'>
                    <AllWriterList/>

                </div>
                <div className='w-[30%]'>
                    <Sidebar/>
                </div>
            </div>
        </div>
    </section>
  )
}
