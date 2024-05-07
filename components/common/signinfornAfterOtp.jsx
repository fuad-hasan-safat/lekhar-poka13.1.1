"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SigninFormAterOTP({ logreg, btntext, phonenumber }) {
    const router = useRouter()
    const [state, setState] = useState({
        fullName: '',
        // mobileNumber: '',
        password: '',
        retypePassword: '',
        error: null,
        // phoneError: null,
        isDisabled: true, // Button initially disabled
    });

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
            // phoneError: validateMobileNumber(value) ? null : 'Mobile number is invalid.',
        }));

    };

    // validate phone number 
    // Validate phone number
    // const validateMobileNumber = (mobileNumber) => {
    //     // Enforce exactly 11 digits after '01' using positive lookahead assertion
    //     const regex = /^01[ \-\d]{9}$/;
    //     return regex.test(mobileNumber);
    // };

    const validate = () => {
        let isValid = true;
        setState((prevState) => ({ ...prevState, error: null }));

        // if (!state.mobileNumber) {
        //     setState((prevState) => ({ ...prevState, phoneError: 'Mobile number is required.' }));
        //     isValid = false;
        // } else if (!validateMobileNumber(state.mobileNumber)) {
        //     let errorMessage = 'Mobile number must start with 01 and be 11 digits long.';
        //     if (state.mobileNumber.length < 3) {
        //         errorMessage = 'Mobile number is too short.';
        //     } else if (state.mobileNumber.length > 11) {
        //         errorMessage = 'Mobile number is too long.';
        //     } else if (!state.mobileNumber.startsWith('01')) {
        //         errorMessage = 'Mobile number must start with 01.';
        //     }
        //     setState((prevState) => ({ ...prevState, phoneError: errorMessage }));
        //     isValid = false;
        // }

        if (!state.password) {
            setState((prevState) => ({ ...prevState, error: 'Password is required.' }));
            isValid = false;
        } else if (state.password.length < 8) {
            setState((prevState) => ({ ...prevState, error: 'Password must be at least 8 characters long.' }));
            isValid = false;
        }

        if (state.password !== state.retypePassword) {
            setState((prevState) => ({ ...prevState, error: 'Passwords do not match.' }));
            isValid = false;
        }

        setState((prevState) => ({ ...prevState, isDisabled: !isValid })); // Enable button if all validations pass
    };

    const handleSubmit = async () => {
        validate(); // Perform validation before submitting

        console.log({ state })

        console.log('After OTP phone number -------------------->>>>>>>>>', phonenumber)

        if (!state.isDisabled) {

            try {
                const response = await axios.post(`${apiBasePath}/register`, {
                    name: state.fullName,
                    phone: `${numberPrefix}${phonenumber}`,
                    password: state.password,
                    usertype: "user",
                });
                console.log(`full number ------>>> ${numberPrefix}`)
                console.log('sigh up ------>> ', response)
                // Handle successful signup response (e.g., redirect)
                alert('আপনার রেজিস্ট্রেশন সম্পূর্ণ হয়েছে। অনুগ্রহ করে লগিন করুন।')
                router.push(`/`)
            } catch (error) {
                console.error('Signup error:', error);
                // Handle signup error (e.g., display error message)
                alert('আপনি আগে থেকেই সাইন আপ করেছেন');
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

                        <input
                            id="username"
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={state.fullName}
                            onChange={numberhandleChange}
                            className=" h-[62px] p-4 bg-[#FCF7E8] rounded-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {/* <div className="mb-4 ">

                        <input
                            id="phonenumber"
                            type="number"
                            name="mobileNumber"
                            placeholder="Enter Phone Number (01-XXXXXXXXX)"
                            value={state.mobileNumber}
                            onChange={handleChange}
                            onBlur={validate}
                            className="h-[62px] p-4 bg-[#FCF7E8] rounded-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        {state.phoneError && state.mobileNumber && <p className="error text-red-500">{state.phoneError}</p>}
                    </div> */}
                    <div className="mb-5 relative">

                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                            onBlur={validate}
                            className="h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button className="absolute right-0 p-4" type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
                        </button>

                    </div>
                    <div className="relative">

                        <input
                            type={reshowPassword ? 'text' : 'password'}
                            name="retypePassword"
                            placeholder="Retype Password"
                            value={state.retypePassword}
                            onChange={handleChange}
                            onBlur={validate}
                            className=" h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button className="absolute right-0 p-4" type="button" onClick={togglerePasswordVisibility}>
                            {reshowPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
                        </button>
                        {state.error && <p className="error">{state.error}</p>}

                    </div>


                    <button
                        onClick={handleSubmit}
                        className=" mt-8 px-[90px] bg-[#F9A106] rounded-full text-[35px] text-white h-[75px] "
                    >
                        {btntext}
                    </button>

                </div>
            </div>
        </>
    );
}