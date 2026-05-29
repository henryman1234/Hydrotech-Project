import React from "react";
import { Polygon, Popup, Polyline } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import type { PipeData } from "../pages/Network";

const Pipe = function ({pipe, dynamicData}: {pipe: PipeData, dynamicData: any}) {

    const start = pipe.startNode?.location?.coordinates;
    const end = pipe.endNode?.location?.coordinates;


    const segment: LatLngTuple[] = [
        [start[0], start[1]],
        [end[0], end[1]]
    ];

    return (
        <Polyline
            positions={segment}
            pathOptions={{
                weight: 10,
                opacity: 1,
                color: "red",
                interactive: true,
            }}
        >
            <Popup>
                <div className="w-full">
                    <p className="text-sm font-semibold">Nom : {pipe?.code} </p>
                    <p className="text-sm font-medium">Diamètre : {pipe?.diameter} mm</p>
                    <p className="text-sm font-medium">Longeur : {pipe?.length} m</p>
                    <p className="text-sm font-medium">Débit : {dynamicData?.flow} </p>
                    <p className="text-sm font-medium">Vitesse : {dynamicData?.velocity} m/s</p>
                    <p className="text-sm font-medium">Charges : {dynamicData?.headloss} m</p>
                </div>
            </Popup>


        </Polyline>
    )
}

export default Pipe