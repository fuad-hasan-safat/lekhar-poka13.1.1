"use client"

import { apiBasePath } from "../../utils/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastAction } from "../redux/toast-slice";


export default function PassRecovertFormAterOTP({ phonenumber }) {

    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    let notification = ''
    const [numberPrefix, setNumberPrefix] = useState("88");

    const [state, setState] = useState({
        password: '',
        retypePassword: '',
        error: null,
        isDisabled: true, // Button initially disabled
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
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

            setState((prevState) => ({ ...prevState, error: 'পাসওয়ার্ড অবশ্যই দিতে হবে!' }));
            isValid = false;

        } else if (state.password.length < 8) {

            setState((prevState) => ({ ...prevState, error: 'পাসওয়ার্ড অবশ্যই ৮ অক্ষরের হতে হবে' }));
            isValid = false;

        }

        if (state.password !== state.retypePassword) {

            setState((prevState) => ({ ...prevState, error: 'পাসওয়ার্ড এক হয়নি!' }));
            isValid = false;

        }

        setState((prevState) => ({ ...prevState, isDisabled: !isValid })); // Enable button if all validations pass

        return isValid;
    };



    function reloadPage() {
        setTimeout(() => {
            router.push('/account/login')
        }, 1000)
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {

            handleUpdatePassword();
        }
    };

    const handleUpdatePassword = async () => {

        if (state.password.trim().length <= 0) {
            notification = 'দয়া করে পাসওয়ার্ড দিন';
            dispatch(toastAction.setWarnedNotification(notification))
            return;
        }

        const isValid = validate();


        if (isValid) {
            const data = {
                phone: numberPrefix + phonenumber,
                password: state.password
            };

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            try {
                const response = await fetch(`${apiBasePath}/changepassword`, options);

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const responseBody = await response.json();
                console.log("API response:", responseBody);

                // alert('পাসওয়ার্ড রিকভারি সফলভাবে সম্পন্ন হয়েছে, অনুগ্রহ করে লগইন করুন')
                notification = 'পাসওয়ার্ড রিকভারি সফলভাবে সম্পন্ন হয়েছে, অনুগ্রহ করে লগইন করুন';
                dispatch(toastAction.setSucessNotification(notification))

                reloadPage()

            } catch (error) {
                console.error("Error:", error);
            }

        }
    }

    return (
        <>
            <div className="login__form__dsc">

                <div className="lg:text-[48px] md:text-[45px] sm:text-[40px] xs:text-[30px] mb-5  font-semibold text-black text-left">
                    পাসওয়ার্ড রিসেট করুন
                </div>

                <div className="mb-5 relative">

                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="পাসওয়ার্ড দিন"
                        value={state.password}
                        onChange={handleChange}
                        onBlur={validate}
                        className="w-full h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button className="absolute right-[20px]  pt-[18px]" type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
                    </button>

                </div>

                <div className="mb-5 relative">

                    <input
                        type={showRePassword ? 'text' : 'password'}
                        name="retypePassword"
                        placeholder="আবার পাসওয়ার্ড দিন"
                        value={state.retypePassword}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={validate}
                        className="w-full h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button className="absolute right-[20px]  pt-[18px]" type="button" onClick={() => setShowRePassword(!showRePassword)}>
                        {showRePassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
                    </button>
                    {state.error && <p className="error">{state.error}</p>}

                </div>

                <button
                    type="form"
                    onClick={handleUpdatePassword}
                    className="login__btn mt-8 px-5 bg-[#F9A106] rounded-full lg:text-[35px] md:text-[34px] sm:text-[33px] xs:text-[25px] text-white lg:h-[75px] md:h-[70px] sm:h-[65px] xs:h-[60px]"
                >
                    আপডেট পাসওয়ার্ড
                </button>

            </div>
        </>
    );
}