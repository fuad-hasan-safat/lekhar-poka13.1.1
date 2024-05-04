"use client";
import { ChangeEvent, useEffect, useState } from "react";

import axios, { AxiosError } from "axios";
import SignInOption from '../../signInOption/SignInOption'
 import { apiBasePath } from "../../../utils/constant";
import { useRouter } from "next/navigation";
import Divider from '../../common/sidebardivider';
import LogoutButton from '../../common/logoutButton'
import GoToProfile from "../../common/gotoprofilebutton";


export default function Login() {


  const router = useRouter();

  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [error, setError] = useState(null); 
  const [numberPrefix, setNumberPrefix] = useState('88');


  const handleNumberhange = (e) => {
    // Allow only numbers and backspace key
    const newValue = e.target.value.replace(/[^0-9\b]/g, "");
    // Enforce maximum length of 11 digits
    if (newValue.length > 11) {
      setError("Phone number cannot exceed 11 digits.");
      return;
    }
    // Enforce starting with "01"
    if (newValue.length > 1 && newValue.slice(0, 2) !== "01") {
      setError("Phone number must start with 01.");
      return;
    }
    setnumber(newValue);
    setError(null); // Clear error if valid input
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  async function submitLogin() {
    console.log("Calling submitLogin><><><<<<<<<<<>>>>>>>>>>>>>>>>>");
    console.log(`${numberPrefix}${number}`);
    try {
      const response = await axios.post(
        `${apiBasePath}/login`,
        {
          phone: `${numberPrefix}${number}`,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      console.log('side ------------------------- log in response message---------------->>>>>>', response)



      if (response.data.status === 'success') {
        const data = await response.data;
        console.log(data);
        setStatus(data.status);
        setUserUuid(data.uuid);
        setUser(data);
        localStorage.setItem("status", data.status);
        localStorage.setItem("name", data.name);
        localStorage.setItem("uuid", data.uuid);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("usertype", data.usertype);
        localStorage.setItem("phone", data.phone);

          console.log(apiBasePath, data.usertype)
        setnumber("");
        setPassword("");
        router.refresh()
      }
      else if(response.data.status === "failed"){
        alert(' সঠিক নাম্বার দিন ')
      }
      
    
    } catch (error) {
      // console.log("inside catch ----------------", error);
      alert('সঠিক পাসওয়ার্ড দিন');
    }
  }

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
  }, []);

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
    setUsername(localStorage.getItem("name") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
  }, [status]);

  return (
    <>
      {status === 'success' ? (
        <>
          <div className="flex flex-col items-center">
            <div className="text-black text-xl mb-4">
               {username} , লেখার পোকায় আপনাকে স্বাগতম
            </div>
            <div className="flex flex-row space-x-3 text-[18px]">
              <LogoutButton
                buttonText="Logout"
                buttonClass="text-white rounded-[6px] bg-[#F9A106] w-[120px] h-[40px]"
                setStatus={setStatus}
              />
              <GoToProfile
                buttonText="Your Profile"
                buttonClass="text-white rounded-[6px] bg-[#F9A106] w-[180px] h-[40px]  "
                id={userUuid}
              />
            </div>
            <Divider />
          </div>
        </>
      ) : (
        <div>
          <div>
            <div className="text-[20px] text-yellow-500 h-[28px]  pt-5 pb-[28px]">
              লগইন
            </div>
            <div className="mb-3  pt-4">
              <input
                className="border rounded-lg w-full h-[43px] text-[14px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phonenumber"
                type="number"
                placeholder="মোবাইল নাম্বার দিন ০১-xxxxxxxxx"
                required
                onChange={handleNumberhange}
                value={number}
              />
              {error && <p className="error text-red-500">{error}</p>}
            </div>
            <div className="">
              <input
                className="border rounded-lg w-full h-[43px] text-[14px] py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="পাসওয়ার্ড দিন"
                required
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <a
              className="pt-[12px] float-right mb-[15px] inline-block align-baseline font-bold text-xs text-gray-600 hover:text-black-800"
              href="/account/recoverpassword"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
            <div className="">
              <button
                className=" mb-8 w-full h-[43px] text-[16px] bg-[#F9A106] hover:bg-yellow-700 text-white  py-2 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={submitLogin}
              >
                লগইন করুন
              </button>
            </div>

            <SignInOption
              title="অথবা সাইন ইন করুন"
              icon1="/images/loginOptionIcon/google.svg"
              icon2="/images/loginOptionIcon/facebook_squre.svg"
              icon3="/images/loginOptionIcon/apple.svg"
              lowermessege1="একাউন্ট নেই? "
              lowermessege2="একাউন্ট তৈরী করুন ।"
              signLogLink="/account/signup"
              classProperty=" flex shadow-primary-1 w-[70px] h-[47px] items-center justify-center"
            />
          </div>
          <Divider />
        </div>
      )}
    </>
  );
}
