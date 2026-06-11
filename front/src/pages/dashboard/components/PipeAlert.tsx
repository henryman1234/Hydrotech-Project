import { CheckCheckIcon, SquareArrowUpRight } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import type { PipeAlertProps } from "../pages/Alerts"


const PipeAlert:React.FC<PipeAlertProps> = ({code, flow, velocity}) => {

    const  [verified, setVerified] = useState(true)

    const getVelocityColor = (velocity: number) => {

        if (velocity > 2  ) {
            return "rounded-full w-4 h-4 bg-red-500";
        }
    
        if (velocity < 0.15) {
            return "rounded-full w-4 h-4 bg-orange-400";
        }
    
    };

    const getTitle = (velocity:number) => {

        if (velocity > 2  ) {
            return "Vitesse élevée";
        }
    
        if (velocity < 0.15) {
            return "Vitesse faible";
        }
    
    };

    const getText = (code:string, velocity:number) => {

        if (velocity > 2  ) {
            return <p className="mb-3 dark:text-slate-100 text-slate-800  text-sm ">La conduite intitulé "{code}" possède une vitesse elévée de <strong>{velocity}</strong> m/s</p>
        }
    
        if (velocity < 0.15) {
            return <p className="mb-3 dark:text-slate-100 text-slate-800  text-sm ">La conduite intitulé "{code}" possède une vitesse faible de <strong>{velocity}</strong> m/s</p>
        }
    
    };

    
    return (

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50  block max-w-sm p-6  rounded-2xl  shadow-xs">
                        
            <div className="flex items-center space-x-3">
                <div className={`${getVelocityColor(velocity)}`}></div>
                {verified && <CheckCheckIcon className="w-4 h-4 text-slate-800 dark:text-slate-100"/>}
            </div>

            <a href="#">
                <h5 className="text-xl mt-1 mb-2 dark:text-slate-100 text-slate-800  ndd tracking-tight  font-semibold ">{getTitle(velocity)}</h5>
            </a>

            {/* <p className="mb-3 dark:text-slate-100 text-slate-800  text-sm ">{getText(code, velocity)}</p> */}
            {getText(code, velocity)}

            <Link to="/dashboard/network"  className="font-medium text-blue-600 text-base hover:underline transition-all duration-200 space-x-4 inline-flex items-center" onClick={() => setVerified(true)}>

                Verifier sur le réseau

                <div className=" ms-2.5">
                    <SquareArrowUpRight className="size-4"/>
                </div>

            </Link>

        </div>
    )
}

export default PipeAlert