'use client'
import React, { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import Sidebar from '../sidebar/Sidebar'
import { SearchContext } from '../lekharpokaStore/search-context'
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function SearchResult() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false)
    const { selectedIteam ,searchResult, isSearchbarActive, setIsSearchbarActive, setSearchResult, setSearchKey, searchKey} = useContext(SearchContext);

    useEffect(() => {
        const handleRouteChange = (url) => {
            console.log('App is changing to: ', url);
            // Your custom function here
            const data = [];
            setIsSearchbarActive(false);
            setSearchResult(data);
            setSearchKey('')
        };

        // Subscribe to route changes
        router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup the subscription on unmount
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        setIsMounted(false)
    }, [])

    // useEffect(() => {
    //     // Prevent scrolling of background page when modal is open
    //     if (isSearchbarActive) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }

    //     return () => {
    //         // Revert overflow setting when component unmounts
    //         document.body.style.overflow = 'unset';
    //     };
    // }, [isSearchbarActive]);

    function handleSearchClick() {
        const data = [];
        setIsSearchbarActive(false);
        setSearchResult(data);
        setSearchKey('')
    }

    if (!isSearchbarActive || isMounted) return null;

    return createPortal((
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex z-[999]">
                <div className="bg-white rounded-lg overflow-scroll w-full shadow-lg">
                    <section className="banner-sec-wrap place-content-center">
                        <div className="relative w-full xl:h-[190px] lg:h-[180px] md:h-[180px] sm:h-[180px] xs:h-[170px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                            {<h2 className=" absolute top-[40%] left-[50%] lg:text-[40px] md:text-[38px] sm:text-[35px] xs:text-[30px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">অনুসন্ধান</h2>}
                        </div>
                    </section>
                    <section className="">

                        <div className="container">

                            <div className=" flex flex-row ">
                                <div className="lg:w-[70%] text-gray-600">
                                    {searchKey.trim().length > 0 && searchResult.length <= 0 && <h5>কোন তথ্য খুঁজে পাওয়া যায় নি!</h5>}

                                    {searchResult.length > 0 && <>
                                        {searchResult.map((data, index) => {
                                            console.log("data --", data)
                                            let classes = '';
                                            if (index === selectedIteam) {
                                                classes = 'bg-gray-200 '
                                            }
                                            return (<>
                                                <div className={`mb-[10px] p-2 ${classes} hover:bg-gray-200`}>
                                                    <Link onClick={handleSearchClick} href={`/post/${data._id}`}><h5>{data.title}</h5></Link>

                                                </div>
                                            </>)
                                        })}
                                    </>}

                                </div>
                                <div className='lg:w-[30%]'>
                                    <Sidebar />
                                </div>
                            </div>
                        </div>

                    </section>
                </div >
            </div >
        </>
    ), document.getElementById('search-result'));
}
