"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


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
            phoneError: validateMobileNumber(value) ? null : 'Mobile number is invalid.',
        }));

    };

    const validateMobileNumber = (mobileNumber) => {

        const regex = /^01[ \-\d]{9}$/;
        return regex.test(mobileNumber);

    };

    const validate = () => {

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

        setState((prevState) => ({ ...prevState, isDisabled: !isValid })); 
    };

    const handleSubmitBeforeOTP = async () => {

        validate();

        console.log({ state })

        if (!state.isDisabled) {

            if(type === 'recoveryPass'){
                console.log(' in re pass ------------')

                try {
                    const response = await axios.post(`${apiBasePath}/${otpProp}`, {
                        phone: `${numberPrefix}${state.mobileNumber}`,
                    });
                   
                    setOtpStatus(response.data.otp_status)

                    if(response.data.status === 'failed'){

                        alert('এই নাম্বার এ লগইন করা নেই ')
                       
                    }
                 
                    if(response.data.otp_status === "SENT"){

                        SetIsOtpSucess(true)

                    }
                    if(response.data.otp_status === "LIMIT_CROSSED"){
                   
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
                    
                    console.log('sigh up OTP Before ------>> ', response.data)
                    setOtpStatus(response.data.otp_status)
                    if(response.data.status === 'success'){
                        // SetIsOtpSucess(true)
                    }
                 
                    if(response.data.otp_status === "SENT"){
                        SetIsOtpSucess(true)
                    }
                    if(response.data.otp_status === "LIMIT_CROSSED"){
                  
                    alert('আপনি আজ ইতিমধ্যে ৩ বার চেষ্টা করেছেন');
                    SetIsOtpSucess(false)

                    }
                } catch (error) {

                     alert('আপনি আগে থেকেই সাইন আপ করেছেন');
                }

            }

        }
    };


    return (
        <>
            <div className="login__form__dsc">

                <div className="text-[48px] mb-[79px] text-left font-semibold">
                    {logreg}
                </div>

                <div className="login__form__fleds w-full">


                    <div className="mb-4">

                        <input
                            id="phonenumber"
                            type="tel"
                            name="mobileNumber"
                            placeholder="ফোন নম্বর লিখুন (01-XXXXXXXXX)"
                            value={state.mobileNumber}
                            onChange={handleChange}
                            onBlur={validate}
                            className="h-[62px] p-4 bg-[#FCF7E8] rounded-[8px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />

                        {state.phoneError && state.mobileNumber && <p className="error text-red-500">{state.phoneError}</p>}

                    </div>

                    <button
                        onClick={handleSubmitBeforeOTP}
                        className="page__common__yello__btn mt-8 px-[90px] bg-[#F9A106] rounded-[8px] lg:text-[35px] md:text-[30px] sm:text-[25px]  text-white lg:h-[70px] md:h-[70px] sm:h-[60px] xs:h-[55px] "
                    >
                        {btntext}
                    </button>

                </div>

            </div>
        </>
    );
}