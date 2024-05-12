'use client'
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../common/Logo';
import { useRouter } from 'next/router';

export default function UpdatedNavBar() {
    const router = useRouter();
    const [selectedNav, setSelectedNav] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [postList, setPostList] = useState(null);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [selectedIteam, setSelectedIteam] = useState(-1);


    const [username, setUsername] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");


    useEffect(() => {
        setUsername(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");

    }, []);


    const menuRef = useRef(null);

    const toggleMenu = () => {
        menuRef.current.classList.toggle("menu__active");
    };
    const closeMenu = () => {
        menuRef.current.classList.remove("menu__active");
    };

    //  control dropdown pop up
    const [visibleItem, setVisibleItem] = useState(null);

    const toggleVisibility = (index) => {
        setVisibleItem(visibleItem === index ? null : index);
    };
    return (
        <>
            <div className="fixed w-full bg-white z-[100]">
                <header className="header shadow-md">
                    {/* Logo */}

                    <div className="container">
                        <div className="row-span-12">
                            <div className="header-innr">
                                <div className="logo">
                                    <a href="/">
                                        <Logo
                                            icon="/images/svgs/lekhapokaBlack.svg"
                                            width={200}
                                            height={92}
                                            alt="LekhaPoka logo"
                                        />
                                    </a>
                                </div>
                                <div className={`flex justify-between items-center text-black lg:text-[18px] sm:text-[15px] pt-1  place-content-center `}>
                                    <div className="hambar__icon" onClick={toggleMenu}>
                                        <i class="ri-menu-line"></i>
                                        {/* <img src="/public/images/navbaricon/list.svg"/> */}
                                    </div>
                                    <div className={`sidebar`} ref={menuRef}>

                                        <ul className={`flex flex-row lg:space-x-6 sm:space-x-2 xs:space-x-[0px] kangsa-font transition-all ease-in-out duration-2000`}>
                                            <li
                                                onClick={() => { setSelectedNav("procchod"); closeMenu(); }}
                                                className={`${selectedNav === "procchod"
                                                    ? "text-[#F9A106] font-semibold underline"
                                                    : ""
                                                    }`}
                                            >
                                                <a href="/">প্রচ্ছদ</a>
                                            </li>
                                            <li className={`relative`} onClick={() => { toggleVisibility(0); setSelectedNav("soblekha"); closeMenu(); }}>
                                                <a
                                                    className={`${selectedNav === "soblekha"
                                                        ? "text-[#F9A106] font-semibold underline"
                                                        : "text-black"
                                                        }`}
                                                    href="#">সব লেখা</a>
                                                {visibleItem === 0 && (
                                                    <ul
                                                        className='absolute text-sm
                                                    lg:backdrop-blur-md md:backdrop-blur-md  
                                                     lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none 
                                                     lg:bg-[#F9A106] md:bg-[#F9A106] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2 w-56 rounded-md  ring-opacity-5 focus:outline-none'>
                                                        <li
                                                            className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="/kobita">কবিতা</a>
                                                        </li>
                                                        <li
                                                            className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="/golpo">গল্প</a>
                                                        </li>
                                                        <li
                                                            className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="/onugolpo">অনুগল্প</a>
                                                        </li>
                                                        <li
                                                            className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="/probondho">প্রবন্ধ</a>
                                                        </li>
                                                        <li
                                                            className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="/jiboni">জীবনী</a>
                                                        </li>
                                                        <li
                                                            className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="/uponnas">উপন্যাস</a>
                                                        </li>
                                                    </ul>
                                                )}
                                            </li>
                                            <li onClick={() => { setSelectedNav("zogazog"); closeMenu(); }}
                                                className={`${selectedNav === "zogazog"
                                                    ? "text-[#F9A106] font-semibold underline"
                                                    : ""
                                                    }`}
                                            >
                                                <a href="/contacts">যোগাযোগ</a>
                                            </li>
                                            <li
                                                onClick={() => { setSelectedNav("amader_somporke"); closeMenu(); }}
                                                className={` lg:w-[130px] sm:w-[100px] ${selectedNav === "amader_somporke"
                                                    ? "text-[#F9A106] font-semibold underline"
                                                    : ""
                                                    }`}
                                            >
                                                <a href="/aboutus">আমাদের সম্পর্কে</a>
                                            </li>
                                            {
                                                userUuid.length > 0 &&
                                                <li
                                                    className='relative'
                                                    onClick={() => { toggleVisibility(1); setSelectedNav("post"); closeMenu(); }}>
                                                    <a
                                                        className={`${selectedNav === "post"
                                                            ? "text-[#F9A106] font-semibold underline"
                                                            : "text-black"
                                                            }`}
                                                        href="#">পোস্ট</a>
                                                    {visibleItem === 1 && (
                                                        <ul className='absolute text-sm lg:backdrop-blur-md md:backdrop-blur-md  lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none lg:bg-[#F9A106] md:bg-[#F9A106] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2 w-56 rounded-md  ring-opacity-5 focus:outline-none'>
                                                            <li
                                                                className="block cursor-pointer px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                            >
                                                                <a href="/user/alluserpost">সকল</a>
                                                            </li>
                                                            <li
                                                                className="block cursor-pointer px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                            >
                                                                <a href="/user/createpost">লিখুন</a></li>
                                                        </ul>
                                                    )}
                                                </li>
                                            }
                                            <li
                                                className='relative'
                                                onClick={() => { toggleVisibility(2); closeMenu(); }}>
                                                <img src='/images/user/deafultProfile.png' alt='profile pic' className='h-[35px] w-[35px] rounded-full' />
                                                {visibleItem === 2 && (
                                                    <ul className='absolute text-sm lg:backdrop-blur-md md:backdrop-blur-md  lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none lg:bg-[#F9A106] md:bg-[#F9A106] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2 w-56 rounded-md  ring-opacity-5 focus:outline-none'>
                                                        <li
                                                            className="block cursor-pointer px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="#">প্রোফাইল</a>
                                                        </li>
                                                        <li
                                                            className="block cursor-pointer px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"

                                                        >
                                                            <a href="#">লগ আউট</a>
                                                        </li>
                                                    </ul>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}
