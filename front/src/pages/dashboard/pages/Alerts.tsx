import { CheckCheckIcon, SquareArrowDownLeft, SquareArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NodeAlert from "../components/NodeAlert";
import { useQuery } from "@tanstack/react-query";
import { alertsServices } from "../../../services/alertsService";
import Diagnostics from "./Diagnostics";
import PipeAlert from "../components/PipeAlert";

export type NodeAlertProps = {
    pressure: number,
    name: string,
    type: string
}

export type PipeAlertProps = {
    code: string,
    flow: number,
    velocity: number
}

const Alerts = () => {

    const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
    
    useEffect(()=> {
        const interval = setInterval (() => {
            const newHour = new Date().getHours()
            setCurrentHour((prev) => prev !== newHour ? newHour : prev);
        }, 6000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const  {isLoading, data} = useQuery({
        queryKey: ["alerts", currentHour],
        queryFn: () => alertsServices.all(currentHour),
        // refetchInterval: 2000
    })

    console.log(data)

    const pressures = data?.warnings?.pressures

    const velocities = data?.warnings?.velocities

    const lowPressures = pressures?.low || []

    const greatPressures = pressures?.great || []


    const lowVelocities = velocities?.low || []
    
    const greatVelocities = velocities?.great || []


    if (isLoading) {
        return <div className="text-slate-800 dark:text-slate-100  p-4">
            Chargement des alertes en cours...
        </div>
    }

    return (
        
        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {lowPressures.map((alert:NodeAlertProps, index:number) => {
                return <NodeAlert {...alert} key={`low-pressure-${index}`}/>
            })}

            {greatPressures.map((alert:NodeAlertProps, index:number) => {
                return <NodeAlert {...alert} key={`great-pressure-${index}`}/>
            })}


            {lowVelocities.map((alert:PipeAlertProps, index:number) => {
                return <PipeAlert {...alert} key={`low-velocities-${index}`}/>
            })}

            {greatVelocities.map((alert:PipeAlertProps, index:number) => {
                return <PipeAlert {...alert} key={`great-velocities-${index}`} />
            })}


        </div>
    )
}

export default Alerts