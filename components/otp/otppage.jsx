import LoginReg from "@/components/common/loginform";
import LoginSignInOtpLeftPartDesign from "../common/login-signup-otp-left-design";
import { arial } from "../fonts/arial";
import SignInOption from "../signInOption/SignInOption";
import DropDown from "../common/dropDown";

const OtpPage = () => {
    return (
        <>
            <div className={`flex ${arial.variable} font-arial`}>
                <div className="flex flex-row h-[832px]  w-[1280px] bg-[#FCF7E8] shadow-md">
                    {/* left part */}
                    <div className=" w-[640px]   ">
                        <LoginSignInOtpLeftPartDesign />
                    </div>
                    {/* right part */}
                    <div className="relative w-[640px]  bg-white rounded-l-[46px] text-black grid place-items-center ">
                        <div className="grid place-items-center">
                            <div className="grid place-items-center pt-28">
                                <h1 className=" text-black text-5xl mb-[40px]">OTP Verification</h1>
                                <p className="text-gray-500">We Will send you a one time password on</p>
                                <p className="text-gray-500"> on this <span className="font-semibold">Mobile Number</span></p>
                                <p className="text-gray-500 font-semibold pt-4">+91 - 12989200823</p>
                            </div>
                            <div className="flex flex-row space-x-6 mt-[70px] mb-[70px] text-3xl font-semibold text-gray-700">
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
                                <div className="flex flex-col">
                                    <button
                                        className=" bg-[#F9A106] rounded-full text-[35px] text-white w-[368px] h-[70px] "
                                    >
                                        Verify
                                    </button>
                                    <a className="pl-60 pt-2 text-gray-400 font-semibold text-sm" href='#'>Do not get OTP?</a>
                                </div>
                            </div>
                            <div className="pt-32">
                                <SignInOption

                                    lowermessege1="Already Have Account? "
                                    lowermessege2="Log In"
                                    signLogLink="\login"
                                />
                            </div>

                        </div>
                        <div className="absolute top-7 right-0 pr-2">
                            <DropDown />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtpPage;
