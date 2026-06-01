import React from "react";
import { Polyline, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import type { PipeData } from "../pages/Network";

type PipeProps = {
    pipe: PipeData;
    dynamicData?: {
        flow?: number | string;
        velocity?: number | string;
        headloss?: number | string;
    };
    isLowVelocity?: boolean;
    isHighVelocity?: boolean;
};

const Pipe = ({
    pipe,
    dynamicData,
    isLowVelocity,
    isHighVelocity 
}: PipeProps) => {

    const start = pipe.startNode?.location?.coordinates;
    const end = pipe.endNode?.location?.coordinates;

    // 🔒 sécurité anti-crash
    if (!start || !end) return null;

    const segment: LatLngTuple[] = [
        [start[0], start[1]],
        [end[0], end[1]]
    ];

    // 🎨 couleur dynamique selon vitesse
    const getColor = () => {
        if (isHighVelocity) return "#ef4444"; // rouge
        if (isLowVelocity) return "#f59e0b";  // orange
        return "#2563eb"; // bleu normal
    };

    return (
        <Polyline
            positions={segment}
            pathOptions={{
                weight: 8,
                opacity: 0.9,
                color: getColor(),
                interactive: true,
            }}
        >
            <Popup>
                <div className="w-full space-y-1">

                    <p className="text-sm font-semibold">
                        Nom : {pipe?.code}
                    </p>

                    <p className="text-sm font-medium">
                        Diamètre : {pipe?.diameter} mm
                    </p>

                    <p className="text-sm font-medium">
                        Longueur : {pipe?.length} m
                    </p>

                    <p className="text-sm font-medium">
                        Débit : {dynamicData?.flow ?? "--"} L/s
                    </p>

                    <p className="text-sm font-medium">
                        Vitesse : {dynamicData?.velocity ?? "--"} m/s
                    </p>

                    <p className="text-sm font-medium">
                        Pertes de charge : {dynamicData?.headloss ?? "--"} m
                    </p>

                    {isHighVelocity && (
                        <p className="text-red-600 font-semibold">
                            ⚠ Vitesse trop élevée
                        </p>
                    )}

                    {isLowVelocity && (
                        <p className="text-orange-600 font-semibold">
                            ⚠ Vitesse faible
                        </p>
                    )}

                </div>
            </Popup>
        </Polyline>
    );
};

export default Pipe;