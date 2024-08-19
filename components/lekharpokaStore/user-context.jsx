import { createContext, useState } from "react";


export const UserContext = createContext({
    userName: '',
    userUuid: '',
    userImage: '',
    isLoggedIn: false,
    isloggedOut: true,

    setUser: () => { },
})

export default function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({
        userName: '',
        userUuid: '',
        userImage: '',
        isLoggedIn: false,
        isloggedOut: true,
    })

    function setUserValue(userObj){
        setUserData((prevData)=> ({
            ...prevData,
            ...userObj,
        }))
    }

    const cntxtValue = {
        userName: userData.userName,
        userUuid: userData.userUuid,
        userImage:userData.userImage,
        isLoggedIn: userData.isLoggedIn,
        isloggedOut: userData.isloggedOut,
        setUser: setUserValue,
    }

    return(
        <UserContext.Provider value={cntxtValue}>
            {children}
        </UserContext.Provider>
    )
}