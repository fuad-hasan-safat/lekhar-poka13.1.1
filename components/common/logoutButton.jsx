import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";



export default function LogoutButton({ buttonClass, buttonText, setStatus }) {
  const router = useRouter()
    function logoutHandaler(){
        localStorage.removeItem("status");
        localStorage.removeItem("name");
        localStorage.removeItem("uuid");
        localStorage.removeItem("phone");
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        setStatus("");

        router.push('/');
    }



  return (
    <>
      
       <div>
        <button 
        onClick={logoutHandaler}
        className={`${buttonClass}`}>
          {buttonText}
        </button>
      </div>

    </>
  );
}
