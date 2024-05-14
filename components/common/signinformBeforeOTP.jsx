"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpPage from "../otp/otppage";


export default function SigninFormBeforeOTP({type, logreg, btntext, SetIsOtpSucess, setState, state , otpStatus, setOtpStatus, otpProp}) {
    const router = useRouter()


    const [numberPrefix, setNumberPrefix] = useState('88');
    const [showPassword, setShowPassword] = useState(false);
    const [reshowPassword, setReShowPassword] = useState(false);



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglerePasswordVisibility = () => {
        setReShowPassword(!reshowPassword);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };

    const numberhandleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
            // Validate phone number on every change for inline error display
            phoneError: validateMobileNumber(value) ? null : 'Mobile number is invalid.',
        }));

    };

    // validate phone number 
    // Validate phone number
    const validateMobileNumber = (mobileNumber) => {
        // Enforce exactly 11 digits after '01' using positive lookahead assertion
        const regex = /^01[ \-\d]{9}$/;
        return regex.test(mobileNumber);
    };

    const validate = () => {
        console.log(`--------------->>>>>>SSSS <span class="math-inline">\{numberPrefix\}</span>{state.password}`);
        let isValid = true;
        setState((prevState) => ({ ...prevState, error: null, phoneError: null }));

        if (!state.mobileNumber) {
            setState((prevState) => ({ ...prevState, phoneError: 'Mobile number is required.' }));
            isValid = false;
        } else if (!validateMobileNumber(state.mobileNumber)) {
            let errorMessage = 'Mobile number must start with 01 and be 11 digits long.';
            if (state.mobileNumber.length < 3) {
                errorMessage = 'Mobile number is too short.';
            } else if (state.mobileNumber.length > 11) {
                errorMessage = 'Mobile number is too long.';
            } else if (!state.mobileNumber.startsWith('01')) {
                errorMessage = 'Mobile number must start with 01.';
            }
            setState((prevState) => ({ ...prevState, phoneError: errorMessage }));
            isValid = false;
        }

        setState((prevState) => ({ ...prevState, isDisabled: !isValid })); // Enable button if all validations pass
    };

    const handleSubmitBeforeOTP = async () => {
        validate(); // Perform validation before submitting

        console.log({ state })

        if (!state.isDisabled) {

            if(type === 'recoveryPass'){
                console.log(' in re pass ------------')

                try {
                    const response = await axios.post(`${apiBasePath}/${otpProp}`, {
                        phone: `${numberPrefix}${state.mobileNumber}`,
                    });
                    // console.log(`full number ------>>> ${numberPrefix}`)
                    console.log('sigh up OTP Before ------>> ', response.data)
                    setOtpStatus(response.data.otp_status)
                    if(response.data.status === 'failed'){
                        alert('এই নাম্বার এ লগইন করা নেই ')
                        // SetIsOtpSucess(true)
                    }
                 
                    if(response.data.otp_status === "SENT"){
                        SetIsOtpSucess(true)
                    }
                    if(response.data.otp_status === "LIMIT_CROSSED"){
                    // SetIsOtpSucess(false)
                    alert('আপনি আজ ইতিমধ্যে ৩ বার চেষ্টা করেছেন');
                    SetIsOtpSucess(false)
                    }
                } catch (error) {
                    alert('এই ফোন নম্বর দিয়ে কোনো ব্যবহারকারী নিবন্ধিত নয়');

                }

            }else {

                try {
                    const response = await axios.post(`${apiBasePath}/${otpProp}`, {
                        phone: `${numberPrefix}${state.mobileNumber}`,
                    });
                    // console.log(`full number ------>>> ${numberPrefix}`)
                    console.log('sigh up OTP Before ------>> ', response.data)
                    setOtpStatus(response.data.otp_status)
                    if(response.data.status === 'success'){
                        // SetIsOtpSucess(true)
                    }
                 
                    if(response.data.otp_status === "SENT"){
                        SetIsOtpSucess(true)
                    }
                    if(response.data.otp_status === "LIMIT_CROSSED"){
                    // SetIsOtpSucess(false)
                    alert('আপনি আজ ইতিমধ্যে ৩ বার চেষ্টা করেছেন');
                    SetIsOtpSucess(false)
                    }
                } catch (error) {
                    console.error('Signup error:', error);
                    // Handle signup error (e.g., display error message)
                     alert('আপনি আগে থেকেই সাইন আপ করেছেন');
                }

            }

           
        }
    };


    return (
        <>
            <div className="login__form__dsc">

                <div className="text-[48px] mb-5  font-semibold text-yellow-500">
                    {logreg}
                </div>
                <div className="login__form__fleds w-full">
                    <div className="mb-4 ">

                    </div>
                    <div className="mb-4 ">

                        <input
                            id="phonenumber"
                            type="tel"
                            name="mobileNumber"
                            placeholder="ফোন নম্বর লিখুন (01-XXXXXXXXX)"
                            value={state.mobileNumber}
                            onChange={handleChange}
                            onBlur={validate}
                            className="h-[62px] p-4 bg-[#FCF7E8] rounded-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        {state.phoneError && state.mobileNumber && <p className="error text-red-500">{state.phoneError}</p>}
                    </div>


                    <button
                        onClick={handleSubmitBeforeOTP}
                        className=" mt-8 px-[90px] bg-[#F9A106] rounded-full lg:text-[35px] md:text-[30px] sm:text-[25px]  text-white lg:h-[75px] md:h-[70px] sm:h-[60px] xs:h-[55px] "
                    >
                        {btntext}
                    </button>

                </div>
            </div>
        </>
    );
}