"use client"
import LoginSignInOtpLeftPartDesign from "../common/login-signup-otp-left-design";
import SignInOption from "../signInOption/SignInOption";
import { useEffect, useState } from "react";
import SigninFormBeforeOTP from "../common/signinformBeforeOTP";
import OtpPage from "../otp/otppage";
import SigninFormAterOTP from "../common/signinfornAfterOtp";


const SignUpPageBeforeOTP = () => {


  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  // google login state start
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState('')
  const [isOtpSucess, SetIsOtpSucess] = useState(false)
  const [isOtpVarified, setIsOtpVarified] = useState(false)
  // save get otp status 
  const [otpStatus, setOtpStatus] = useState('')
  const [state, setState] = useState({
    fullName: '',
    mobileNumber: '',
    password: '',
    retypePassword: '',
    error: null,
    phoneError: null,
    isDisabled: true, // Button initially disabled
  });


  useEffect(() => {
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
                <div className="login__form__right bg-white rounded-l-[46px] text-black grid place-items-center ">
                  <div className="w-full">

                    {userUuid?.length > 0 ?
                      <>
                        <div>
                          <p className="text-black text-3xl">আপনি ইতিমধ্যেই লগইন করেছেন.<a href="/"> <span className="text-orange-500 cursor-pointer">প্রচ্ছদ পেজে যান </span></a></p>
                        </div>
                      </>
                      : <>

                        {!isOtpSucess && !isOtpVarified && <SigninFormBeforeOTP logreg="একাউন্ট তৈরি করুন" btntext="সাইন আপ" SetIsOtpSucess={SetIsOtpSucess} setState={setState} state={state} otpStatus={otpStatus} setOtpStatus={setOtpStatus} otpProp='send-otp' />}
                        {isOtpSucess && !isOtpVarified && <OtpPage phonenumber={state.mobileNumber} setIsOtpSuccess={SetIsOtpSucess} setIsOtpVerified={setIsOtpVarified} otpStatus={otpStatus} setOtpStatus={setOtpStatus} />}
                        {isOtpVarified && <SigninFormAterOTP logreg="একাউন্ট তৈরি করুন" btntext="সাইন আপ" phonenumber={state.mobileNumber} />} 

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


                      </>}

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

export default SignUpPageBeforeOTP;
