import React from 'react'
import Sidebar from '../sidebar/Sidebar'

export default function SearchResult() {
    return (
        <>
            <section className="banner-sec-wrap">
            </section>

            <section className="all__page__main__content">

                <div className="container">
                    <h1 className='text-[48px]'>অনুসন্ধান </h1>
                            

                    <div className="all__post__content flex flex-row">

                        <div className="lg:w-[70%]">
                            Search result
                        </div>

                        <div className="lg:w-[30%]">
                            <Sidebar />
                        </div>

                    </div>
                </div>

            </section>
        </>
    )
}
