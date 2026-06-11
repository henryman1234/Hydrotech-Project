import { useQuery } from "@tanstack/react-query";
import { MinusSquare, MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { mainService } from "../../../services/mainService";

const recentsOrders = [
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "completed",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "pending",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "completed",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "cancelled",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "completed",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "pending",
        date: "2024-01-15"
    }
];

 const topProducts = [
    {
        name: "MacBook Pro 16",
        sales: 1234,
        revenue: "$2,987",
        trend: "up",
        change: "+12%"
    },
    {
        name: "iPhone 15 Pro",
        sales: 2156,
        revenue: "$2,587,044",
        trend: "up",
        change: "+12%"
    },
    {
        name: "Airpods Pro",
        sales: 2156,
        revenue: "$2,587,044",
        trend: "up",
        change: "+12%"
    },
    {
        name: "TV Smart",
        sales: 2552,
        revenue: "$2,587,044",
        trend: "up",
        change: "+12%"
    },
    {
        name: "Redmi Note",
        sales: 2552,
        revenue: "$663",
        trend: "down",
        change: "+12%"
    }
 ]


const TableSection = function () {

    const [currentHour, setCurrentHour] = useState(() => {
        return new Date().getHours();
    })

    useEffect(() => {
        const interval = setInterval(()=> {
            const newHour = new Date().getHours()
            setCurrentHour((prev) => prev !== newHour ? newHour : prev )
        }, 6000)


        return () => {
            clearInterval(interval)
        }
    },[])


    const {data: pipes} = useQuery({
        queryKey: ["pipes-data", currentHour],
        queryFn: () => mainService.pipesData(currentHour),
        refetchInterval: 5000
    })

    console.log("La table des pipes: ", pipes)

    const getVelocityColor = (velocity: number) => {

        if (velocity >= 0.15 && velocity <= 2) {
            return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
        }
    
        if (velocity < 0.15) {
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
        }
    
        if (velocity > 2) {
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        }
    
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    };

    // Pour les débits
    const {data:flow} = useQuery({
        queryKey: ["flows", currentHour],
        queryFn: () => mainService.flowData(currentHour),
        refetchInterval: 5000
    })

    console.log("Les débit: ", flow)

    return (

        <div className="space-y-6">

            <div className="bg-white/80 overflow-hidden dark:bg-slate-900/80 rounded-b-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">

                <div className="p-6 border-b shadow-lg border-slate-200/50 dark:border-slate-700/50 ">

                    <div className="flex items-center justify-between">
                        <div >
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Toutes le conduites</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Avec des anomalies</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">Voir tout</button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">ID conduite</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Nom conduite</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">pertes de charges</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Vitesse</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Date de pose</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pipes?.data.map(function(pipe:any, index:number) {
                                return (
                                    <tr key={index} className="border-b border-slate-200/50 dark:border-slate-700/50  hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">

                                        <td className="p-4">
                                            <span className="text-sm font-bold text-slate-800 dark:text-white">
                                                {pipe._id.slice(0, 6)}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                {pipe?.code}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                {pipe?.headloss} m
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className={`text-sm px-3 py-1 rounded-full  ${getVelocityColor(pipe?.velocity)}`}>
                                                {pipe?.velocity} m/s
                                            </span>
                                        </td>


                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                Depuis le {pipe?.date}
                                            </span>
                                        </td>

                                    </tr>)
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden rounded-2xl">

                <div className="p-6 border-b border-slate-200/50  dark:border-slate-700/50 ">
                    <div className="flex justify-between items-center">

                        <div className="text-lg font-bold text-slate-800 dark:text-white">
                            <h3 className="text-lg font-bold  ">Débits des conduites anormales</h3>
                        </div>

                        <p className="text-sm text-slate-500  daek:text-slate-400">
                          Bests performing products      
                        </p>
                    </div>
                    <button className="text-sm text-blue-600  hover:text-blue-700 font-medium">Voir tout</button>
                </div>

                {/* Flow data */}
                <div className="p-6 space-y-4 ">

                    {pipes?.data.map(function(pipe:any, index:number){

                        return (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 transition-colors">
                                
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{pipe.code}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{pipe._id.slice(0, 6)}</p>
                                </div>
                                

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{pipe.flow} </p>
                                    <div className="flex flex-row items-center  space-x-1">
                                        <TrendingUp className="size-4 text-emerald-500"/>

                                        <span className={`text-xs font-medium text-emerald-500`}>En hausse</span>
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

export default TableSection