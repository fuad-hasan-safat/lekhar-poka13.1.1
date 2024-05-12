"use client"
import { apiBasePath } from "../../utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import Loading from "./loading";

// type logreg = {
//   logreg: string;
//   btntext: string;
// };

export default function LoginForm({ logreg, btntext }) {
  const router = useRouter();

  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    status: '',
    name: '',
    phone: '',
    uuid: '',
  });
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [error, setError] = useState(null); 
  const [numberPrefix, setNumberPrefix] = useState('88');


  const handleNumberhange = (e) => {
     // Allow only numbers and backspace key
     const newValue = e.target.value.replace(/[^0-9\b]/g, "");
     // Enforce maximum length of 11 digits
     if (newValue.length > 11) {
       setError("Phone number cannot exceed 11 digits.");
       return;
     }
     // Enforce starting with "01"
     if (newValue.length > 1 && newValue.slice(0, 2) !== "01") {
       setError("Phone number must start with 01.");
       return;
     }
     setnumber(newValue);
     setError(null); // Clear error if valid input
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function submitLogin() {

    console.log("Calling submitLogin---------------->>>>>>");
    console.log(`${numberPrefix}${number}`);
    try {
      const response = await axios.post(
        `${apiBasePath}/login`,
        {
          phone: `${numberPrefix}${number}`,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log('Log In page response--------', response);

      if (response.data.status === 'success') {
        const data = await response.data;

        console.log(data)
        setStatus(data.status);
        setUserUuid(data.uuid);
        setUser(data);
        localStorage.setItem("status", data.status);
        localStorage.setItem("name", data.name);
        localStorage.setItem("uuid", data.uuid);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("usertype", data.usertype);
        localStorage.setItem("phone", data.phone);
        //localStorage.setItem('user', data);


        console.log('user type,_____',data.usertype )

        setnumber('')
        setPassword('')
        router.push(`/`)
      } else {
        //console.log("error res", response);
        alert('সঠিক নাম্বার দিন');
      }
    } catch (error) {
      //console.log("inside catch", error);
      alert('সঠিক পাসওয়ার্ড দিন');
    }
  }


   useEffect(() => {
    setStatus(localStorage.getItem("status") || "");

  }, [status]);

  useEffect(() => {
    setUsername(localStorage.getItem('name')|| '');
    setUserUuid(localStorage.getItem('uuid')|| '')
  }, []);


  return (
    <>
      <div className="login__form__dsc">
        <div className="text-[48px] mb-5  font-semibold text-yellow-500">
          {logreg}
        </div>
        <div className="login__form__fleds w-full ">
          <div className="mb-4 ">
            <input
              onChange={handleNumberhange}
              value={number}
              className="h-[62px] p-4 bg-[#FCF7E8] rounded-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="number"
              placeholder="Enter Phone Number (01-XXXXXXXXX)"
              required
            />
            {error && <p className="error text-red-500">{error}</p>}
          </div>
          <div className="">
            <input
              onChange={handlePasswordChange}
              value={password}
              className="h-[62px] p-4 bg-[#FCF7E8]  rounded-2xl   text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
             <a
              className="pt-[12px] float-right mb-[15px] inline-block align-baseline font-bold text-xs text-gray-600 hover:text-black-800"
              href="/account/recoverpassword"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <button
            type="button"
            onClick={submitLogin}
            className=" mt-8 px-[90px] bg-[#F9A106] rounded-full text-[35px] text-white  h-[75px] "
          >
            {btntext}
          </button>
        </div>
      </div>
    </>
  );
}
