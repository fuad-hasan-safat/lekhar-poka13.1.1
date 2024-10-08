'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '../common/Logo';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { apiBasePath } from '../../utils/constant';
import Link from 'next/link';
import DialugueModal from '../common/notification/DialugueModal';
import { SearchContext } from '../lekharpokaStore/search-context';
import { UserContext } from '../lekharpokaStore/user-context';
import { useDispatch, useSelector } from 'react-redux';
import { FetchCategory, fetchData } from '../../function/api';
import { categoryActions } from '../redux/category-slice';

export default function UpdatedNavBar() {

    const dispatch = useDispatch();
    const lekharpokaCategory = useSelector(state => state.category.lekharpokaCategory);
    const userUuid = useSelector(state => state.usersession.userUuid);
    const router = useRouter();

    const { selectedIteam, handleKeyDown, setSelectedIteam, searchAreaRef, setIsSearchbarActive, isSearchbarActive, setSearchResult, searchKey, setSearchKey } = useContext(SearchContext)
    const { setUser, userImage } = useContext(UserContext)

    const [selectedNav, setSelectedNav] = useState("");
    const [postList, setPostList] = useState(null);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    // ------
    const dialogueRef = useRef()
    const popupRef1 = useRef(null);
    const popupRef2 = useRef(null);
    const searchBarRef = useRef(null);
    useOutsideAlerter(popupRef1);
    useOutsideAlerter(popupRef2);

    useOutsideAlerterSearch(searchAreaRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisibleItem(null)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function useOutsideAlerterSearch(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    useEffect(() => {

        const fetchUserPhoto = async () => {
            try {
                const response = await fetch(`${apiBasePath}/getprofilepic/${userUuid}`);
                const data = await response.json();
                console.log('user image in navbar --', data.image)
                setUser({ userImage: `${apiBasePath}/${data.image?.slice(data.image?.indexOf('/') + 1)}` })
                //console.log( "------------------->>>> POST LIST ------------------>>>>>>>",postList );
            } catch (error) {
                // alert("Error Fetching data");
            }
        };
        if (userUuid) {
            fetchUserPhoto();

        }

    }, [userUuid])


    useEffect(() => {

        async function fetchDataAsync() {
            try {
                const result = await fetchData(`${apiBasePath}/categories`);
                console.log('Navbar ------- category ---', result)
                dispatch(categoryActions.addLekharPokaCategory(result))
            } catch (error) {
                alert(error)
            }
        }

        fetchDataAsync();

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



    //  search ---
    const handleChange = (e) => {
        // setSearch(e.target.value);
        setSearchKey(e.target.value);
    };
    const handleKeyDown1 = (e) => {
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
                // window.open(searchData[selectedIteam]?.link);
                // setSearch('')
                setSearchKey('')
                router.push(`/post/${searchData[selectedIteam]?._id}`)

            }
        } else {
            setSelectedIteam(-1);
        }
    };
    const handleClose = () => {
        setSearch("");
        setSearchKey('')
        setSearchData([]);
        const data = [];
        setSearchResult(data)
        setSelectedIteam(-1);
    };



    useEffect(() => {
        if (searchKey !== "") {

            try {
                const newFiltreddata = postList.filter((post) => {
                    return post.title
                        .toLocaleLowerCase()
                        .includes(searchKey.toLocaleLowerCase());
                });
                setSearchData(newFiltreddata);
                setSearchResult(newFiltreddata)
            } catch (error) { }
        } else {
            setSearchData([]);
            const data = [];
            setSearchResult(data)
        }
    }, [searchKey]);


    function goToSearchPost(id) {
        // setSearch("");
        setSearchKey('')
        setSearchData([]);
        setSelectedIteam(-1);
        const data = [];
        setSearchResult(data)
        router.push(`/post/${id}`)
        // router.refresh()
    }


    //   logout

    function Logout() {
        dialogueRef.current.showModal();
    }


    return (
        <>
            <div className="fixed w-full bg-white z-[99]">
                <header className="header shadow-md">
                    {/* Logo */}
                    <DialugueModal ref={dialogueRef} alert='আপনি কি লগআউট করতে চান' address={`/account/login`} type='logout' />

                    <div className="container">
                        <div className="row-span-12">
                            <div className="header-innr">
                                <div className="logo">
                                    <Link onClick={() => setSelectedNav('procchod')} href="/">
                                        <Logo
                                            icon="/images/svgs/lekhapokaBlack.svg"
                                            width={200}
                                            height={92}
                                            alt="LekhaPoka logo"
                                        />
                                    </Link>
                                </div>
                                <div className={`flex justify-between items-center text-black lg:text-[16px] md:text-[11px] sm:text-[11px] xs:text-[11px] pt-1  place-content-center `}>

                                    <div ref={searchAreaRef} className="search__bar relative flex flex-row place-content-center">
                                        <Image
                                            src="/images/svgs/search.svg"
                                            height={50}
                                            width={50}
                                            alt=""
                                            className={` cursor-pointer`}
                                            onClick={() => setIsSearchbarActive(true)}
                                        />

                                        {isSearchbarActive && (
                                            <input
                                                type="text"
                                                className={` lg:w-[200px] md:w-[200px] sm:w-[150px] sx:w-[150px] text-[12px]  bg-transparent text-black py-2 pr-10 rounded-md focus:outline-none`}
                                                placeholder=" অনুসন্ধান..."
                                                autoComplete="off"
                                                onChange={handleChange}
                                                value={searchKey}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                        )}
                                        {/* <div
                                            className={`search_result ${setIsSearchbarActive ? "visible" : "hidden"
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
                                        </div> */}


                                        {isSearchbarActive && (

                                            <button
                                                className='lg:px-[15px] md:px-[15px] sm:px-[10px] xs:px-[10px]'
                                                onClick={() => setIsSearchbarActive(false)}
                                            >
                                                <i class="ri-list-check"></i>
                                            </button>

                                        )}
                                    </div>
                                    <div className="hambar__icon" onClick={toggleMenu}>
                                        <i class="ri-menu-line"></i>
                                        {/* <img src="/public/images/navbaricon/list.svg"/> */}
                                    </div>


                                    <div className={`sidebar pl-[11px]`} ref={menuRef}>


                                        <ul className={`flex flex-row lg:space-x-[15px] text-center sm:space-x-2 xs:space-x-[0px] kangsa-font transition-all ease-in-out duration-2000`}>
                                            <li
                                                onClick={() => { setSelectedNav("procchod"); closeMenu(); }}
                                                className={`hover:text-[#F9A106] ${selectedNav === "procchod"
                                                    ? "text-[#F9A106] font-semibold  underline"
                                                    : ""
                                                    }`}
                                            >
                                                <Link href="/">প্রচ্ছদ</Link>
                                            </li>
                                            <li className={`relative cursor-pointer`} onClick={() => { toggleVisibility(0); setSelectedNav("soblekha"); }}>
                                                <button
                                                    className={`hover:text-[#F9A106] ${selectedNav === "soblekha"
                                                        ? "text-[#F9A106] font-semibold border-b-[2px] border-[#F9A106]"
                                                        : "text-black"
                                                        }`}
                                                    >সব লেখা <span style={{ position: 'relative', top: '-1px' }}><i class="ri-arrow-down-s-line"></i></span></button>
                                                {/* <FontAwesomeIcon icon={faAngleDown} className="ml-2 pt-1 lg:h-5 lg:w-5 md:h-5 md:w-5 sm:h-4 sm:w-4 xs:h-4 xs:w-4 focus:text-[#F9A106]" /> */}
                                                {visibleItem === 0 && (
                                                    <ul ref={popupRef1}
                                                        className='absolute lg:text-[16px] sm:text-[13px]
                                                    lg:backdrop-blur-md md:backdrop-blur-md  
                                                     lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none 
                                                     lg:bg-[#FCF7E8] md:bg-[#FCF7E8] sm:bg-transparent xs:bg-transparent !z-[999999] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2 w-56 rounded-md  ring-opacity-5 focus:outline-none'>
                                                        {
                                                            lekharpokaCategory?.map((category, index) => <>
                                                                <li
                                                                    key={category._id}
                                                                    className="block px-4 py-2  hover:bg-[#F9A106]  hover:text-white"
                                                                    onClick={() => {dispatch(categoryActions.selectNavbarCategory(category.title)) ;closeMenu(); }}

                                                                >
                                                                    <Link className='block' href={`/category/${category.title}`}>{category.title}</Link>
                                                                </li>
                                                                {index <= (lekharpokaCategory.length - 1) && <hr className='lg:block md:hidden sm:hidden xs:hidden' /> }
                                                            </>)
                                                        }

                                                    </ul>
                                                )}
                                            </li>
                                            <li onClick={() => { setSelectedNav("audiobook"); closeMenu(); }}
                                                className={`hover:text-[#F9A106] ${selectedNav === "audiobook"
                                                    ? "text-[#F9A106] font-semibold  underline"
                                                    : ""
                                                    }`}
                                            >
                                                <Link href="/audiobook">অডিও বুক</Link>
                                            </li>
                                            {/* <li onClick={() => { setSelectedNav("zogazog"); closeMenu(); }}
                                                className={`hover:text-[#F9A106] ${selectedNav === "zogazog"
                                                    ? "text-[#F9A106] font-semibold  underline"
                                                    : ""
                                                    }`}
                                            >
                                                <Link href="/contacts">যোগাযোগ</Link>
                                            </li> */}
                                            <li
                                                onClick={() => { setSelectedNav("amader_somporke"); closeMenu(); }}
                                                className={` lg:w-[130px] sm:w-[100px] hover:text-[#F9A106] ${selectedNav === "amader_somporke"
                                                    ? "text-[#F9A106] font-semibold  underline"
                                                    : ""
                                                    }`}
                                            >
                                                <Link href="/aboutus">আমাদের সম্পর্কে</Link>
                                            </li>

                                            {
                                                userUuid ?
                                                    <li
                                                        className='relative cursor-pointer -mt-[5px]'
                                                        onClick={() => toggleVisibility(2)}>
                                                        {userImage?.length > 0 ? <img src={userImage} alt={userImage} className='h-[35px] w-[35px] rounded-full' /> :
                                                            <img src='/images/user/deafultProfile.png' alt='profile pic' className='h-[35px] w-[35px] rounded-full' />}

                                                        {visibleItem === 2 && (
                                                            <ul ref={popupRef1} className='absolute lg:text-[16px] sm:text-[13px] lg:backdrop-blur-md md:backdrop-blur-md  lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none lg:bg-[#FCF7E8] md:bg-[#FCF7E8] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2 w-56 rounded-md  ring-opacity-5 focus:outline-none'>
                                                                <li
                                                                    className="block cursor-pointer px-4 py-2 hover:bg-[#F9A106]  hover:text-white"
                                                                    onClick={() => closeMenu()}

                                                                >
                                                                    <Link className='block' href="/user/createpost">লিখুন</Link>
                                                                </li>

                                                                <hr className='lg:block md:hidden sm:hidden xs:hidden' />

                                                                <li
                                                                    className="block cursor-pointer px-4 py-2 hover:bg-[#F9A106]  hover:text-white"
                                                                    onClick={() => closeMenu()}

                                                                >
                                                                    <Link className='block' href={`/user/${userUuid}`}>প্রোফাইল</Link>
                                                                </li>
                                                                <hr className='lg:block md:hidden sm:hidden xs:hidden' />


                                                                <li
                                                                    className="block cursor-pointer px-4 py-2   hover:bg-[#F9A106]  hover:text-white"
                                                                    onClick={() => closeMenu()}

                                                                >
                                                                    <button className=' w-full text-center' onClick={Logout}>লগ আউট</button>
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </li> :
                                                    <li>
                                                        <button className="text-[25px]" onClick={() => router.push('/account/login')}><i class="ri-account-circle-fill"></i></button>
                                                    </li>
                                            }
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
