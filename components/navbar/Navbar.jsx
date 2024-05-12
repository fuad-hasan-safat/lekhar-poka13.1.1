"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import 'remixicon/fonts/remixicon.css'

import Logo from "../common/Logo";
import SobLekha from "./sobLekhaDropDown";
import { useRouter } from "next/navigation";
import { apiBasePath } from "../../utils/constant";
import PostDropDown from "./PostDropDown";
import ProfileDropDown from "./ProfileDropDown";
// import PostDropDown from "./postDropdown";

const MyNavbar = () => {
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

  const menuRef = useRef(null);

  // Shared reference for all dropdowns
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeAllDropdowns(); // Close all dropdowns if clicked outside
    }
  };

  //  post drop down start

  const postOptions = [
    { value: 'sokol', label: 'সকল', path: '/user/alluserpost' },
    { value: 'likhun', label: 'লিখুন', path: '/user/createpost' },

  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => setSelectedOption(option);


  useEffect(() => {
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");

  }, []);



  useEffect(() => {
    // Add event listener on component mount
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove listener on unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); // Empty dependency array for effect to run only once

  const toggleMainNav = (navItem) => {
    setSelectedNav(navItem === selectedNav ? "" : navItem); // Toggle nav selection
  };

  const closeAllDropdowns = () => {
    setSelectedNav(""); // Reset selectedNav to close all dropdowns
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiBasePath}/posts`);
        const data = await response.json();
        setPostList(data);
        //console.log( "------------------->>>> POST LIST ------------------>>>>>>>",postList );
      } catch (error) {
        // alert("Error Fetching data");
      }
    };

    fetchPosts();
  }, []);



  const profileOptions = [
    { value: 'profile', label: 'প্রোফাইল', path: `/user/${userUuid}`, action: null }, // Profile view, no action
    {
      value: 'logout',
      label: 'লগ আউট',
      path: null, // No path for logout confirmation, handled within the component
      action: true,
    },
  ];

  const [selectedOptionprofile, setSelectedOptionprofile] = useState(null);

  const handleOptionSelectprofile = (option) => setSelectedOptionprofile(option);

  // profile drop down end



  const toggleMenu = () => {
    menuRef.current.classList.toggle("menu__active");
  };
  const closeMenu = () => {
    menuRef.current.classList.remove("menu__active");
  };



  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyDown = (e) => {
    // console.log(e.key)
    if (selectedIteam < searchData.length) {
      if (e.key === "ArrowUp" && selectedIteam > 0) {
        setSelectedIteam((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedIteam < searchData.length - 1
      ) {
        setSelectedIteam((prev) => prev + 1);
      } else if (e.key === "Enter") {
        window.open(searchData[selectedIteam].link);
      }
    } else {
      setSelectedIteam(-1);
    }
  };
  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedIteam(-1);
  };



  useEffect(() => {
    if (search !== "") {
  
      try {
        const newFiltreddata = postList.filter((post) => {
          return post.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        });
        setSearchData(newFiltreddata);
      } catch (error) { }
    } else {
      setSearchData([]);
    }
  }, [search]);


  function goToSearchPost(id) {
    setSearch("");
    setSearchData([]);
    setSelectedIteam(-1);
    router.push(`/post/${id}`)
    // router.refresh()
  }

  return (
    <div className="fixed w-full bg-white z-[100]">
      <header className="header shadow-md">
        {/* Logo */}

        <div className="container">
          <div className="row-span-12">
            <div className="header-innr">
              <div className="logo">
                <Link href="/">
                  <Logo
                    icon="/images/svgs/lekhapokaBlack.svg"
                    width={200}
                    height={92}
                    alt="LekhaPoka logo"
                  />
                </Link>
              </div>
              <div className={`flex justify-between items-center text-black lg:text-[18px] sm:text-[15px] pt-1  place-content-center `}>
                <div className="hambar__icon" onClick={toggleMenu}>
                  <i class="ri-menu-line"></i>
                  {/* <img src="/public/images/navbaricon/list.svg"/> */}
                </div>
                {/* Buttons */}
                <div className={`sidebar`} ref={menuRef}>
                  <ul className={`flex flex-row lg:space-x-6 sm:space-x-2 xs:space-x-[0px] kangsa-font transition-all ease-in-out duration-2000"}`}>
                    <li
                      onClick={() => { setSelectedNav("procchod");toggleMainNav("procchod"); closeMenu(); }}
                      className={`${selectedNav === "procchod"
                        ? "text-[#F9A106] font-semibold underline"
                        : ""
                        }`}
                    >
                      <Link href="/">প্রচ্ছদ</Link>
                    </li>
                    <li
                      onClick={() => { setSelectedNav("soblekha"); toggleMainNav("soblekha");}}>
                      <SobLekha
                        closeMenu={closeMenu}
                
                        sobClass={`${selectedNav === "soblekha"
                          ? "text-[#F9A106] font-semibold underline"
                          : "text-black"
                          }`}
                      />
                    </li>
                    <li
                      onClick={() => { setSelectedNav("zogazog");toggleMainNav("zogazog"); closeMenu(); }}
                      className={`${selectedNav === "zogazog"
                        ? "text-[#F9A106] font-semibold underline"
                        : ""
                        }`}
                    >
                      <Link href="/contacts">যোগাযোগ</Link>
                    </li>
                    <li
                      onClick={() => { setSelectedNav("amader_somporke");toggleMainNav("amader_somporke"); closeMenu(); }}
                      className={` lg:w-[130px] sm:w-[100px] ${selectedNav === "amader_somporke"
                        ? "text-[#F9A106] font-semibold underline"
                        : ""
                        }`}
                    >
                      <Link href="/aboutus">আমাদের সম্পর্কে</Link>
                    </li>
                    <li
                      onClick={() => { setSelectedNav("post"); toggleMainNav("post"); }}
                    >

                      {
                        userUuid.length > 0 &&
                        <PostDropDown
                          sobClass={`${selectedNav === "post"
                            ? "text-[#F9A106] font-semibold underline"
                            : "text-black"
                            }`}
                          options={postOptions}
                          selected={selectedOption}
                          onSelect={handleOptionSelect}
                          selectedNav={setSelectedNav}
                          lebel='পোস্ট' />
                      }
                    </li>

                    <li
                      onClick={() => { setSelectedNav("profile");toggleMainNav("profile") }}

                    >
                      {
                        userUuid.length > 0 &&
                        <ProfileDropDown
                          sobClass={`${selectedNav === "profile"
                            ? "text-[#F9A106] font-semibold underline"
                            : "text-black"
                            }`}
                          options={profileOptions}
                          selected={selectedOptionprofile}
                          onSelect={handleOptionSelectprofile}
                          lebel={`${username[0]}`}
                          selectedNav={setSelectedNav}
                        />
                      }
                    </li>
                  </ul>
                </div>
                <div>

                </div>

                <div className="search__bar relative flex flex-row place-content-center">
                  <Image
                    src="/images/svgs/search.svg"
                    height={50}
                    width={50}
                    alt=""
                    className={` cursor-pointer`}
                    onClick={() => setIsSearchActive(true)}
                  />

                  {isSearchActive && (
                    <input
                      type="text"
                      className={` w-[200px] text-[16px] bg-transparent text-black py-2 pr-10 rounded-md focus:outline-none`}
                      placeholder=" অনুসন্ধান..."
                      autoComplete="off"
                      onChange={handleChange}
                      value={search}
                      onKeyDown={handleKeyDown}
                    />
                  )}
                  <div
                    className={`search_result ${isSearchActive ? "visible" : "hidden"
                      }`}
                  >
                    {searchData.map((data, index) => {
                      return (
                        <button
                          onClick={() => goToSearchPost(data._id)}
                          className={
                            selectedIteam === index
                              ? "search_suggestion_line active"
                              : "search_suggestion_line"
                          }
                          key={index}
                        >
                          {data.title}
                        </button>
                      );
                    })}
                    {searchData.length === 0 && search !== "" && (
                      <h1>No Result Found</h1>
                    )}
                  </div>


                  {isSearchActive && (

                    <button
                      onClick={() => setIsSearchActive(false)}
                    >
                      <i class="ri-list-check"></i>
                    </button>

                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MyNavbar;
