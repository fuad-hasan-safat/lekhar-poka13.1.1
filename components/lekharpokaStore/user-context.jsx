import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({
    userName: '',
    userUuid: '',
    userImage: '',
    userToken: '',
    userType: '',
    isLoggedIn: false,
    isloggedOut: true,

    setUser: () => { },
})

export default function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({
        userName: '',
        userUuid: '',
        userImage: '',
        userToken: '',
        userType: '',
        isLoggedIn: false,
        isloggedOut: true,
    })

    useEffect(()=>{
        const userObj = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log('user object user context ', userObj );
        setUserData(userObj)
    },[])

    function setUserValue(userObj) {
        localStorage.setItem('loggedInUser', JSON.stringify(userObj))
        setUserData((prevData) => ({
            ...prevData,
            ...userObj,
        }))
    }

    const cntxtValue = {
        userName: userData?.userName,
        userUuid: userData?.userUuid,
        userImage: userData?.userImage,
        isLoggedIn: userData?.isLoggedIn,
        isloggedOut: userData?.isloggedOut,
        setUser: setUserValue,
    }

    return (
        <UserContext.Provider value={cntxtValue}>
            {children}
        </UserContext.Provider>
    )
}