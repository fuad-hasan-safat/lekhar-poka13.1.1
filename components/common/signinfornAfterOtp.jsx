"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SigninFormAterOTP({ logreg, btntext, phonenumber }) {

    const router = useRouter()

    const [state, setState] = useState({
        fullName: '',
        password: '',
        retypePassword: '',
        error: null,
        isDisabled: true, // Button initially disabled
    });

    let notification = '';
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


    function reloadPage(){
        setTimeout(()=>{
            router.push(`/account/login`)
      
        }, 1000)
      }


      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
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

                // alert('আপনার রেজিস্ট্রেশন সম্পূর্ণ হয়েছে। অনুগ্রহ করে লগইন করুন।')
                notification = 'আপনার রেজিস্ট্রেশন সম্পূর্ণ হয়েছে। অনুগ্রহ করে লগইন করুন।';
                notify1();

                reloadPage()
                
            } catch (error) {

                // alert('আপনি আগে থেকেই সাইন আপ করেছেন');
                notification = 'আপনি আগে থেকেই সাইন আপ করেছেন';
                notify()
            }
        }
    };


    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    
      });
    
      const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    
      });

    return (
        <>
            <div className="login__form__dsc">

                <div className="lg:text-[48px] text-left md:text-[45px] sm:text-[35px] xs:text-[32px] mb-5  font-semibold ">
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
                            onKeyDown={handleKeyDown}
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
                        className="page__common__yello__btn mt-8 px-[90px] bg-[#F9A106] rounded-[8px] lg:text-[35px] md:text-[30px] sm:text-[25px] xs:text-[25px] text-white h-[75px] "
                    >
                        {btntext}
                    </button>

                </div>

            </div>
            <ToastContainer />

        </>
    );
}