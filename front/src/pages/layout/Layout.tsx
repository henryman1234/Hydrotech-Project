import React, { useContext } from "react";
import "./layout.scss";
import {Navigate, Outlet} from "react-router-dom"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { AuthContext, type AuthContextData } from "../../contexts/AuthContext";

const Layout = function () {
    return (
        <section className="layout">
            {/* <Navbar/> */}
            <main>
                <Outlet/>
            </main>
            
        </section>
    )
}

const RequireAuthLayout = function () {

    const  {currentUser, updateUser} = useContext(AuthContext) as AuthContextData

    if (!currentUser) {
        return <Navigate to="/auth" replace/>
        
    } else {
        return (
            <section className="layout">
                {/* <Navbar/> */}
                <main>
                    <Outlet/>
                </main>
                
            </section>
        )
    }
}

export {Layout, RequireAuthLayout}