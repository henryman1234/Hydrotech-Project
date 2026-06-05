import { ArrowDown, ArrowUp, CircleGauge, FastForward, Flashlight, FlashlightIcon, Gauge, LucideGauge, PiIcon, Ruler, Train } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { mainService } from "../../../services/mainService"
import { useQuery } from "@tanstack/react-query"
import type { PipeData } from "../pages/Network"

const GreatVelocityStat =  () => {

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


    const {data:velocities , isError, isPending} = useQuery({
        queryKey: ["velocity", currentHour],
        queryFn:  () => mainService.details(currentHour)
    })

    const linksArray = Object.entries(velocities?.data?.links ?? {}).map(([id, link]) => ({
        ...(link as Record<string, unknown>),
        id,
    }))

    const velocityArray = linksArray.map((link:any, index) => {
        return link?.velocity
    })

    const greatestVelocity =  useMemo(() => {
        return Math.max(...velocityArray)
    }, [velocityArray])


    if (isError) {
        return  "Une érreur est survenue"
    }

    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl dark:border-gray-700/50 rounded-2xl  bg-white/80 dark:bg-slate-900/80 ">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">Plus grande vitesse</p>

                    <p className="text-3xl font-bold mb-2 text-slate-800 dark:text-white transition-colors">{greatestVelocity} m/s</p>

                    <div className="flex items-center space-x-2">
                        {greatestVelocity > 0 ? <ArrowUp className="h-4 w-4 text-emerald-500"/>: <ArrowDown className="h-4 w-4 text-red-500"/>}
                        <span className={`${greatestVelocity > 0  ? "text-sm font-semibold  text-emerald-500" :"text-sm font-semibold  text-red-500"}`}>{greatestVelocity > 0 ? "En Hausse" : "En baise"}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">vs Ancien</span>
                    </div>
                </div>
                
                {/* second */}
                <div className={`p-3 rounded-xl bg-orange-50 dark:bg-orange-900/40 group-hover:scale-110 transition-all duration-200`}>
                    <LucideGauge  className={`w-6 h-6  text-orange-600 dark:text-orange-400  `}/>
                </div>

            </div>

        {/*Progressbar */}
        <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

            <div style={{width:  "90%" }} className={`bg-linear-to-r from-orange-500 to-orange-600 w-full rounded-full h-full transition-all duration-200`}>
            </div>
        </div>

    </div>
)}

export default GreatVelocityStat