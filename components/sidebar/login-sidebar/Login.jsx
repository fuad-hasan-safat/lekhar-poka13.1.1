"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SignInOption from '../../signInOption/SignInOption'
import { apiBasePath } from "../../../utils/constant";
import { useRouter } from "next/navigation";
import Divider from '../../common/sidebardivider';
import { UserContext } from "../../lekharpokaStore/user-context";
import useTabSyncAuth from "../../../utils/useReloadUrl";
import { userSessionAction } from "../../redux/usersession-slice";
import { useDispatch, useSelector } from "react-redux";
import { toastAction } from "../../redux/toast-slice";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.usersession.isLoggedIn);

  const [loggedInUserId, setLoggedInUserId] = useState(null)

    useEffect(()=>{
      const loggedInUser = localStorage.getItem('userId') || null ;
      console.log('logged in user in profile -->', loggedInUser)
      setLoggedInUserId(loggedInUser);
    },[])

  const router = useRouter();
  const dispatch = useDispatch();

  const { setUser } = useContext(UserContext);
  const { triggerLogin } = useTabSyncAuth();

  let notification = ''

  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [numberPrefix, setNumberPrefix] = useState('88');
  const [showPassword, setShowPassword] = useState(false);
  // google login state start
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNumberhange = (e) => {

    const newValue = e.target.value.replace(/[^0-9\b]/g, "");

    if (newValue.length > 11) {
      setError("১১ ডিজিট এর বেশি গ্রহণযোগ্য নয়!");
      return;
    }

    if (newValue.length > 1 && newValue.slice(0, 2) !== "01") {
      setError("০১ দিয়ে নাম্বার শুরু হবে !");
      return;
    }

    setnumber(newValue);
    setError(null); // Clear error if valid input

  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function reloadPage() {
    setTimeout(() => {
      router.refresh()

    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitLogin();
    }
  };

  async function submitLogin() {

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


      if (response.data.status === 'success') {
        const data = await response.data;

        // Save user data to local storage
        localStorage.setItem('userId', data?.uuid);        // Save userId
        localStorage.setItem('userToken', data?.access_token); // Save userToken
        localStorage.setItem('userType', data?.usertype);   // Save userType

        dispatch(userSessionAction.addValidUser({
          isLoggedIn: true,
          userToken: data?.access_token,
          userUuid: data?.uuid,
          userName: data?.name,
          userType: data?.usertype,
          accountType: 'create with phone number',
        }));

        notification = 'সফলভাবে লগইন করেছেন';
        dispatch(toastAction.setSucessNotification(notification))

        const user = {
          userName: data.name,
          userUuid: data.uuid,
          userImage: data?.image,
          userToken: data.access_token,
          userType: data.usertype,
          isLoggedIn: true,
          isloggedOut: false,
        };

        setUser(user);
        triggerLogin();
        setnumber("");
        setPassword("");
      }
      else if (response.data.status === "failed") {
        // alert(' সঠিক নাম্বার দিন ')
        notification = 'সঠিক নাম্বার দিন';
        dispatch(toastAction.setWarnedNotification(notification));
      }


    } catch (error) {
      // alert('সঠিক পাসওয়ার্ড দিন');
      notification = 'সঠিক পাসওয়ার্ড দিন';
      dispatch(toastAction.setWarnedNotification(notification));
    }



  }

  const notify = () => toast.warn(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });

  const notify1 = () => toast.success(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });

  if (loggedInUserId?.length > 0) {
    return null;
  }

  if(isLoggedIn){
    return null;
  }

  return (
    <>
      <div>
        <div>

          <div className=" text-[20px] text-[#F9A106] font-semibold h-[28px]  pt-5 pb-[28px]">
            লগইন
          </div>

          <div className="mb-3  pt-4 w-full">
            <input
              className="border rounded-lg w-full h-[43px] text-[14px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phonenumber"
              type="tel"
              placeholder="মোবাইল নাম্বার দিন ০১-xxxxxxxxx"
              required
              onChange={handleNumberhange}
              value={number}
            />
            {error && <p className="error text-red-500 pt-[5px]">{error}</p>}
          </div>

          <div className="relative">

            <input
              className="border rounded-lg w-full h-[43px] text-[14px] py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="পাসওয়ার্ড দিন"
              required
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              value={password}
            />

            <button className="absolute right-[10px] text-gray-700  pt-[10px]" type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
            </button>

          </div>

          <a
            className="pt-[12px] float-right mb-[15px] inline-block align-baseline font-bold text-[14px] text-gray-600 hover:text-black-800"
            href="/account/recoverpassword"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </a>

          <div className="">
            <button
              className="page__common__yello__btn mb-8 w-full h-[43px] text-[16px] bg-[#F9A106] hover:bg-yellow-700 text-white  py-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={submitLogin}
            >
              লগইন করুন
            </button>
          </div>

          <SignInOption
            title="অথবা সাইন ইন করুন"
            icon1="/images/loginOptionIcon/google.svg"
            icon2='/images/loginOptionIcon/facebook_squre.svg'
            lowermessege1="একাউন্ট নেই? "
            lowermessege2="একাউন্ট তৈরী করুন"
            signLogLink="/account/signup"
          />
        </div>
        <Divider />
      </div>
    </>
  );
}
