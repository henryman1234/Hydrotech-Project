import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet"
import type { NodeData } from "../pages/Network";




const Pin = function ({node, dynamicData}: {node: NodeData, dynamicData: any}) {

    const position: [number, number] = [node.location?.coordinates[0], node.location?.coordinates[1]]


    // Personnaliser les icones
    const getIcon = function (type: string) {
        return new L.Icon({
            iconUrl: "" ,
            iconSize: [25, 25]
        })
    }

    return (
        <div className="">

           <Marker position={position}>

                <Popup >
                    <div className="bg-white/80 backdrop-blur-xl  dark:bg-slate-900/80 text-slate-800 w-full border p-4 rounded-2xl border-slate-200/50 dark:border-slate-700/50 dark:text-white" >

                        <div className="border-b  border-slate-200/50 dark:border-slate-500/50 pb-2">

                            <h4 className="font-semibold  text-sm">{node?.name}</h4>

                        </div>
                        <div className="text-sm">
                            <p className="">
                                altitude: {node?.elevation} m
                            </p>
                            <p className="">
                                Pression actuelle: {dynamicData?.pressure}
                            </p> 
                            <p className="">
                                Altimétrie: {dynamicData?.elevation}
                            </p>
                            <p className="">
                                Demande de base: {node.baseDemand} L/s
                            </p>
                            <p className="">
                                Demande réelle: {dynamicData?.demand} L/s
                            </p>

                        </div>
                       

                    </div>
                </Popup>
            </Marker>

        </div>
    )
}

export default Pin