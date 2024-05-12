'use client'
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ProfileDropDown = ({ options, selected, onSelect, lebel, sobClass }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogOut, setisLogOut] = useState(false)
  const dropdownRef1 = useRef(null); // Ref to hold the dropdown element

  const handleClickOutside = (event) => {
    if (isOpen && dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = (event) => {
    setIsOpen(!isOpen);
    event.stopPropagation(); // Prevent bubbling
  };

  const handleSelect = (option) => {
    onSelect && onSelect(option);  // Call optional onSelect prop
    setIsOpen(false);

    if (option.action) {
      try {
        const confirmLogout =  window.confirm('Do you really want to log out?');
        if (confirmLogout) {
          // alert('Logging out...'); 
          localStorage.removeItem("status");
          localStorage.removeItem("name");
          localStorage.removeItem("uuid");
          localStorage.removeItem("phone");
          localStorage.removeItem("token");
          localStorage.removeItem("usertype");
          localStorage.removeItem("email");
          
          // setStatus("");
            setisLogOut(true)

          router.push('/account/login');
        }
      } catch (error) {
        console.error('Error displaying confirmation dialog:', error);
      }
    } else {
      router.push(option.path); 
    }
  };



  // Add event listener on document click only when isOpen is true
  useEffect(() => {
    if (isOpen) {
      const listener = document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', listener); // Cleanup
    }
  }, [isOpen]); // Only add/remove listener when isOpen changes

  return (
    <div className="relative inline-block lg:text-left md:text-left sm:text-center">
      <button
        type="button"
        onClick={toggleDropdown}
        className={` ${sobClass} inline-flex w-[80px] justify-center  px-2  bg-transparent font-medium  focus:outline-none focus:text-[#F9A106]`}
        aria-haspopup="true"
      >
        {/* {lebel} */}
        <img src='/images/user/deafultProfile.png' alt='profile pic' className='h-[35px] w-[35px] rounded-full'/>
        {/* <FontAwesomeIcon icon={faAngleDown} className="ml-2 pt-1 lg:h-5 lg:w-5 md:h-5 md:w-5 sm:h-4 sm:w-4 xs:h-4 xs:w-4 focus:text-[#F9A106]" /> */}
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef1} // Store dropdown element in ref
          className="lg:backdrop-blur-md md:backdrop-blur-md  lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none lg:bg-[#F9A106] md:bg-[#F9A106] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2 w-56 rounded-md  ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              className="block cursor-pointer px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"
              key={option.value}
              role="menuitem"
              tabIndex={-1}
              id={`menu_iteam${index}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileDropDown;
