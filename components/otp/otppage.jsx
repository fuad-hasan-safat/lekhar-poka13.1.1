import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { apiBasePath } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { toastAction } from "../redux/toast-slice";

const OtpPage = ({ otpProp, SetIsOtpSucess, phonenumber, setIsOtpVerified, setIsOtpSuccess, setOtpStatus, otpStatus }) => {


  let notification = ''
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {

    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendOtp();
    }
  };

  const sendOtp = async () => {

    const formattedPhoneNumber = `88${phonenumber}`;

    try {
      const response = await axios.post(`${apiBasePath}/verify-otp`, {
        otp: Number(otp.join("")),
        phone: formattedPhoneNumber,
      });

      if (response.data.status === "success") {
        setIsOtpVerified(true);
        setIsOtpSuccess(true);
      } else {
        // alert("ওটিপি সফলভাবে সম্পন্ন হয়নি");
        notification = 'ওটিপি সফলভাবে সম্পন্ন হয়নি'
        dispatch(toastAction.setWarnedNotification(notification));
      }
    } catch (error) {
      console.error("Otp Send Error:", error);
    }
  };

  const handleSendOtpAgain = async () => {
    const formattedPhoneNumber = `88${phonenumber?.trim()}`;
    console.log('before otp ', formattedPhoneNumber)


    try {
      const response = await axios.post(`${apiBasePath}/${otpProp}`, {
        phone: formattedPhoneNumber,
      });

      console.log('Resend otp response', response)

      setOtpStatus(response.data.otp_status)

      if (response.data.status === 'failed') {

        // alert('এই নাম্বার এ লগইন করা নেই ')
        notification = 'এই নাম্বার এ লগইন করা নেই ';
        dispatch(toastAction.setWarnedNotification(notification));
      }

      if (response.data.otp_status === "SENT") {
        notification = 'ওটিপি প্রেরণ করা হয়েছে';
        dispatch(toastAction.setSucessNotification(notification));

        SetIsOtpSucess(true)

      }
      if (response.data.otp_status === "LIMIT_CROSSED") {

        // alert('আপনি আজ ইতিমধ্যে ৩ বার চেষ্টা করেছেন');
        notification = 'আপনি আজ ইতিমধ্যে ৩ বার চেষ্টা করেছেন';
        dispatch(toastAction.setWarnedNotification(notification));
        SetIsOtpSucess(false)

      }
    } catch (error) {
      console.error('Signup error:', error);

    }

  }


  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Limit input to one character
    setOtp(newOtp);

    // Handle backspace and focus previous field
    if (value === '' && index > 0) {
      newOtp[index] = ''; // Clear current field value
      setOtp(newOtp);
      inputRefs.current[index - 1].focus(); // Focus previous field
    }

    if (newOtp.every((value) => value !== "")) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

    // Focus on the next field (unchanged logic)
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    console.log(otp.join(''))
    console.log(typeof (otp.join()))
  };



  return (
    <div className="w-full">
      <div className="grid place-items-center lg:pt-28 md:pt-26 sm:pt-20 xs:pt-15">
        <h1 className="text-black lg:text-[48px] md:text-[45px] sm:text-[35px] xs:text-[32px] lg:mb-[40px] md:mb-[40px] sm:mb-[30px] xs:mb-[20px]">
          ওটিপি যাচাই করুন
        </h1>
        <p className="text-gray-500">আমরা আপনাকে একটি এককালীন পাসওয়ার্ড পাঠাব</p>
        <p className="text-gray-500">
          <span className="font-semibold">মোবাইল নাম্বার:</span> +88 {phonenumber}
        </p>
      </div>
      <div className="flex justify-center flex-row space-x-6 lg:mt-[70px] lg:mb-[70px] md:mt-[60px] md:mb-[60px] sm:mt-[50px] sm:mb-[50px] xs:mt-[30px] xs:mb-[20px] text-3xl font-semibold text-gray-700">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="number"
            className="w-[51px] h-[65px] border-solid bg-gray-100 rounded-xl text-center"
            value={otp[index]}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            maxLength="1" // Limit input to one character
          />
        ))}
      </div>
      <div className="flex justify-center items-center flex-col">
        {otpStatus === "SENT" && <p className="text-gray-500">{`ওটিপি  ${timer} সেকেন্ড পর আবার পাঠানো হবে`}</p>}
        <button
          onClick={sendOtp}
          onKeyDown={handleKeyDown}
          disabled={isButtonDisabled}
          className={`login__btn page__common__yello__btn mt-8 lg:px-5 md:px- sm:px-3  bg-[#F9A106] rounded-[8px] lg:text-[30px] md:text-[30px] sm:text-[25px] xs:text-[20px] text-white lg:h-[75px] md:h-[65px] sm:h-[60px] xs:h-[55px] ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          ওটিপি যাচাই করুন
        </button>
        {timer <= 0 &&

          <button
            onClick={handleSendOtpAgain}
            className=" lg:pl-60 md:pl-50 sm:pl-40 xs:pl-10 pt-2 text-gray-400 hover:text-gray-600 font-semibold text-sm"
          >
            ওটিপি পাননি ?
          </button>
        }

      </div>
    </div>
  );
};

export default OtpPage;
