import { createContext, useState } from "react";

export const AdminContext = createContext({
    currentindex: -1,
    setCurrentComponentIndex: () => { },
});

export default function AdminContextProvider({ children }) {

    const [dashboard, setDashboard] = useState({
        currentindex: -1
    })

    function updateCurrentComponentIndex(index) {
        setDashboard((prevDashboard) => ({
            ...prevDashboard,
            currentindex: index
        }))

    }

    const cntxtValue = {
        currentindex: dashboard.currentindex,
        setCurrentComponentIndex: updateCurrentComponentIndex
    }

    return (
        <AdminContext.Provider value={cntxtValue}>
            {children}
        </AdminContext.Provider>
    )
}