'use client'
import React, { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { apiBasePath } from '../../utils/constant';
import { useRouter } from 'next/router';
import { UserContext } from '../lekharpokaStore/user-context';
import useTabSyncAuth from '../../utils/useReloadUrl';
import { userSessionAction } from '../redux/usersession-slice';
import { useDispatch } from 'react-redux';

export default function SignInOption({
    title,
    icon1,
    icon2,
    lowermessege1,
    lowermessege2,
    signLogLink,
}) {


    const router = useRouter();
    const dispatch = useDispatch();
    const { setUser } = useContext(UserContext);
    const [google_accessToken, setGoogle_accessToken] = useState()

    const { triggerLogin } = useTabSyncAuth();


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setGoogle_accessToken(codeResponse.access_token);
            console.log('google log in response , ', codeResponse);
            // router.push('/')

        },
        onError: (error) => console.log('Login Failed:', error)
    });


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
            console.log('Google log in backend response', response)

            if (response.data.status === 'success') {

                const data = response.data;
                console.log('Google back end log in sucess', data);

                dispatch(userSessionAction.addValidUser({
                    isLoggedIn: true,
                    userToken: data?.access_token,
                    userUuid: data?.uuid,
                    userName: data?.name,
                    userType: data?.usertype,
                    accountType: 'create with gmail',
                }));

                const user = {
                    userName: data.name,
                    userUuid: data.uuid,
                    userImage: data?.image,
                    userToken: data.access_token,
                    userType: data.usertype,
                    isLoggedIn: true,
                    isloggedOut: false,
                };
                // Save user data to local storage
                localStorage.setItem('userId', data?.uuid);        // Save userId
                localStorage.setItem('userToken', data?.access_token); // Save userToken
                localStorage.setItem('userType', data?.usertype);   // Save userType
                setUser(user);
                triggerLogin();
            }

        } catch (error) {
        }
    }


    useEffect(
        () => {
            if (google_accessToken) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google_accessToken}`, {
                        headers: {
                            Authorization: `Bearer ${google_accessToken}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log('Google details response', res);
                        sendDataToBackend(res.data.id, res.data.email, res.data.name, res.data.picture, google_accessToken)

                        router.push('/')
                    })
                    .catch((err) => console.log(err));
            }
        },
        [google_accessToken]
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