import { ArrowDown, ArrowUp, FastForward, Flashlight, PiIcon, Ruler, Train } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { mainService } from "../../../services/mainService"
import { useQuery } from "@tanstack/react-query"
import type { PipeData } from "../pages/Network"

const SmallVelocityStat =  () => {

    const [currentHour, setCurrentHour] = useState(() => {
        return new Date().getHours();
    })

    useEffect(function(){
        const interval = setInterval(() => {
            const newHour = new Date().getHours();
            if (currentHour !== newHour) {
                setCurrentHour(newHour)
            }
        }, 6000)

        return () => {
            clearInterval(interval);
        }

    }, [currentHour])

    const {data:velocities , isError, isPending} = useQuery({
        queryKey: ["velocity", currentHour],
        queryFn:  () => mainService.details(currentHour),
    })

    const linksArray = Object.entries(velocities?.data?.links ?? {}).map(([id, link]) => ({
        ...(link as Record<string, unknown>),
        id,
    }))

    const velocityArray = linksArray.map((link:any, index) => {
        return link?.velocity
    })

    const smallestVelocity =  useMemo(() => {
        return Math.min(...velocityArray)
    }, [velocityArray])


    if (isError) {
        return  "Une érreur est survenue"
    }

    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl dark:border-gray-700/50 rounded-2xl  bg-white/80 dark:bg-slate-900/80 ">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">Plus pétite vitesse</p>

                    <p className="text-3xl font-bold mb-2 text-slate-800 dark:text-white transition-colors">{smallestVelocity} m/s</p>

                    <div className="flex items-center space-x-2">
                        {smallestVelocity > 0 ? <ArrowUp className="h-4 w-4 text-emerald-500"/>: <ArrowDown className="h-4 w-4 text-red-500"/>}
                        <span className={`${smallestVelocity > 0  ? "text-sm font-semibold  text-emerald-500" :"text-sm font-semibold  text-red-500"}`}>{smallestVelocity > 0 ? "En Hausse" : "En baise"}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">vs Ancien</span>
                    </div>
                </div>
                
                {/* second */}
                <div className={`p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 group-hover:scale-110 transition-all duration-200`}>
                    <FastForward  className={`w-6 h-6  text-blue-600 dark:text-blue-400  `}/>
                </div>

            </div>

        {/*Progressbar */}
        <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

            <div style={{width:  "75%" }} className={`bg-linear-to-r from-blue-500 to-indigo-600 w-full rounded-full h-full transition-all duration-200`}>
            </div>
        </div>

    </div>
)}

export default SmallVelocityStat