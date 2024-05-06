import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import AllWriterList from '../components/allwriterlist/AllWriterList'
import Head from 'next/head'


export default function AllWriterPage() {
    return (
        <>
            {/* <div>
                <head>
                    <title>লেখক লিস্ট</title>
                </head>
            </div> */}
            <div>
                <Head>
                    <title>লেখক লিস্ট</title>
                </Head>
                <div className='container all__post__sec__wrap'>
                    <div className='lg:flex lg:flex-row'>
                        <div className='lg:w-[70%]'>
                            <AllWriterList />

                        </div>
                        <div className='lg:w-[30%]'>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
