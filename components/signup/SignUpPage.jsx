"use client"
import LoginSignInOtpLeftPartDesign from "../common/login-signup-otp-left-design";
// import { arial } from "../fonts/arial";
import SignInOption from "../signInOption/SignInOption";
import DropDown from "../common/dropDown";
import SigninForm from "../common/signinforn";
import { useEffect, useState } from "react";
import Link from "next/link";

const SignUpPage = () => {

  const [uuid, setUuid] = useState("");
  useEffect(() => {
    setUuid(localStorage.getItem("uuid") || "");
  }, [uuid]);


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
                  <div className="login__form__right bg-white rounded-l-[46px] text-black grid place-items-center ">
                    <div className="login__form__dsc grid place-items-center">
                      <SigninForm logreg="Create Account" btntext="Sign Up" />
                      <SignInOption
                        title="Or Signup with"
                        icon1="/images/loginOptionIcon/google.svg"
                        icon2="/images/loginOptionIcon/facebook_squre.svg"
                        icon3="/images/loginOptionIcon/ig.svg"
                        lowermessege1="Already Have Account? "
                        lowermessege2="Log In"
                        signLogLink="/account/login"
                      />
                    </div>

                  </div>
                  {/* <div className="absolute top-7 right-0 pr-2">
                    <DropDown />
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

};

export default SignUpPage;
