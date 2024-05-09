"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const PostDropDown = ({ sobClass, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [soblekhaSelect, setSoblekhaSelect] = useState('পোস্ট');

  useEffect(() => {
    sobClass = 'text-[#F9A106] font-semibold underline';
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      setSoblekhaSelect('পোস্ট');
    };
  }, []);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block lg:text-left md:text-left sm:text-center" ref={dropdownRef}>
      <button
        type="button" 
        onClick={toggleDropdown}
        className={`${sobClass} hdr__dropdown__menu inline-flex w-[110px] justify-center  px-2  bg-transparent font-medium  focus:outline-none focus:text-[#F9A106]`}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}

      >
        {soblekhaSelect}
        <FontAwesomeIcon icon={faAngleDown} className="ml-2 pt-1 lg:h-5 lg:w-5 md:h-5 md:w-5 sm:h-4 sm:w-4 xs:h-4 xs:w-4 focus:text-[#F9A106]" />
      </button>

      {isOpen && (
        <div className="
        lg:backdrop-blur-md md:backdrop-blur-md  
        lg:shadow-xl md:shadow-xl sm:shadow-none xs:shadow-none 
        lg:bg-[#F9A106] md:bg-[#F9A106] sm:bg-transparent xs:bg-transparent z-[1000] origin-top-right lg:absolute md:absolute sm:static xs:static right-0 mt-2  rounded-md  ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu" tabIndex={-1}>
          <div className="text-black" role="none">
            <Link
              href="/user/alluserpost"
              className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="options-menu-item-0"
              onClick={() => { setSoblekhaSelect('পোস্ট'); closeMenu(); }}
            >
              সকল 
            </Link>
            <Link
              href="/user/createpost/"
              className="block px-4 py-2 text-sm  hover:bg-white  hover:text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="options-menu-item-1"
              onClick={() => { setSoblekhaSelect('পোস্ট'); closeMenu(); }}
            >
              লিখুন 
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default PostDropDown;
