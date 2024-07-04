import { createContext, useEffect, useState } from "react";

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

    useEffect(() => {
        const currentDashboardIndex = localStorage.getItem("dashBordPageIndex");
        const currentDashboardPageScope = localStorage.getItem("dashBordPageScope");

        console.log({ currentDashboardIndex, currentDashboardPageScope })
        if (currentDashboardIndex) {
            setDashboard({
                currentindex: parseInt(currentDashboardIndex),
                currentPage: currentDashboardPageScope
            })
        }


    }, [])

    function updateCurrentComponentIndex(index, page) {
        localStorage.setItem("dashBordPageIndex", index);
        localStorage.setItem("dashBordPageScope", page);

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