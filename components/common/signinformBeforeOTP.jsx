"use client";

import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastAction } from "../redux/toast-slice";

export default function SigninFormBeforeOTP({
  type,
  logreg,
  btntext,
  SetIsOtpSucess,
  setState,
  state,
  otpStatus,
  setOtpStatus,
  otpProp
}) {
  const dispatch = useDispatch();

  const [numberPrefix] = useState('88');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^01[ \-\d]{9}$/;
    return regex.test(mobileNumber);
  };

  const validateAndSubmit = async () => {
    let isValid = true;
    let errorMessage = '';

    if (!state.mobileNumber) {
      errorMessage = 'ফোন নাম্বার অবশ্যই দিতে হবে';
      isValid = false;
    } else if (!validateMobileNumber(state.mobileNumber.trim())) {
      errorMessage = 'ফোন নাম্বার ০১ দিয়ে শুরু এবং অবশ্যই ১১ অক্ষরের হবে';
      if (state.mobileNumber.trim().length < 3) {
        errorMessage = '১১ অক্ষরের ফোন নাম্বার দিন';
      } else if (state.mobileNumber.trim().length > 11) {
        errorMessage = '১১ অক্ষরের ফোন নাম্বার দিন';
      } else if (!state.mobileNumber.startsWith('01')) {
        errorMessage = 'ফোন নাম্বার ০১ দিয়ে শুরু করুন';
      }
      isValid = false;
    }

    setState((prevState) => ({
      ...prevState,
      phoneError: errorMessage,
      isDisabled: !isValid,
    }));

    if (!isValid) return;

    try {
      const response = await axios.post(`${apiBasePath}/${otpProp}`, {
        phone: `${numberPrefix}${state.mobileNumber.trim()}`,
      });

      console.log(response.data);
      setOtpStatus(response.data.otp_status);

      if (response.data.status === 'failed') {
        dispatch(toastAction.setWarnedNotification('এই নাম্বার এ লগইন করা নেই'));
      } else if (response.data.otp_status === "SENT") {
        dispatch(toastAction.setWarnedNotification('ওটিপি প্রেরণ করা হয়েছে'));
        SetIsOtpSucess(true);
      } else if (response.data.otp_status === "LIMIT_CROSSED") {
        dispatch(toastAction.setWarnedNotification('আপনি আজ ইতিমধ্যে ৩ বার চেষ্টা করেছেন'));
        SetIsOtpSucess(false);
      }
    } catch (error) {
      if(type === 'recoveryPass'){
        dispatch(toastAction.setWarnedNotification('এই ফোন নম্বর দিয়ে কোনো ব্যবহারকারী নিবন্ধিত নয়'));
      }else{
       dispatch(toastAction.setWarnedNotification('আপনি ইতিমধ্যে সাইন আপ করেছেন'));
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      validateAndSubmit();
    }
  };


  return (
    <>
      <div className="login__form__dsc">
        <div className="lg:text-[48px] md:text-[45px] sm:text-[35px] xs:text-[32px] lg:mb-[79px] md:mb-[73px] sm:mb-[40px] xs:mb-[35px] text-left font-semibold">
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
              onKeyDown={handleKeyDown}
              className="h-[62px] p-4 bg-[#FCF7E8] rounded-[8px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />

            {state.phoneError && state.mobileNumber && (
              <p className="error pt-[10px] text-black">{state.phoneError}</p>
            )}
          </div>

          <button
            onClick={validateAndSubmit}
            className="page__common__yello__btn mt-8 px-[90px] bg-[#F9A106] rounded-[8px] lg:text-[35px] md:text-[30px] sm:text-[25px] xs:text-[25px] text-white lg:h-[70px] md:h-[70px] sm:h-[60px] xs:h-[55px]"
            // disabled={state.isDisabled}
          >
            {btntext}
          </button>
        </div>
      </div>

    </>
  );
}
