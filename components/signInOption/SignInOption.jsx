'use client'
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { apiBasePath } from '../../utils/constant';
import { useRouter } from 'next/router';

// import { LoginSocialFacebook } from "reactjs-social-login";
// import { FacebookLoginButton } from "react-social-login-buttons";

export default function SignInOption({
    title,
    icon1,
    icon2,
    lowermessege1,
    lowermessege2,
    signLogLink,
    user,
    setUser,
    setProfile,
    setStatus,
    setUsername,
    setUserUuid,
}) {

    const router = useRouter();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            router.push('/')

        },
        onError: (error) => console.log('Login Failed:', error)
    });


    function fblogin() {
        //  need to implement
    }

    async function sendDataToBackend(id, email, name, picture, access_token) {
        try {
            const response = await axios.post(
                `${apiBasePath}/google-login`,
                {
                    id: id,
                    email: email,
                    name: name,
                    picture: picture,
                    access_token: access_token,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            if (response.data.status === 'success') {

                const data = await response.data;

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

                router.reload();

            }

        } catch (error) {
        }
    }

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {

                        setProfile(res.data);
                        setUserUuid(res.data.id)
                        setUsername(res.data.name)
                        setStatus('success')


                        localStorage.setItem("status", 'success');
                        localStorage.setItem("name", res.data.name);
                        localStorage.setItem("uuid", '');
                        localStorage.setItem("phone", '');
                        localStorage.setItem("token", res.data.id);
                        localStorage.setItem("usertype", 'user');
                        localStorage.setItem("phone", '');
                        localStorage.setItem("email", res.data.email);

                        sendDataToBackend(res.data.id, res.data.email, res.data.name, res.data.picture, user.access_token)

                        router.push('/')

                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );



    return (
        <>

            {icon1?.length && <div
                className=" w-full my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p
                    className="mx-4 mb-0 text-center text-base text-[#757171]">
                    {title}
                </p>
            </div>
            }


            {icon1?.length &&
                <div className="flex place-content-center justify-center space-x-[8px]">

                    <button 
                        className="page__common__yello__btn flex border border-solid rounded-md shadow-md p-1 py-[9px] px-[5px]"
                        onClick={login}
                    >
                        <img
                            src={icon1}
                            width={300}
                            height={300}
                            alt="fac"
                            className="w-[44px] h-[22px]"
                        />

                    </button>


                </div>
            }
            <div className="flex space-x-3 pt-5  items-center justify-center">
                <p className=" text-gray-500">{lowermessege1}</p> <a className=" text-black font-semibold text-[16px]" href={signLogLink}>{lowermessege2}</a>
            </div>
        </>

    );
}