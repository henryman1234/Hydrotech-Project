import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Inventory from "./pages/Inventory";
import { Outlet } from "react-router-dom";

const DashboardLayout = function () {

    const [sidebarCollapse, setSidebarCollapse] = useState(function() {
        const savedState = window.localStorage.getItem("sidebar_collapsed")
        return savedState !== null ? JSON.parse(savedState) : false
    })

    console.log("La sidebar est fermée ?: ", sidebarCollapse)


    // Persist the state of the sidebar in the LocalStorage
    useEffect(function(){
        window.localStorage.setItem("sidebar_collapsed", JSON.stringify(sidebarCollapse))
    },[sidebarCollapse])


    const [currentPage, setCurrentPage] = useState("dashboard")



    return (
        <div className="min-h-screen bg-linear-to-r from-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900  transition-all duration-200">

            <div className="flex h-screen overflow-hidden ">

                <Sidebar 
                    collapse={sidebarCollapse} 
                    onToggle={() => setSidebarCollapse(!sidebarCollapse)}
                    currentPage ={currentPage}
                    onPageChange={setCurrentPage}
                    onToggleSidebar={function () {
                        // e.stopPropagation();
                        setSidebarCollapse(true);
                    }}
                />

                <div className="flex-1   flex min-w-0  flex-col overflow-hidden">

                    <Header  
                        sidebarCollapse={sidebarCollapse}
                        onToggleSidebar={function () {
                            // e.stopPropagation();
                            setSidebarCollapse(false);
                        }}
                    />


                    <main className="overflow-y-auto   scrollbar-thin2 flex-1 bg-transparent">

                        <div className="space-y-6">
                            <Outlet/>
                        </div>
                        
                    </main>

                </div>
            </div>
            
        </div>
    )
}

export default DashboardLayout