import React, { useId, type ChangeEvent, type SetStateAction } from "react";
import {motion} from "framer-motion"

interface NetworkData  {
    hour: number,
    date: string,
    isScenarioMode: boolean
    setIsScenarioMode: React.Dispatch<SetStateAction<boolean>>
}

const ScenariosInfo:React.FC<NetworkData> = function ({date, hour, isScenarioMode, setIsScenarioMode}) {

    const toggleSwitch = () => {
        setIsScenarioMode((prev) => !prev)
    }

    return (
        <div className="fixed z-9999 top-23  max-w-md right-4  backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-xl p-4">

            <div className="text-slate-600 mb-0.5 dark:text-slate-300 text-lg md:text-xl">Date de surveillance:  <span className="font-bold">{date}</span></div>
            <div className="text-slate-600 mb-0.5 dark:text-slate-300 text-lg md:text-xl">Heure de surveillance:  <span className="font-bold">{hour}H</span></div>
            <div className="text-slate-600 mb-1 dark:text-slate-300 text-lg md:text-xl">Pattern:  <span className="font-bold">Résidentiel</span></div>
            <div className="text-slate-600 mb-1 dark:text-slate-300 text-lg md:text-xl">Mode: {isScenarioMode ? <span className="font-bold">Scénario</span> : <span className="font-bold">Normal</span>}</div>

            {/*Switcher de mode en mode */}
            <button
                className={`w-20 p-3  h-8  flex items-center ${isScenarioMode ? "justify-start" : "justify-end"}  bg-slate-700 dark:bg-slate-300 rounded-2xl`}
                onClick={toggleSwitch}
                
            >
                <motion.div 
                    layout
                    transition={{type: "tween", bounce: 0.2 , visualDuration:  0.4}}
                    className="w-7 h-7  rounded-full bg-slate-200 dark:bg-slate-700"
                />
            </button>
        </div>
    )
}

export default ScenariosInfo