import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
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
     <section className="all__page__main__content">
        <div className="container">

          <div className="lg:flex lg:flex-row lg:pt-[110px] md:pt-[90px] sm:pt-[40px] xs:pt-[40px]">
            <div className="lg:w-[70%]">
             
             <CreatePost/>


            </div>
            <div className="lg:w-[30%] flex flex-col ">
              <Sidebar />

            </div>
          </div>
          </div>
      </section>
    </>
  )
}
