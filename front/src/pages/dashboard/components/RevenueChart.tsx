import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { mainService } from "../../../services/mainService";

// const data = [
//     {month: "Jan", revenue: 45000, expenses: 32000},
//     {month: "Feb", revenue: 52000, expenses: 30000},
//     {month: "Mar", revenue: 45000, expenses: 32000},
//     {month: "Apr", revenue: 50000, expenses: 38000},
//     {month: "May", revenue: 60000, expenses: 30000},
//     {month: "Jun", revenue: 58000, expenses: 55000},
//     {month: "July", revenue: 65000, expenses: 32000},
//     {month: "Aug", revenue: 70000, expenses: 55000},
//     {month: "Sep", revenue: 69000, expenses: 68000},
//     {month: "Oct", revenue: 45000, expenses: 32000},
//     {month: "Nov", revenue: 45000, expenses: 32000},
//     {month: "Dec", revenue: 89000, expenses: 58000}
// ];

const RevenueChart:React.FC = function () {

    const [currentHour, setCurrentHour] = useState(() => {
        return new Date().getHours();
    })

    useEffect(function(){
        const interval = setInterval(() => {
            const newHour = new Date().getHours();
            if (newHour !== currentHour) {
                setCurrentHour(newHour);
            }
            setCurrentHour(currentHour) 
        }, 6000)

        return function () {
            clearInterval(interval)
        }
    }, [currentHour])

    const {data: graphics, isPending} = useQuery({
        queryKey: ["demand-vs-flow", currentHour],
        queryFn:  () => mainService.demandVsFlowChart(currentHour)
    })

    console.log("Les données renvoyés pour le graphiques: ",  graphics)

    if (isPending) {
        return (
            <div className="p-4 text-slate-600 dark:text-slate-300">
                Chargement des données en cours...
            </div>
        )
    }

    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center  justify-between mb-6 p-6">
                <div >
                    <div >
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            Demandes moyennes-débits injectés
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Valeurs calculées pour chaque heure</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">

                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <span>Demandes</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-linear-to-r from-slate-400 to-slate-500 rounded-full"></div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <span>Débits</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graphics?.data || []} margin={{top: 20, left: 20, right: 30, bottom: 5}}>
                        <CartesianGrid 
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            opacity={0.5}
                        />
                        <XAxis
                            dataKey="heure"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}H`}

                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            // tickFormatter={(value) => `$${value / 1000}K`}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "none",
                                borderRadius: "12px",
                                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
                            }}
                            formatter={(value, name) => [
                                `${Number(value ?? 0).toFixed(2)} L/s`,
                                String(name),
                            ]}
                        />

                        <Bar
                            dataKey="demandeTotale"
                            fill="url(#demandGradient)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />

                        <Bar
                            dataKey="DébitInjecté"
                            fill="url(#injectedFlowGradient)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />

                        <defs>
                            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6"/>
                                <stop offset="100%" stopColor="#8b5cf6"/>
                            </linearGradient>
                            <linearGradient id="injectedFlowGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#94a3b8"/>
                                <stop offset="100%" stopColor="#64748b"/>
                            </linearGradient>
                        </defs>


                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}

export default RevenueChart