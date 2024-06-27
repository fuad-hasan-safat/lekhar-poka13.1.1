import React, { useContext } from 'react'
import { createPortal } from 'react-dom';
import Sidebar from '../sidebar/Sidebar'
import { SearchContext } from '../lekharpokaStore/search-context'
import Link from 'next/link';



export default function SearchResult() {
    const { searchResult, isSearchbarActive ,setIsSearchbarActive, setSearchResult, setSearchKey } = useContext(SearchContext);

    function handleSearchClick(){
        const data = [];
        setIsSearchbarActive();
        setSearchResult(data);
        setSearchKey('')
    }

    if(!isSearchbarActive) return null;

    return (
        <div className='z-[999999999999]'>
            <section className="banner-sec-wrap place-content-center">
                <div className="relative w-full xl:h-[190px] lg:h-[180px] md:h-[180px] sm:h-[180px] xs:h-[170px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    {<h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">অনুসন্ধান</h2>}
                </div>
            </section>

            <section className="all__page__main__content">

                <div className="container">

                    <div className="all__post__content flex flex-row ">

                        <div className="lg:w-[70%]">
                            {searchResult.length <= 0 && <>
                                <h5>কিছু নেই</h5>
                            </>}
                            {searchResult.length > 0 && <>
                                {searchResult.map((data, index) => {
                                    console.log("data --", data)
                                    return (<>
                                        <div className='mb-[10px]'>
                                            <Link  onClick={handleSearchClick} href={`/post/${data._id}`}><h5>{data.title}</h5></Link>

                                        </div>
                                    </>)
                                })}
                            </>}

                        </div>

                        <div className="lg:w-[30%]">
                            <Sidebar />
                        </div>

                    </div>
                </div>

            </section>
        </div>
    )
}
