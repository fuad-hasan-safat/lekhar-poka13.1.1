'use client'
import React, { useEffect, useState } from "react";
import LoginReg from '../common/loginform'
import LoginSignInOtpLeftPartDesign from '../common/login-signup-otp-left-design'
import SignInOption from "../signInOption/SignInOption";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../common/loading";

const LoginPage = ({ url = '/' , setIsLoggedIn =  () => {}}) => {


  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.usersession.isLoggedIn);
  const [loggedInUserId, setLoggedInUserId] = useState(null)
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userId') || null;
    // console.log('logged in user in profile -->', loggedInUser)
    setLoggedInUserId(loggedInUser);
  }, [isLoggedIn])



  useEffect(() => {
    if (isLoggedIn || loggedInUserId) {
      console.log({ url })
      router.replace(url);
    }

    setisLoading(false);


  }, [loggedInUserId])

  if (isLoading) {
    return <Loading />
  }
  else {
    return (
      <>
        <section className="login__form__sec__wrp clearfix">

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="login__form__wrap flex flex-row bg-[#FCF7E8] shadow-md">

                  <div className="login__form__left">
                    <LoginSignInOtpLeftPartDesign />
                  </div>

                  <div className="login__form__right relative bg-white rounded-l-[46px] text-black grid place-items-center ">

                    <div className="w-full">
                      <LoginReg 
                      logreg="লগইন করুন" 
                      btntext="লগইন" 
                      setIsLoggedIn={setIsLoggedIn}
                      url={url}/>

                      <SignInOption
                        title="অথবা সাইন ইন করুন"
                        icon1="/images/loginOptionIcon/google.svg"
                        lowermessege1="একাউন্ট নেই? "
                        lowermessege2="একাউন্ট তৈরী করুন"
                        signLogLink="/account/signup"
                      />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

};

export default LoginPage;
