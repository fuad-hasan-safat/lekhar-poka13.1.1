'use client'
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function SignInOption({ title, icon1, icon2, icon3, lowermessege1, lowermessege2, classProperty, signLogLink }) {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

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
                        console.log('google response data ------>>>>', res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };


    return (
        <>

            {icon1?.length && <div
                className=" w-[270px] my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p
                    className="mx-4 mb-0 text-center text-xs">
                    {title}
                </p>
            </div>
            }


            {icon1?.length &&
                <div className="flex place-content-center justify-center">

                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />; */}

                    {profile ? (
                        <div>
                            <img src={profile.picture} alt="user image" />
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
                            <br />
                            <br />
                            <button onClick={logOut}>Log out</button>
                        </div>
                    ) : (
                        <button
                            className="flex border border-solid rounded-md shadow-md p-1 py-[9px] px-[5px]"
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
                    )}

                    {/* <button
                        className="flex border border-solid rounded-md shadow-md p-1 py-[9px] px-[5px]"
                        onClick={login}
                    >
                        <img
                            src={icon1}
                            width={300}
                            height={300}
                            alt="fac"
                            className="w-[44px] h-[22px]"
                        />

                    </button> */}
                </div>
            }
            <div className="flex space-x-3 pt-5 items-center justify-center">
                <p className=" text-gray-500">{lowermessege1}</p> <a className=" text-black font-semibold text-lg" href={signLogLink}>{lowermessege2}</a>
            </div>
        </>

    );
}