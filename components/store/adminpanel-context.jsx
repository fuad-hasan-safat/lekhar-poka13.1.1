import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
    currentindex: 0,
    currentPage: '',
    viewPostid: '',
    isViewPost: false,
    setCurrentComponentIndex: () => { },
    setViewPost: () => { }
});

export default function AdminContextProvider({ children }) {

    const [dashboard, setDashboard] = useState({
        currentindex: 0,
        currentPage: 'Dashboard',
        viewPostid: '',
        isViewPost: false,
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
            currentPage: page,
            isViewPost: false,
        }))

    }

    function setPostToView(id, status = true) {
        setDashboard((prevDashboard) => ({
            ...prevDashboard,
            viewPostid: id,
            isViewPost: status,
        }))
    }

    const cntxtValue = {
        currentindex: dashboard.currentindex,
        currentPage: dashboard.currentPage,
        viewPostid: dashboard.viewPostid,
        isViewPost: dashboard.isViewPost,
        setCurrentComponentIndex: updateCurrentComponentIndex,
        setViewPost: setPostToView
    }

    return (
        <AdminContext.Provider value={cntxtValue}>
            {children}
        </AdminContext.Provider>
    )
}