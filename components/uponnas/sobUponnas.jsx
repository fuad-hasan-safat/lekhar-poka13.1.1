import React from 'react'
import UponnasList from './UponnasList'
import Sidebar from '../sidebar/Sidebar'

export default function SobUponnas() {
    return (
        <>
            <section className='all__post__sec__wrap'>
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">উপন্যাস</h2>
                </div>
            </section>
            <section className='all__page__main__content'>

                <div className='container '>
                    <div className='all__post__content flex flex-row'>
                        <div className='lg:w-[70%]'>
                            <UponnasList />
                        </div>
                        <div className='lg:w-[30%]'>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
