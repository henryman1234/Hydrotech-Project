import { ArrowDown, ArrowUp, PiIcon } from "lucide-react"
import React from "react"
import { mainService } from "../../../services/mainService"
import { useQuery } from "@tanstack/react-query"

const LinearStats =  () => {

    const {data: linear, isError, isPending} = useQuery({
        queryKey: ["total-linear"],
        queryFn:  mainService.linear,
        refetchInterval: 5000
    })

    if (isError) {
        return  "Une érreur est survenue"
    }

    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl dark:border-gray-700/50 rounded-2xl  bg-white/80 dark:bg-slate-900/80 ">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">Linéaire Total </p>

                    <p className="text-3xl font-bold mb-2 text-slate-800 dark:text-white transition-colors">{linear?.totalLenghtKilo} Km</p>

                    <div className="flex items-center space-x-2">
                        <ArrowUp className="h-4 w-4 text-emerald-500"/>
                        <span className={`text-sm font-semibold  text-emerald-500`}>Hausse</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">vs Ancien</span>
                    </div>
                </div>
                
                {/* second */}
                <div className={`p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 group-hover:scale-110 transition-all duration-200`}>
                    <PiIcon  className={`w-6 h-6  text-emerald-600 dark:text-emerald-400  `}/>
                </div>

            </div>

        {/*Progressbar */}
        <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

            <div style={{width:  "75%" }} className={`bg-linear-to-r from-emerald-500 to-emerald-600 w-full rounded-full h-full transition-all duration-200`}>
            </div>
        </div>

    </div>
)}

export default LinearStats