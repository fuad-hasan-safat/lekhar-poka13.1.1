import { createContext, useState } from "react";

export const AdminContext = createContext({
    currentindex: 0,
    currentPage: '',
    setCurrentComponentIndex: () => { },
});

export default function AdminContextProvider({ children }) {

    const [dashboard, setDashboard] = useState({
        currentindex: 0,
        currentPage: 'Dashboard',
    })

    function updateCurrentComponentIndex(index, page='Dashboard') {
        setDashboard((prevDashboard) => ({
            ...prevDashboard,
            currentindex: index,
            currentPage: page
        }))

    }

    const cntxtValue = {
        currentindex: dashboard.currentindex,
        currentPage: dashboard.currentPage,
        setCurrentComponentIndex: updateCurrentComponentIndex
    }

    return (
        <AdminContext.Provider value={cntxtValue}>
            {children}
        </AdminContext.Provider>
    )
}