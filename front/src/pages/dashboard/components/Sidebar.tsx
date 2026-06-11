import { BarChart3, Binoculars, Calendar, ChevronDown, ComputerIcon, FileText, LayoutDashboard, MessagesSquare, Network, Package, Settings, ShoppingBag, Space, User } from "lucide-react"
import React, { useContext, useState, type SetStateAction } from "react"
import Image from "../../../../public/images/2.jpg"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext, type AuthContextData } from "../../../contexts/AuthContext"

interface SidebarProps {
    collapse: boolean,
    onToggle: () => void,
    currentPage: string,
    onPageChange: React.Dispatch<SetStateAction<string>>

}

const Sidebar = function ({collapse, onToggle, onPageChange, currentPage}: SidebarProps) {

    const menuItems = [
        {
            id: "",
            icon: LayoutDashboard,
            label: "Dashboard",
            active: true,
            badge: "Nouveau"
        },
        {
            id:"analytics-diagnostics",
            label: "Alertes & Diagnostics",
            icon:BarChart3,
            submenu: [
                {id: "alerts", label: "Alertes"},
                {id: "diagnostics", label: "Diagnostics"},
            ]
        },
        {
            id:"users",
            label: "Utilisteurs",
            count: "2.4k",
            icon: User,
            submenu: [
                {id: "all-users", label: "All Users"},
                {id: "roles", label: "Roles & Permissions"},
                {id: "activity", label: "User Activity"},
            ]
        },
        {
            id: "ecommerce",
            icon: ShoppingBag,
            label: "Consommations",
            submenu: [
                {id: "products", label: "Products"},
                {id: "orders", label: "Orders"},
                {id: "customers", label: "Customers"},
            ]
        },
        {
            id: "inventory",
            label: "Débits",
            icon: Package,
            count: "847"
        },
        // {
        //     id: "calendar",
        //     label: "Calendar",
        //     icon: Calendar,
        // },
        {
            id: "messages",
            label: "Message",
            icon: MessagesSquare,
            count: "12"
        },
        {
            id: "network",
            icon: Binoculars,
            label: "Surveillance"
        },
        {
            id: "simulation",
            label: "Simulation",
            icon: ComputerIcon
        },
    ];

    const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

    const toggleExpanded = function (itemId: string) {
        const newExpanded = new Set(expandedItems);

        if (newExpanded.has(itemId)) {
            newExpanded.delete(itemId)
        } else {
            newExpanded.add(itemId)
        }

        setExpandedItems(newExpanded)
    }

    const navigate = useNavigate()
    const location = useLocation()

    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextData


    return (
        <div className={` ${
            collapse
                ? "-translate-x-full"
                : "translate-x-0"
        }  transition-all ease-in-out duration-200 bg-white/80 dark:bg-slate-900/80 border-r border-slate-200/50  backdrop-blur-xl   dark:border-slate-700/50 fixed flex-col z-998   h-screen overflow-y-auto bottom-0 shadow-md  scrollbar-thin  
        top-18
        left-0` }>
            
            {/* Logo */}
            {!collapse  &&  ( <div className="p-6  border-b border-slate-200/50 dark:border-slate-700/50">

                <div className="flex items-center space-x-3">

                    <div className="flex items-center rounded-lg shadow-lg w-10 h-10 justify-center bg-linear-to-br from-blue-500 to-purple-500 ">
                        <Network className="w-6 h-6 text-white"/>
                    </div>

                    {/* Conditional rendering */}
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">HydroTech</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Panel Administrateur</p>
                    </div>

                </div>
            </div> )}


            {/* Navigation */}
            <nav className="md:flex-1 overflow-y-auto scrollbar-thin  space-y-2  p-4 ">
                {menuItems.map(function(item) {
                    const Icon = item.icon
                    return (
                        <div className="" key={item?.id}>
                            <button className={`${location.pathname === "/dashboard/"+item?.id || item.active ? "bg-linear-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" :""} w-full items-center justify-between p-2 rounded-xl transition-all duration-200 flex`} onClick={function() {
                                if (item.submenu) {
                                    toggleExpanded(item.id)
                                }else {
                                    // onPageChange(item.id)
                                    navigate(`/dashboard/${item?.id}`)
                                }
                            }}>
                                <div className="flex items-center text-slate-800 dark:text-white  space-x-3">
                                    <Icon className="w-5 h-5"/>

                                    {/* conditional rendering */}
                                    {!collapse &&  <>
                                        <span className="ml-2 font-medium">{item.label}</span>
                                        {item?.badge && <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">{item?.badge}</span>}
                                        {item?.count &&  <span className="px-2 text-xs py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">{item?.count}</span>}
                                    </>
                                    }


                                </div>

                                {item.submenu && !collapse  && <ChevronDown className="w-4 h-4 text-slate-700 dark:text-slate-200 transition-transform"/>} 

                            </button>

                            {/* Submenu */}
                            {item?.submenu  && !collapse &&  expandedItems.has(item.id) && <div className="ml-8  mt-2 space-y-1">
                                {item.submenu?.map(function(item) {
                                    return (
                                        <button onClick={() => navigate(`/dashboard/${item.id}`)} key={item.id} className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200">{item.label}</button>
                                    )
                                })}
                            </div>}
                        </div>
                    )
                })}
            </nav>
            

            {/* User Profile */}
            {!collapse && <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-6">

                <div className=" items-center hidden  md:flex space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">

                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-linear-to-r from-purple-400  to-purple-500 ">
                        <span className="text-white font-medium text-sm">{currentUser?.name.charAt(0).toUpperCase()}</span>
                    </div>


                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">{currentUser?.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Administrateur</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400"/>

                </div>

            </div>}

        </div>
    )
}

export default  Sidebar