import React, { useRef, useState } from "react";
import axios from "axios";
import { apiBasePath } from "../../utils/constant";

const OtpPage = ({ phonenumber, setIsOtpVerified, setIsOtpSuccess }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const inputRefs = useRef([]);

  const sendOtp = async () => {
    const formattedPhoneNumber = `88${phonenumber}`;
    try {
      const response = await axios.post(`${apiBasePath}/verify-otp`, {
        otp: otp.join(""),
        phone: formattedPhoneNumber,
      });
      if (response.data.status === "success") {
        setIsOtpVerified(true);
        setIsOtpSuccess(true);
      } else {
        alert("ওটিপি সফলভাবে সম্পন্ন হয়নি");
      }
    } catch (error) {
      console.error("Otp Send Error:", error);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (newOtp.every((value) => value !== "")) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

    // Focus on the next field
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="w-full">
      <div className="grid place-items-center lg:pt-28 md:pt-26 sm:pt-20 xs:pt-15">
        <h1 className="text-black lg:text-5xl md:text-4xl sm:text-4xl xs:text-3xl lg:mb-[40px] md:mb-[40px] sm:mb-[30px] xs:mb-[20px]">
          OTP Verification
        </h1>
        <p className="text-gray-500">We will send you a one-time password on</p>
        <p className="text-gray-500">
          this <span className="font-semibold">Mobile Number:</span> +88 {phonenumber}
        </p>
      </div>
      <div className="flex justify-center flex-row space-x-6 lg:mt-[70px] lg:mb-[70px] md:mt-[60px] md:mb-[60px] sm:mt-[50px] sm:mb-[50px] xs:mt-[30px] xs:mb-[20px] text-3xl font-semibold text-gray-700">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="number"
            className="w-[51px] h-[65px] border-solid bg-gray-100 rounded-xl text-center"
            value={otp[index]}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            maxLength="1" // Limit input to one character
          />
        ))}
      </div>
      <div>
        <div className="flex justify-center items-center flex-col">
          <button
            onClick={sendOtp}
            disabled={isButtonDisabled}
            className={`login__btn mt-8 px-5 bg-[#F9A106] rounded-full lg:text-[35px] md:text-[34px] sm:text-[33px] xs:text-[30px] text-white lg:h-[75px] md:h-[70px] sm:h-[65px] xs:h-[60px] ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Verify
          </button>
          <a className="lg:pl-60 md:pl-50 sm:pl-40 xs:pl-10 pt-2 text-gray-400 font-semibold text-sm" href="#">
            Did not get OTP?
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
