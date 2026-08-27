import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { NodeData } from "../pages/Network";

export type AlertType =
    | "negative-pressure"
    | "low-pressure"
    | "normal";

type PinProps = {
    node: NodeData;
    dynamicData?: {
        pressure?: number | string;
        elevation?: number | string;
        demand?: number | string;
        baseDemand?: number | string;
    };
    alertType?: AlertType,
    isScenarioMode: boolean;
};

const blueIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    iconSize: [25, 41],
});

const orangeIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    iconSize: [25, 41],
});

const redIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
});

const Node = ({
    node,
    dynamicData,
    alertType = "normal",
    isScenarioMode
    
}: PinProps) => {

    const position: [number, number] = [
        Number(node.location.coordinates[0]),
        Number(node.location.coordinates[1]),
    ];

    const icon = (() => {
        switch (alertType) {
            case "negative-pressure":
                return redIcon;
            case "low-pressure":
                return orangeIcon;
            default:
                return blueIcon;
        }
    })();


    return (
        <Marker position={position} icon={icon}>
            <Popup>

                {!isScenarioMode && <div className="bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 text-slate-800 w-full border p-4 rounded-2xl border-slate-200/50 dark:border-slate-700/50 dark:text-white">

                    <div className="border-b border-slate-200/50 dark:border-slate-500/50 pb-2 mb-2">
                        <h4 className="font-semibold text-sm">
                            {node.name}
                        </h4>

                        <p className="text-xs text-slate-500">
                            {node.type}
                        </p>
                    </div>

                    <div className="space-y-1 text-sm">

                        <p>
                            <strong>Altitude :</strong> {node.elevation} m
                        </p>

                        <p>
                            <strong>Pression :</strong>{" "}
                            {dynamicData?.pressure ?? "--"} mCE
                        </p>

                        <p>
                            <strong>Altimétrie :</strong>{" "}
                            {dynamicData?.elevation ?? "--"} m
                        </p>

                        <p>
                            <strong>Demande de base :</strong>{" "}
                            {node.baseDemand ?? 0} L/s
                        </p>

                        <p>
                            <strong>Demande réelle :</strong>{" "}
                            {dynamicData?.demand ?? "--"} L/s
                        </p>

                        {alertType === "negative-pressure" && (
                            <div className="mt-3 rounded-lg border border-red-300 bg-red-50 p-2 text-red-700 font-medium">
                                ⚠️ Pression négative détectée
                            </div>
                        )}

                        {alertType === "low-pressure" && (
                            <div className="mt-3 rounded-lg border border-orange-300 bg-orange-50 p-2 text-orange-700 font-medium">
                                ⚠️ Pression insuffisante (&lt; 10 mCE)
                            </div>
                        )}

                    </div>
                </div>}


                {isScenarioMode  && (
                    <div className="bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 text-slate-800 w-full border p-4 rounded-2xl border-slate-200/50 dark:border-slate-700/50 dark:text-white">

                        <h2>Mode scénario</h2>

                        <div className="border-b border-slate-200/50 dark:border-slate-500/50 pb-2 mb-2">
                            <h4 className="font-semibold text-sm">
                                {node.name}
                            </h4>

                            <p className="text-xs text-slate-500">
                                {node.type}
                            </p>
                        </div>

                        <div className="space-y-1 text-sm">

                            <p>
                                <strong>Altitude :</strong> {node.elevation} m
                            </p>

                            <p>
                                <strong>Pression :</strong>{" "}
                                {dynamicData?.pressure ?? "--"} mCE
                            </p>

                            <p>
                                <strong>Altimétrie :</strong>{" "}
                                {dynamicData?.elevation ?? "--"} m
                            </p>

                            <p>
                                <strong>Demande de base :</strong>{" "}
                                {node.baseDemand ?? 0} L/s
                            </p>

                            <p>
                                <strong>Demande réelle :</strong>{" "}
                                {dynamicData?.demand ?? "--"} L/s
                            </p>

                            {alertType === "negative-pressure" && (
                                <div className="mt-3 rounded-lg border border-red-300 bg-red-50 p-2 text-red-700 font-medium">
                                    ⚠️ Pression négative détectée
                                </div>
                            )}

                            {alertType === "low-pressure" && (
                                <div className="mt-3 rounded-lg border border-orange-300 bg-orange-50 p-2 text-orange-700 font-medium">
                                    ⚠️ Pression insuffisante (&lt; 10 mCE)
                                </div>
                            )}

                        </div>
                    </div>
                )}


            </Popup>
        </Marker>
    );
};

export default Node