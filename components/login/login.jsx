'use client'
import React, { useState, useEffect } from "react";
import LoginReg from '../common/loginform'
import LoginSignInOtpLeftPartDesign from '../common/login-signup-otp-left-design'
// import { arial } from "../fonts/arial";
import SignInOption from "../signInOption/SignInOption";
import DropDown from "../common/dropDown";

const LoginPage = () => {

  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [userToken, setUserToken] = useState("");
  



  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
  }, []);


  return (
    <>
      <section className="login__form__sec__wrp clearfix">

        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <div className="login__form__wrap flex flex-row bg-[#FCF7E8] shadow-md">
                  {/* left part */}
                  <div className="login__form__left">
                    <LoginSignInOtpLeftPartDesign />
                  </div>
                  {/* right part */}
                  <div className="login__form__right relative bg-white rounded-l-[46px] text-black grid place-items-center ">

                    <div className="login__form__dsc grid place-items-center ">
                      <LoginReg logreg="Log In" btntext="Log In" />
                      <SignInOption
                        title="Or Signup with"
                        icon1="/images/loginOptionIcon/google.svg"
                        icon2="/images/loginOptionIcon/facebook_squre.svg"
                        icon3="/images/loginOptionIcon/ig.svg"
                        lowermessege1="Don't have any account? "
                        lowermessege2="Create account."
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
