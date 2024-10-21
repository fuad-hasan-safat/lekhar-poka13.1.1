import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({
    userName: '',
    userUuid: '',
    userImage: '',
    userToken: '',
    userType: '',
    isLoggedIn: false,
    isloggedOut: true,
    isProfileLoaded: true,

    setUser: () => { },
    setIsProfileLoaded: () => { },
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
        isProfileLoaded: false,
    })

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (loggedInUser) {
          try {
            const userObj = JSON.parse(loggedInUser);
            // console.log('user object user context ', userObj);
            setUserData(userObj);
          } catch (error) {
            console.error('Failed to parse loggedInUser from localStorage:', error);
            localStorage.removeItem('loggedInUser');
          }
        }
    

    }, [])

    function setUserValue(userObj) {
        localStorage.setItem('loggedInUser', JSON.stringify(userObj))
        setUserData((prevData) => ({
            ...prevData,
            ...userObj,
        }))
    }

    function updateUserPofileLoaded(status) {
        setUserData((prevData) => ({
            ...prevData,
            isProfileLoaded: status,
        }))
    }

    const cntxtValue = {
        userName: userData?.userName,
        userUuid: userData?.userUuid,
        userImage: userData?.userImage,
        isLoggedIn: userData?.isLoggedIn,
        isloggedOut: userData?.isloggedOut,
        isProfileLoaded: userData?.isProfileLoaded,
        setUser: setUserValue,
        setIsProfileLoaded: updateUserPofileLoaded,
    }

    return (
        <UserContext.Provider value={cntxtValue}>
            {children}
        </UserContext.Provider>
    )
}