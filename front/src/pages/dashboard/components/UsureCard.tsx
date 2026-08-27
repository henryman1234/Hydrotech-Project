import { AlertTriangle, ArrowRightToLine, GaugeCircle, Ruler } from "lucide-react";
import React, { useEffect, useState } from "react";
import { diagnosticsService } from "../../../services/diagnosticsService";
import { useQuery } from "@tanstack/react-query";


const UsureCard = ()  => {


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

    const {data: velocities} = useQuery({
        queryKey: ["great-velocity", currentHour],
        queryFn: () => diagnosticsService.greatVelocity(currentHour),
        refetchInterval: 5000
    })

    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl  dark:border-gray-700/50 rounded-xl  bg-white/80 dark:bg-slate-900/80 ">


            <div className="flex items-start justify-between gap-10">

                {/* First */}
                <div className={`p-3 rounded-full sm:size-20  size-18  bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                    <GaugeCircle  className={`sm:size-12 size-10  text-violet-600 dark:text-violet-400  `}/>
                </div>
                
                {/* Second */}
                <div className="flex-1 ">

                    <p className="text-5xl font-bold mb-2 text-violet-600 dark:text-violet-400 transition-colors">{velocities?.data?.great?.count}</p>


                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">{velocities?.data?.great?.title}</p>


                    <div className="flex  flex-col ">

                        <div className="flex items-center space-x-1 mb-2 ">
                            <ArrowRightToLine className="h-4 w-4 text-violet-500"/>
                            <span className={`text-sm font-semibold  text-violet-500`}>Vitesse trop</span>
                        </div>

                        <span className="text-slate-500  dark:text-slate-400 text-sm">elévée</span>
                    </div>
                </div>
                

            </div>

        {/*Progressbar */}
        <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

            <div style={{width:  "100%" }} className={`bg-linear-to-r from-violet-500 to-cyan-600 w-full rounded-full h-full transition-all duration-200`}>
            </div>
        </div>

    </div>
    )
}

export default UsureCard