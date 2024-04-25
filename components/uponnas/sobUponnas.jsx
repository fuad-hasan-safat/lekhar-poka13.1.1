import React from 'react'
import UponnasList from './UponnasList'
import Sidebar from '../sidebar/Sidebar'

export default function SobUponnas() {
    return (
        <section>
            <div className="relative w-full h-[380px]" style={{ backgroundImage: `url('/images/pages-banner-svg/baseBanner.png')`, height: '380px' }}>
                <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%]">উপন্যাস</h2>
            </div>
            <div className='container uponnas_body'>



                <div className='all__post__content flex flex-row'>
                    <div className='w-[70%] pt-[110px]'>
                        <UponnasList />
                    </div>
                    <div className='w-[30%]'>
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </section>
    )
}
