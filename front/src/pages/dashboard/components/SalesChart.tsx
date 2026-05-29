import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    {name: "Electronics", value: 45, color: "#3b82f6"},
    {name: "Clothings", value: 30, color: "#8b5cf6"},
    {name: "Books", value: 15, color: "#10b981"},
    {name: "Others", value: 10, color: "#f59e0b"}
];

const SalesChart = function () {

    return (
        <div className="bg-white/80 dark:bg-slate-900 rounded-b-2xl backdrop-blur-xl p-6 border-slate-200/50 dark:border-slate-700/50">

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Sales by Categories</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Production Distribution</p>
            </div>

            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                        >
                            {data.map(function(entry, index){
                                return (
                                    <Cell key={`cell-${index}`} fill={entry.color}/>
                                )
                            })}
                        </Pie>
                            

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "none",
                                borderRadius: "12px",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>
            </div>

            <div className="space-y-3">
                {data.map(function(item, index) {
                    return (
                        <div className="flex items-center justify-between">

                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                                
                            </div>
                            <div className="text-slate-800 dark:text-slate-100 text-sm">{item.value} %</div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}


export default  SalesChart