import { ArrowDown, ArrowRight, ArrowUp, DollarSign, Eye, ShoppingCart, User } from "lucide-react";
import React from "react";

const Stats = [
    {
        title: "Total Revenue",
        value:  "2000 XAF",
        change: "+12,5%",
        trend: "up",
        icon: DollarSign,
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
        title: "Active Users",
        value:  "3400",
        change: "+8,5%",
        trend: "up",
        icon: User,
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        title: "Total Orders",
        value:  "3500",
        change: "+18,5%",
        trend: "up",
        icon: ShoppingCart,
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-600 dark:text-purple-400"
    },
    {
        title: "Total Views",
        value:  "456773",
        change: "-2.1%",
        trend: "down",
        icon: Eye,
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-600 dark:text-orange-400"
    }
]

const StatsGrid:React.FC = function () {
    return (
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {Stats.map(function(stat, index) {

            const  Icon = stat.icon

            return (
                <div className="border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-700/20 rounded-2xl p-6 group"  key={index}>

                    {/* First */}
                    <div className="flex items-start justify-between">
        
        
                        <div className="flex-1">
                            <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">{stat.title}</p>

                            <p className="text-3xl font-bold mb-2 text-slate-800 dark:text-white transition-colors">{stat.value}</p>

                            <div className="flex items-center space-x-2">
                                {stat.trend === "up" ? <ArrowUp className="h-4 w-4 text-emerald-500"/> : <ArrowDown className="w-4 h-4 text-red-500"/>}
                                <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>{stat.value}</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">vs Last</span>
                            </div>
                        </div>
                        
                        {/* second */}
                        <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-200`}>
                            <Icon  className={`w-6 h-6 ${stat.textColor} `}/>
                        </div>

                    </div>

                    {/*Progressbar */}
                    <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

                        <div style={{width: stat.trend ===    "up" ? "75%" : "45%"}} className={`bg-linear-to-r ${stat.color} w-full rounded-full h-full transition-all duration-200`}>

                        </div>
                    </div>
                </div>
            )
        })}

        </div>)
    }

export default StatsGrid