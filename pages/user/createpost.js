'use client'
import React from 'react'
import CreatePost from '../../components/userprofile/createPost'
import Head from 'next/head'


export default function Createpost() {

    return (
        <>
            <div>
                <Head>
                    <title>লিখুন</title>
                </Head>
            </div>
            <section className="all__post__sec__wrap">
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[220px] -z-10  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 class=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">আপনার লেখা</h2>
                </div>
            </section>
            <section className="all__page__main__content">
                <div className="container">

                    <div className="lg:flex lg:flex-row lg:pt-[110px] md:pt-[90px] sm:pt-[40px] xs:pt-[40px]">
                        <div className="lg:w-full">

                            <CreatePost />


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
