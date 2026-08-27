import React, { useId, type ChangeEvent, type SetStateAction } from "react";

interface SimulationData  {
    hour: number,
    date: string,
    onHourChange: (arg:number) => void
}

const SimulationInfo:React.FC<SimulationData> = function ({date, hour, onHourChange}) {

    console.log("Hour: ", hour)
    console.log("date: ", date)
    
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onHourChange(Number(e.target.value))
    } 

    return (
        <div className="fixed z-9999 top-23  max-w-md right-4  backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-xl p-4">
            <div className="text-slate-600 mb-0.5 dark:text-slate-300 text-base md:text-xl">Date de surveillance:  <span className="font-bold">{date}</span></div>
            <div className="text-slate-600 mb-0.5 dark:text-slate-300 text-base md:text-xl">Heure de surveillance:  <span className="font-bold">{hour}H</span></div>
            <div className="text-slate-600 mb-4 dark:text-slate-300 text-base md:text-xl">Pattern:  <span className="font-bold">Résidentiel</span></div>

            <div className="text-xl">
                
                <label htmlFor="select" className="text-base md:text-lg text-slate-700 dark:text-slate-200 mb-2 ">Heure de simulation voulue</label>

                <select
                    id="select"
                    value={hour}
                    onChange={handleChange}
                    className="w-full rounded-xl scrollbar-thin border-2 border-blue-500
                    bg-white
                    dark:bg-slate-800
                    text-slate-900/80
                    dark:text-slate-200
                    px-4
                    py-3
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all
                    duration-200
                    cursor-pointer" 
                >
                    {Array.from({length: 25}).map((_, i) => {
                        return (
                            <option
                                key={i}
                                value={i}
                            >
                                {i}H
                            </option>
                        )
                    })}

                </select>

            </div>


        </div>
    )
}

export default SimulationInfo