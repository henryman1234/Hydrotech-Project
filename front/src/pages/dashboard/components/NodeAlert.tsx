import { CheckCheckIcon, SquareArrowUpRight } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import type { NodeAlertProps } from "../pages/Alerts"

const NodeAlert:React.FC<NodeAlertProps> = ({name, type, pressure}) => {

    const  [verified, setVerified] = useState(true)

    const getPressureColor = (pressure: number) => {

        if (pressure >= 50  ) {
            return "rounded-full w-4 h-4 bg-red-500";
        }
    
        if (pressure < 10 && pressure >= 0) {
            return "rounded-full w-4 h-4 bg-orange-400";
        }
    
    };

    const getTitle = (pressure: number) => {

        if (pressure > 50  ) {
            return "Pression élevée";
        }
    
        if (pressure < 10 && pressure >= 0) {
            return "Pression faible";
        }
    
    };

    const getText = (name:string, pressure:number) => {

        if (pressure > 50   ) {
            return <p className="mb-3 dark:text-slate-100 text-slate-800  text-sm ">Le noeud intitulé "{name}" possède une pression elévée de <strong>{pressure}</strong> mCE</p>
        }
    
        if (pressure < 10 && pressure >= 0) {
            return <p className="mb-3 dark:text-slate-100 text-slate-800  text-sm ">Le noeud intitulé "{name}" possède une pression faible de <strong>{pressure}</strong> mCE</p>
        }
    
    };

    
    return (

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50  block max-w-sm p-6  rounded-2xl  shadow-xs">
                        
            <div className="flex items-center space-x-3">
                <div className={`${getPressureColor(pressure)}`}></div>
                {verified && <CheckCheckIcon className="w-4 h-4 text-slate-800 dark:text-slate-100"/>}
            </div>

            <a href="#">
                <h5 className="text-xl mt-1 mb-2 dark:text-slate-100 text-slate-800 tracking-tight  font-semibold ">{getTitle(pressure)}</h5>
            </a>

            {/* <p className="mb-3 dark:text-slate-100 text-slate-800  text-sm ">Le noeud intitulé "{name}" possède une pression faible de <strong>{pressure}</strong> mCE </p> */}
            {getText(name, pressure)}

            <Link to="/dashboard/network"  className="font-medium text-blue-600 text-base hover:underline transition-all duration-200 space-x-4 inline-flex items-center" onClick={() => setVerified(true)}>

                Verifier sur le réseau

                <div className=" ms-2.5">
                    <SquareArrowUpRight className="size-4"/>
                </div>

            </Link>

        </div>
    )
}

export default NodeAlert