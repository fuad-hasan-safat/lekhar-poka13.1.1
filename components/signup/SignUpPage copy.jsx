"use client"
import LoginSignInOtpLeftPartDesign from "../common/login-signup-otp-left-design";
// import { arial } from "../fonts/arial";
import SignInOption from "../signInOption/SignInOption";
import DropDown from "../common/dropDown";
import SigninForm from "../common/signinfornAfterOtp";
import { useEffect, useState } from "react";
import Link from "next/link";

const SignUpPage = () => {

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  // google login state start
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState('')

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
                  <div className="w-full">
                    <SigninForm logreg="Create Account" btntext="Sign Up" />
                    <SignInOption
                      user={user}
                      setUser={setUser}
                      profile={profile}
                      setProfile={setProfile}
                      setStatus={setStatus}
                      setUsername={setUsername}
                      setUserUuid={setUserUuid}
                      setEmail={setEmail}
                      title="অথবা সাইন ইন করুন"
                      icon1="/images/loginOptionIcon/google.svg"
                      lowermessege1="একাউন্ট আছে? "
                      lowermessege2=" লগইন করুন ।"
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
