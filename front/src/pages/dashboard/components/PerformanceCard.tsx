import { Clock } from "lucide-react";
import React from "react";
import type { PerformanceType } from "./ActivityFeed";

type Props = {
    performance: PerformanceType,
    value:  number
}


const PerformanceCard:React.FC<Props> = ({performance, value}) => {

    const Icon = performance.icon
    console.log("value: ", value)
    console.log("type de rendement: ", typeof  value)

    return (
        <div className="flex  items-start space-x-4 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50  transition-colors">

            <div className={`p-2 rounded-lg bg-linear-to-r ${performance.bgColor}`}>
                <Icon className={`size-7 ${performance.color}`}/>
            </div>
        
            <div className="flex-1 min-w-0">
                <h4 className="text-xl font-semibold text-slate-800 dark:text-white">{performance.title}</h4>
                <p className="text-slate-600  text-base truncate dark:text-slate-400">{performance.description}</p>

                <div className="flex items-center-safe space-x-1 mt-1">
                    <span className="text-3xl font-bold text-slate-500  dark:text-slate-400">{performance.title === "Rendement" && value*100 || 0}</span>
                    <span className="size-5 text-slate-400">{performance.title === "Rendement"  &&  "%"}</span>


                </div>

            </div>

        </div>
    )
}

export default PerformanceCard