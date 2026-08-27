import { useQuery } from "@tanstack/react-query"
import { Bell, Clock, GlassWaterIcon, LucideGlassWater, Settings, Settings2, ShoppingCart, User, Volume, type LucideProps } from "lucide-react"
import React, { useDebugValue, useEffect, useState } from "react"
import { mainService } from "../../../services/mainService"
import PerformanceCard from "./PerformanceCard"

export type PerformanceType = {
    id: number,
    type: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    title: string,
    description: string,
    time: string,
    color:string,
    bgColor: string,
}

const activities = [
    {
        id: 1,
        type: "user",
        icon: Settings2,
        title: "Rendement",
        description: "Pour la journée en cours",
        time: "2 minutes ago",
        color:"text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/80"
    },
    {
        id: 2,
        type: "order",
        icon: GlassWaterIcon,
        title: "ILP",
        description:"Indice lineaire de pertes",
        time: "5 minutes ago",
        color: "text-emerald-500",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    {
        id: 3,
        type: "settings",
        icon: Settings,
        title: "ILF",
        description: "Indice linéaire de fuites",
        time: "2 minutes ago",
        color: "text-orange-500",
        bgColor: "bg-orange-100 dark:bg-orange-900/30"
    },
    {
        id: 1,
        type: "notification",
        icon: LucideGlassWater,
        title: "ILC",
        description: "Indice linéaire de consommation",
        time: "2 minutes ago",
        color: "text-red-500",
        bgColor: "bg-red-100 dark:bg-red-900/30"
    }
]

const ActivityFeed =  function () {

    const [currentHour, setCurrentHour] = useState(() => {
        return new Date().getHours();
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const newHour = new Date().getHours();
            setCurrentHour(prev => (prev !== newHour ? newHour : prev));
        }, 60000);
  
        return () => clearInterval(interval);
    }, []);

    const {data: graphics, isPending} = useQuery({
        queryKey: ["demand-vs-flow", currentHour],
        queryFn:  () => mainService.demandVsFlowChart(currentHour)
    })

    console.log("Les données renvoyés pour le rendement : ",  graphics)

    const rendement = graphics?.data[currentHour]

    console.log("Le rendement pour l'heure en cours: ", rendement)

    


    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl  border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50  transition-colors">

                <div className="">
                    <h3 className="text-lg  font-bold text-slate-800 dark:text-white">Indicateurs de performances</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-600">Activités  récentes</p>
                </div>

                <button className="text-sm font-medium text-blue-600  hover:text-blue-700">Voir tout</button>
            </div>


            <div className="p-6">
                <div className="space-y-4">

                    {activities.map(function(performance, index) {
                        
                        const value = rendement?.demandeTotale/rendement?.DébitInjecté

                        return (
                            <PerformanceCard
                                key={performance.id}
                                performance={performance}
                                value={value }
                            />
                        )
                    })}



                </div>
            </div>



        </div>


    )
}


export default ActivityFeed