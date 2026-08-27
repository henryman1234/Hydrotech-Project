import React, { useId, type ChangeEvent, type SetStateAction } from "react";

interface NetworkData  {
    hour: number,
    date: string,
}

const NetworkInfo:React.FC<NetworkData> = function ({date, hour}) {

    console.log("Hour: ", hour)
    console.log("date: ", date)

    return (
        <div className="fixed z-9999 top-23  max-w-md right-4  backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-xl p-4">
            <div className="text-slate-600 mb-0.5 dark:text-slate-300 text-lg md:text-xl">Date de surveillance:  <span className="font-bold">{date}</span></div>
            <div className="text-slate-600 mb-0.5 dark:text-slate-300 text-lg md:text-xl">Heure de surveillance:  <span className="font-bold">{hour}H</span></div>
            <div className="text-slate-600 mb-1 dark:text-slate-300 text-lg md:text-xl">Pattern:  <span className="font-bold">Résidentiel</span></div>

        </div>
    )
}

export default NetworkInfo