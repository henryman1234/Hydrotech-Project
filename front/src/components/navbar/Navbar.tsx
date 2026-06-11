import React, { useContext, useEffect, useState, type MouseEvent } from "react";
import {BookOpen, ChartNetworkIcon, GlassWater, GlassWaterIcon, LogOut, LucideNetwork, Menu, Network, NetworkIcon, X} from "lucide-react"
import { AuthContext, AuthContextProvider, type AuthContextData } from "../../contexts/AuthContext";
import ProfileDropdown from "../../components/profileDropown/ProfileDropdown";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "sonner";

const Navbar =  function () {
    
    const [isOpen, setIsOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextData

    const navLinks = [
        {name : "Accueil", url: "/" },
        {name : "A Propos", url: "/about"},
        // {name : "Documentation", url: "/documentation"},
        {name : "Dashboard", url: "/dashboard"},
    ]

    // Close when click outside
    useEffect (function () {
        const handleClickOutside = function () {
            if (profileDropdownOpen) {
                setProfileDropdownOpen(false);
            }
        }
        
        document.body.addEventListener("click", handleClickOutside);

        return function () {
            document.body.removeEventListener("click", handleClickOutside);
        }

    }, [profileDropdownOpen])


    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: authService.logout,
        
        onSuccess: () => {
            toast.success("Déconnecté avec succès !")

            updateUser(null);
            
            queryClient.clear();
            // queryClient.invalidateQueries({queryKey:["auth"]})
        },
        onError: (error: any) => {
            const message = error?.response?.data.message;
            toast.error(message)
        }
    })
    
    return (
        <header>
            {/* Le container */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a 
                        href="/"
                        className="flex items-center space-x-2.5 group"
                    >
                        <div className="w-9 h-9 bg-linear-to-r from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition all duration-300 group-hover:scale-105">
                            <Network className="text-white w-5 h-5"/>
                        </div>
                        <span className=" text-xl font-bold text-gray-900  tracking-tight">
                            HydroTech
                        </span>
                    </a>


                    {/* Desktop Navigation */}
                    <nav className="lg:flex hidden items-center space-x-1 ">
                        {navLinks.map(function(link) {
                            return (
                                <Link 
                                    key={link.name}
                                    to={link.url}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50/50 transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Auth Buttons and Authenfication */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {currentUser ? ( <ProfileDropdown
                            isOpen={profileDropdownOpen}
                            // connectCode={currentUser.connectCode}
                            email={currentUser.email || ""}
                            name={currentUser.name || ""}
                            onToggle={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setProfileDropdownOpen(!profileDropdownOpen);
                            }}
                        />) : <>
                            <a 
                                href="/auth"
                                className="px-4 py-2 font-medium text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                                Se connecter
                            </a>

                            <a 
                                href="/auth"
                                className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg hover:from-violet-700 hover:to-purple-700 text-white
                                shadow-violet-500/30 hover:scale-110 shadow-lg 
                                hover:shadow-violet-500/50 transition-all duration-300"
                            >
                                Commencer
                            </a>
                        </> 
                        }

                    </div>

                    {/* Mobile Navigation */}
                    <button
                        onClick={function() {
                            setIsOpen(!isOpen)
                        }}
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                    >
                        {isOpen ? <X className="w-7 h-7"/> : <Menu className="w-7 h-7"/>}
                    </button>

                </div>

            </div>



            {/*Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden bg:white border-t border-gray-200 animate-in slide-in-from-top duration-200">

                    <nav className="px-4 py-4 space-y-1">
                        {navLinks.map(function(link){
                            return (
                                <Link 
                                    key={link.name}
                                    to={link.url}

                                    className="block px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50   "
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="px-4 py-4 border-t border-gray-200">
                        
                        {currentUser ? (

                            <div className="space-y-3">

                                <div className="flex items-center space-x-3">

                                    <div className="h-8 w-8 bg-linear-to-br from-violet-800 to-violet-500 rounded-lg justify-center flex items-center">
                                        <span className="font-semibold text-white text-sm" >
                                            {currentUser?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="text-base font-semibold text-gray-900">
                                        {currentUser?.name}
                                    </div>

                                    <div className="text-gray-500 text-sm">
                                        {currentUser?.email}
                                    </div>

                                </div>

                                <button
                                    className="w-full px-4 py-2.5 text-sm font-medium bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all duration-300 flex items-center justify-center"
                                    onClick={() => mutation.mutate()}
                                  
                                >
                                    <LogOut className="size-5 mr-1 text-white"/> Se déconnecter 
                                </button>
                            </div>
                        ) :  (
                            <div className="space-y-2
                            ">
                                <a 
                                    href="/auth"
                                    className="block text-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
                                >
                                    Login
                                </a>

                                <a 
                                    href="/auth"
                                    className="block text-sm text-center px-4 py-2.5 text-white bg-gradient-to-r from-violet-600 font-medium to-purple-600 rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/30"
                                >
                                    Commencer
                                </a>
                            </div>
                        )}


                    </div>
                </div>
            )}






        </header>
    )
}

export default Navbar