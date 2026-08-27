import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowRightToLine, Ruler } from "lucide-react";
import React, { useEffect, useState } from "react";
import { diagnosticsService } from "../../../services/diagnosticsService";


const CriticsCard = ()  => {

    const  [currentHour, setCurrentHour] = useState(() => {
        return  new Date().getHours()
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const newHour = new Date().getHours()
            setCurrentHour((prev) => prev !== newHour ? newHour : prev)
        }, 6000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const {data:critics} = useQuery({
        queryKey: ["critics-cards", currentHour],
        queryFn: () => diagnosticsService.critics(currentHour),
        refetchInterval: 5000
    })

    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl  dark:border-gray-700/50 rounded-xl  bg-white/80 dark:bg-slate-900/80 ">


            <div className="flex items-start justify-between gap-10">

                {/* First */}
                <div className={`p-3 rounded-full size-18 sm:size-20 bg-red-50 dark:bg-red-900/40 flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                    <AlertTriangle  className={`size-10 sm:size-12  text-red-600 dark:text-red-400  `}/>
                </div>
                
                {/* Second */}
                <div className="flex-1 ">

                    <p className="text-5xl font-bold mb-2 text-red-600 dark:text-red-400 transition-colors">{critics?.data?.criticalNodes?.negative?.count}</p>


                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">{critics?.data?.criticalNodes?.negative?.title}</p>


                    <div className="flex  flex-col ">

                        <div className="flex items-center space-x-1 mb-2 ">
                            <ArrowRightToLine className="h-4 w-4 text-red-500"/>
                            <span className={`text-sm font-semibold  text-red-500`}>{critics?.data?.criticalNodes?.negative?.desc}</span>
                        </div>

                        <span className="text-slate-500  dark:text-slate-400 text-sm"> nécessaire</span>
                    </div>
                </div>
                

            </div>

        {/*Progressbar */}
        <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

            <div style={{width:  "100%" }} className={`bg-linear-to-r from-red-500 to-red-600 w-full rounded-full h-full transition-all duration-200`}>
            </div>
        </div>

    </div>
    )
}

export default CriticsCard