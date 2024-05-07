import LoginSignInOtpLeftPartDesign from "../common/login-signup-otp-left-design";
import SignInOption from "../signInOption/SignInOption";
import DropDown from "../common/dropDown";

const OtpPage = () => {
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
                              <div className="w-full">
                                <div className="grid place-items-center lg:pt-28 md:pt-26 sm:pt-20 xs:pt-15">
                                    <h1 className=" text-black lg:text-5xl md:text-4xl sm:text-4xl xs:text-3xl lg:mb-[40px] md:mb-[40px] sm:mb-[30px] xs:mb-[20px]">OTP Verification</h1>
                                    <p className="text-gray-500">We Will send you a one time password on</p>
                                    <p className="text-gray-500"> on this <span className="font-semibold">Mobile Number</span></p>
                                    <p className="text-gray-500 font-semibold pt-4">+91 - 12989200823</p>
                                </div>
                                <div className="flex justify-center flex-row space-x-6 lg:mt-[70px] lg:mb-[70px] md:mt-[60px] md:mb-[60px] sm:mt-[50px] sm:mb-[50px] xs:mt-[30px] xs:mb-[20px] text-3xl font-semibold text-gray-700">
                                    <input
                                        type="text"
                                        className="w-[51px] h-[65px] border-solid  bg-gray-100 rounded-xl text-center"
                                    >
                                    </input>
                                    <input
                                        type="text"
                                        className="w-[51px] h-[65px] border-solid  bg-gray-100 rounded-xl text-center"
                                    >
                                    </input>
                                    <input
                                        type="text"
                                        className="w-[51px] h-[65px] border-solid  bg-gray-100 rounded-xl text-center"
                                    >
                                    </input>
                                    <input
                                        type="text"
                                        className="w-[51px] h-[65px] border-solid  bg-gray-100 rounded-xl text-center"
                                    >
                                    </input>
                                </div>
                                <div>
                                    <div className="flex justify-center items-center flex-col">
                                        <button
                                            className=" login__btn mt-8 px-5 bg-[#F9A106] rounded-full lg:text-[35px] md:text-[34px] sm:text-[33px] xs:text-[30px] text-white lg:h-[75px] md:h-[70px] sm:h-[65px] xs:h-[60px]"
                                        >
                                            Verify
                                        </button>
                                        <a className="lg:pl-60 md:pl-50 sm:pl-40 xs:pl-10 pt-2 text-gray-400 font-semibold text-sm" href='#'>Do not get OTP?</a>
                                    </div>
                                </div>
                                <div className="lg:pt-32 md:pt-28 sm:pt-25 xs:pt-22">
                                    <SignInOption
                                        lowermessege1="Already Have Account? "
                                        lowermessege2="Log In"
                                        signLogLink="\login"
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
            </div>
         </section>
        </>
    );
};

export default OtpPage;
