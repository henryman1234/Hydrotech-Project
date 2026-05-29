import React from "react";

interface SimulationData  {
    hour: number,
    date: string
}

const SimulationInfo:React.FC<SimulationData> = function ({date, hour}) {
    return (
        <div className="fixed z-9999 top-23 right-4  backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-xl p-4">
            <div className="text-slate-600 mb-0.5 dark:text-slate-300">Date de surveillance:  {date}</div>
            <div className="text-slate-600 mb-0.5 dark:text-slate-300">Heure de surveillance:  {hour}H</div>
            <div className="text-slate-600 mb-0.5 dark:text-slate-300">Pattern:  Résidentiel</div>
        </div>
    )
}

export default SimulationInfo