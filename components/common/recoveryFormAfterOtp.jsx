"use client"

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function PassRecovertFormAterOTP({ phonenumber }) {
    const router = useRouter()

    const [numberPrefix, setNumberPrefix] = useState("88");

    const [state, setState] = useState({
        password: '',
        retypePassword: '',
        error: null,
        isDisabled: true, // Button initially disabled
    });

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


    //  update password
    const handleUpdatePassword = async () => {

        validate(); // Perform validation before submitting

        const data = {
            phone: numberPrefix+phonenumber,
            password: state.password
          };

        const options = {
            method: "PUT", // Specify the HTTP method as POST
            headers: {
              "Content-Type": "application/json", // Set the content type for JSON data
            },
            body: JSON.stringify(data), // Convert data to JSON string for the body
          };
        
          try {
            const response = await fetch(`${apiBasePath}/changepassword`, options);
        
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
        
            const responseBody = await response.json();
            console.log("API response:", responseBody);
            // Handle the response data here, for example, update UI or store in state
            alert('পাসওয়ার্ড রিকভারি সফলভাবে সম্পন্ন হয়েছে, অনুগ্রহ করে লগইন করুন')
            router.push('/account/login')

          } catch (error) {
            console.error("Error:", error);
            // Handle errors here, for example, display an error message to the user
          }

    }

    return (
        <>
            <div className="login__form__dsc">
            <div className="text-[48px] mb-5  font-semibold text-yellow-500">
                    Recovery Password
                </div>

                <div className="mb-5">

                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        onBlur={validate}
                        className="w-[559px] h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />

                </div>
                <div className="mb-5">

                    <input
                        type="password"
                        name="retypePassword"
                        placeholder="Retype Password"
                        value={state.retypePassword}
                        onChange={handleChange}
                        onBlur={validate}
                        className="w-[559px] h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {state.error && <p className="error">{state.error}</p>}

                </div>
                <button
                    onClick={handleUpdatePassword}
                    className="login__btn mt-8 px-5 bg-[#F9A106] rounded-full lg:text-[35px] md:text-[34px] sm:text-[33px] xs:text-[30px] text-white lg:h-[75px] md:h-[70px] sm:h-[65px] xs:h-[60px]"
                >
                    Update Password
                </button>
            </div>
        </>
    );
}