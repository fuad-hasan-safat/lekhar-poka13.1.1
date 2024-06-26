"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SigninFormAterOTP({ logreg, btntext, phonenumber }) {

    const router = useRouter()

    const [state, setState] = useState({
        fullName: '',
        password: '',
        retypePassword: '',
        error: null,
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

        }));

    };



    const validate = () => {

        let isValid = true;
        setState((prevState) => ({ ...prevState, error: null }));


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

        setState((prevState) => ({ ...prevState, isDisabled: !isValid }));
    };

    const handleSubmit = async () => {

        validate();

        if (!state.isDisabled) {

            try {
                const response = await axios.post(`${apiBasePath}/register`, {

                    name: state.fullName,
                    phone: `${numberPrefix}${phonenumber}`,
                    password: state.password,
                    usertype: "user",

                });

                alert('আপনার রেজিস্ট্রেশন সম্পূর্ণ হয়েছে। অনুগ্রহ করে লগইন করুন।')

                router.push(`/account/login`)

            } catch (error) {

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
                            placeholder="আপনার নাম দিন"
                            value={state.fullName}
                            onChange={numberhandleChange}
                            className=" h-[62px] p-4 bg-[#FCF7E8] rounded-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />

                    </div>

                    <div className="mb-5 relative">

                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="পাসওয়ার্ড দিন"
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
                            placeholder="আবার পাসওয়ার্ড দিন"
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
                        className="page__common__yello__btn mt-8 px-[90px] bg-[#F9A106] rounded-full text-[35px] text-white h-[75px] "
                    >
                        {btntext}
                    </button>

                </div>

            </div>
        </>
    );
}