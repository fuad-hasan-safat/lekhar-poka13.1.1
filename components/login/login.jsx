'use client'
import React from "react";
import LoginReg from '../common/loginform'
import LoginSignInOtpLeftPartDesign from '../common/login-signup-otp-left-design'
import SignInOption from "../signInOption/SignInOption";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const LoginPage = ({url = '/'}) => {
  const router = useRouter();
 const isLoggedIn = useSelector((state) => state.usersession.isLoggedIn);
 if(isLoggedIn){
  router.push('/')
 }
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
                        <LoginReg logreg="লগইন করুন" btntext="লগইন" url={url} />

                        <SignInOption
                          title="অথবা সাইন ইন করুন"
                          icon1="/images/loginOptionIcon/google.svg"
                          lowermessege1="একাউন্ট নেই? "
                          lowermessege2="একাউন্ট তৈরী করুন"
                          signLogLink="/account/signup"
                        />

                  </div>
                  {/* <div className="absolute top-7 right-0 pr-2">
                      <DropDown />
                    </div> */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
