import { Bell, ChevronDown, Combine, Filter, Menu, MenuSquareIcon, Plus, Search, Settings, Sun, User } from "lucide-react"
import React, { useState, type MouseEventHandler, type SetStateAction } from "react"
import { useTheme, type ThemeContextData } from "../../../contexts/ThemeContext"
import Image from "../../../../public/images/2.jpg"
import  {createPortal} from "react-dom"

interface HeaderProps {
    sidebarCollapse: boolean,
    onToggleSidebar: () => void
}
const Header = function ({sidebarCollapse, onToggleSidebar}: HeaderProps) {

    const {theme, toggleTheme} = useTheme() as ThemeContextData

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    return (
        <div className="bg-white/80 relative dark:bg-slate-900/80 border-b backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 px-6  max-md:px-0 py-4">

            <div className="flex items-center justify-between">
                {/* Left section */}
                <div className="flex items-center space-x-4">
                    <button onClick={onToggleSidebar} className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Menu className="w-5 h-5"/>
                    </button>

                    <div className="hidden md:block">
                        <h1 className="text-xl text-slate-800 dark:text-white  font-semibold transition-colors">Dashboard</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors truncate">Bienvenue Henry, on fait quoi aujourd'hui ?</p>

                    </div>

                </div>

                {/* Center */}
                <div className="flex-1 max-w-md hidden md:flex mx-8 ">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute top-1/2 inset-y-0 mb-2 -translate-y-1/2 left-3 text-slate-400"/>
                        <input type="text" placeholder="Faites une recherche" className="pl-10 pr-10 py-2.5 w-full  bg-slate-100 dark:bg-slate-800 border border-slate-200 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all " />
                        <Filter className="w-4 h-4 absolute mb-2 inset-y-0 right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 transition-colors"/>
                    </div>
                </div>


                {/* Right */}
                <div className="flex items-center space-x-2">
                    <button  className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg transition-all duration-200 text-sm">
                        <Plus className="w-4 h-4"/>
                        Nouveau
                    </button>

                    {/* Toggle */}
                    <button onClick={toggleTheme} className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-100  dark:hover:text-slate-800 transition-all duration-200">
                        <Sun  className="w-5 h-5"/>
                    </button>

                    {/* Notification */}
                    <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-100 dark:hover:text-slate-800">
                        <Bell className="w-5 h-5"/>
                        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-400 text-white text-xs justify-center items-center flex font-medium rounded-full">3</span>
                    </button>

                    {/* Search */}
                    <button className="text-slate-600 dark:text-slate-300 hover:text-slate-100 dark:hover:text-slate-800 p-2.5 rounded-xl relative ">
                        <Search  className="w-5  h-5"/>
                    </button>

                    {/* Menu on Small Screen */}
                    <button  className="text-slate-600 hidden max-md:inline  dark:text-slate-300 p-2.5 hover:text-slate-100 dark:hover:text-slate-800 rounded-xl transition-colors"onClick={() => {setIsMobileMenuOpen(true)}}>
                        <MenuSquareIcon className="w-5 h-5"/>
                    </button>

                    {/* On téléport le menu mobile en bas du document HTML dans le body */}
                    {isMobileMenuOpen  &&  createPortal((
                        <div className="fixed md:hidden w-full h-full  inset-0  z-9999">

                            {/* Le overlay */}
                            <div className="absolute inset-0  backdrop-blur-sm "onClick={function() {
                                setIsMobileMenuOpen(false)
                            }}/>

                            {/* La barre blanche */}
                            <div className={`absolute inset-y-0 right-0  w-[300px] p-6 bg-white/80   dark:bg-slate-900/80 transform transition-transform duration-200 flex flex-col justify-between ease-in-out ${isMobileMenuOpen ?  "translate-x-0" : "translate-x-full"}`} >
                                <nav>
                                    <div className="flex p-3  items-center space-x-2 border-b border-slate-200 dark:border-slate-500 ">
                                        <Combine className="size-5 text-slate-600 dark:text-slate-300"/>
                                        <span className="text-slate-600 dark:text-slate-300 ">Utilisteurs</span>
                                    </div>

                                    <div className="flex p-3  items-center space-x-2 border-b border-slate-200 dark:border-slate-500 ">
                                        <User className="size-5 text-slate-600 dark:text-slate-300"/>
                                        <span className="text-slate-600 dark:text-slate-300 ">Utilisteurs</span>
                                    </div>

                                    <div className="flex p-3  items-center space-x-2 border-b border-slate-200 dark:border-slate-500 ">
                                        <Settings className="size-5 text-slate-600 dark:text-slate-300"/>
                                        <span className="text-slate-600 dark:text-slate-300 ">Utilisteurs</span>
                                    </div>            
                                </nav>


                                <div className=" items-center  flex space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                                    <img src={Image} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500" />
                                    <div className="">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">Henry Euloge</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Administrateur</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400"/>

                                </div>
                                
                            </div>


                        </div>
                    ) , document.body)}




                    {/* User Profile */}
                    <div className=" items-center hidden  md:flex space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                        <img src={Image} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500" />
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">Henry Euloge</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Administrateur</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400"/>

                    </div>
                    


                </div>

            </div>

            
            
        </div>
    )
}

export default Header