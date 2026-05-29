import { Bell, Clock, Settings, ShoppingCart, User } from "lucide-react"
import React from "react"

const activities = [
    {
        id: 1,
        type: "user",
        icon: User,
        title: "New user registrered",
        description: "John Smith created an account",
        time: "2 minutes ago",
        color:"text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/80"
    },
    {
        id: 2,
        type: "order",
        icon: ShoppingCart,
        title: "New order received",
        description: "Order #3847 for $2,399",
        time: "5 minutes ago",
        color: "text-emerald-500",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    {
        id: 3,
        type: "settings",
        icon: Settings,
        title: "New user registrered",
        description: "John Smith created an account",
        time: "2 minutes ago",
        color: "text-orange-500",
        bgColor: "bg-orange-100 dark:bg-orange-900/30"
    },
    {
        id: 1,
        type: "notification",
        icon: Bell,
        title: "Low stock alert",
        description: "John Smith created an account",
        time: "2 minutes ago",
        color: "text-red-500",
        bgColor: "bg-red-100 dark:bg-red-900/30"
    }
]

const ActivityFeed =  function () {
    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl  border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50  transition-colors">

                <div className="">
                    <h3 className="text-lg  font-bold text-slate-800 dark:text-white">Activity Feed</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-600">Recent System Activities</p>
                </div>

                <button className="text-sm font-medium text-blue-600  hover:text-blue-700">Voir tout</button>
            </div>


            <div className="p-6">
                <div className="space-y-4">

                    {activities.map(function(activity, index) {
                        
                        const Icon = activity.icon

                        return (
                            <div className="flex  items-start space-x-4 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50  transition-colors">

                                <div className={`p-2 rounded-lg bg-linear-to-r ${activity.bgColor}`}>
                                    <Icon className={`size-4 ${activity.color}`}/>
                                </div>
                            
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{activity.title}</h4>
                                    <p className="text-slate-600  text-sm truncate dark:text-slate-400">{activity.description}</p>
        
                                    <div className="flex items-center-safe space-x-1 mt-1">
                                        <Clock className="size-3 text-slate-400"/>
                                        <span className="text-xs text-slate-500  dark:text-slate-400">{activity.time}</span>
        
                                    </div>
        
                                </div>
                            </div>
                        )
                    })}



                </div>
            </div>



        </div>


    )
}


export default ActivityFeed