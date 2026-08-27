
import React, { useDeferredValue, useEffect, useState } from "react";
import { Polyline, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import type { PipeData } from "../pages/Network";
import { IdCard, User, Watch } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { scenariosService } from "../../../services/scenariosService";

type PipeProps = {
    pipe: PipeData;
    dynamicData?: {
        flow?: number | string;
        velocity?: number | string;
        headloss?: number | string;
    };
    isLowVelocity?: boolean;
    isHighVelocity?: boolean,
    isScenarioMode: boolean;
};

const Pipe = ({
    pipe,
    dynamicData,
    isLowVelocity,
    isHighVelocity,
    isScenarioMode
}: PipeProps) => {

    // Vérifie que la géométrie existe
    if (
        !pipe.geometry ||
        pipe.geometry.type !== "LineString" ||
        !pipe.geometry.coordinates?.length
    ) {
        return null;
    }

    // Conversion GeoJSON [longitude, latitude] -> Leaflet [latitude, longitude]
    const positions: LatLngTuple[] = pipe.geometry.coordinates.map(
        ([lat, lng]) => [lat, lng] as LatLngTuple
    );

    const getColor = () => {
        if (isHighVelocity) return "#ef4444"; // Rouge
        if (isLowVelocity) return "#f59e0b";  // Orange
        return "#2563eb"; // Bleu
    };

    
    
    // Logique du mode scénario
    const scenarioSchema = z.object({
        diameter: z.number(),
        length: z.number(),
        roughness: z.number(),
        hour: z.number(),
        pipeId: z.string()
    })

    type scenarioData = z.infer<typeof scenarioSchema>

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(scenarioSchema)})

    const [currentHour, setCurrentHour] = useState(() => new Date().getHours())

    useEffect(() => {
        const timer = setTimeout(() => {
            const newHour = new Date().getHours()
            setCurrentHour((prev) =>  currentHour !== newHour ? newHour: prev)
        }, 60000)

        return () => {
            clearInterval(timer);
        }
    }, [])



    const mutation = useMutation({

        mutationKey: [currentHour],

        mutationFn: scenariosService.runScenario,

        onSuccess: (data) => {

            const {success} = data;
            console.log("La simulation a réssi: ", success)
            console.log("Les données renvoyées: ", data)

            toast.success("La simulation a réussi !");
        },
        onError: (error: any) =>  {
            const message = error?.response?.data?.message || "Une érreur est survénue lors du scénario !"
            toast.error(message)
        }
    })

    const onSubmit = (data: scenarioData) => mutation.mutate(data);

    return (
        <Polyline
            positions={positions}
            pathOptions={{
                color: getColor(),
                weight: 8,
                opacity: 0.9,
                interactive: true,
            }}
        >
            <Popup minWidth={400}  maxWidth={500}>

                 {!isScenarioMode && (<div className="w-full space-y-1">

                    <p className="text-sm font-semibold">
                        Nom : {pipe.code}
                    </p>

                    <p className="text-sm font-medium">
                        Diamètre : {pipe.diameter} mm
                    </p>

                    <p className="text-sm font-medium">
                        Longueur : {pipe.length} m
                    </p>

                    <p className="text-sm font-medium">
                        Rugosité : {pipe.roughness} 
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

                </div>)}


                {isScenarioMode && (<div className="w-full space-y-1">

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">

                    <h2 className="text-base text-slate-900 mb-2 font-semibold">Mode scénario</h2>

                        <div>
                            <label htmlFor="diameter" className="text-gray-700 mb-2 text-base ">Diamètre</label>
                            <div className="mb-2 relative">
                                <User className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3"/>
                                <input type="text" 
                                placeholder="Saisissez votre diamètre"
                                {...register("diameter", {valueAsNumber: true})}
                                defaultValue={pipe.diameter}
                                id="diameter"
                                className="rounded-lg text-sm border  border-gray-300 text-dark transition-all w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            {errors.diameter  &&  <p className="text-red-400 text-sm mt-2">{errors.diameter.message}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="length" className="text-base text-gray-700 mb-2">Longueur</label>
                            <div className="mb-2 relative">
                                <User className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3 "/>
                                <input 
                                    type="text" 
                                    placeholder="Saisissez la longueur"
                                    id="length"
                                    {...register("length", {valueAsNumber: true})}
                                    defaultValue={pipe.length}
                                    className="rounded-lg text-sm border border-gray-300 transition-all w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            {errors.length && <p className="text-sm text-red-400 mt-2">{errors.length.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="rugosity" className="text-base mb-2 text-gray-700">Rugosité</label>
                            <div className="relative mb-2">
                                <User className="size-5  absolute  inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 mb-2 left-3" />
                                <input 
                                    type="text"
                                    placeholder="Saisissez une rugosité"
                                    id="rugosity"
                                    {...register("roughness", {valueAsNumber: true})}
                                    defaultValue={pipe.roughness}
                                    className="w-full py-3 text-sm pr-3 pl-10 border border-gray-300 rounded-lg focus:outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                 />
                            </div>
                            {errors.roughness && <p className="text-sm text-red-400 mt-2">{errors.roughness.message}</p>}
                        </div>

                        <div>
                            <label className="text-base text-slate-600 mb-2" htmlFor="currentHour">Heure de scénario</label>
                            <div className="relative mb-2">
                                <Watch className="text-gray-400 absolute left-3 inset-y-0 top-1/2 -translate-y-1/2 mb-2"/>
                                <input 
                                    type="text"
                                    {...register("hour", {valueAsNumber: true})}
                                    placeholder="Saissisez une heure de scénario"
                                    defaultValue={currentHour}
                                    id="currentHour"
                                    className="text-sm rounded-lg w-full focus:ring-2 focus:ring-purple-500 py-3 pl-10 pr-3 border border-gray-300 focus:outline-none focus:border-purple-500 transition-all duration-200 "
                                 />
                            </div>
                            {errors.hour  &&  <p className="mt-2 text-red-500 text-sm">{errors.hour.message}</p>}
                        </div>

                        <div>
                            <label id="pipeID" className="text-base mb-2 text-slate-700">ID conduite</label>

                            <div className="relative mb-2">
                                <IdCard  className="absolute size-5 text-gray-400 mb-2 inset-y-0 top-1/2 -translate-y-1/2 left-3"/>
                                <input 
                                    type="text"
                                    {...register("pipeId")}
                                    defaultValue={pipe._id}
                                    placeholder="ID de la conduite"
                                    id="pipeID"
                                    className="w-full py-3 border border-gray-300 pl-10 pr-3 text-sm rounded-lg focus:ring-2 focus:border-purple-500 transition-all duration-200 focus:outline-none focus:ring-purple-500"
                                />
                            </div>
                            {errors.pipeId && <p className="mt-2 text-sm text-red-500">{errors.pipeId.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="flow" className="text-base mb-2 text-gray-700">Débit <b className="text-xs text-red-500">*à ne pas modifier</b></label>
                            <div className="relative mb-2">
                                <User className="size-5  absolute  inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 mb-2 left-3" />
                                <input 
                                    type="text"
                                    placeholder="Saisissez une rugosité"
                                    id="flow"
                                    defaultValue={dynamicData?.flow}
                                    className="w-full py-3 text-sm pr-3 pl-10 border border-gray-300 rounded-lg focus:outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                 />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="velocity" className="text-base mb-2 text-gray-700">Vitesse (m/s) <b className="text-xs text-red-500">*à ne pas modifier</b></label>
                            <div className="relative mb-2">
                                <User className="size-5  absolute  inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 mb-2 left-3" />
                                <input 
                                    type="text"
                                    placeholder="Saisissez une rugosité"
                                    id="velocity"
                                    defaultValue={dynamicData?.velocity}
                                    className="w-full py-3 text-sm pr-3 pl-10 border border-gray-300 rounded-lg focus:outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                 />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="losses" className="text-base mb-2 text-gray-700">Pertes de charges (m) <b className="text-xs text-red-500">*à ne pas modifier</b></label>
                            <div className="relative mb-2">
                                <User className="size-5  absolute  inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 mb-2 left-3" />
                                <input 
                                    type="text"
                                    placeholder="Saisissez une perte de charges"
                                    id="losses"
                                    defaultValue={dynamicData?.headloss}
                                    className="w-full py-3 text-sm pr-3 pl-10 border border-gray-300 rounded-lg focus:outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                 />
                            </div>
                        </div>

                        <button
                            className="w-full px-4 py-3 flex items-center justify-center bg-purple-500 text-white transition-all duration-200 hover:bg-purple-600 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed border border-gray-300 focus:outline-none focus:ring-2 focus:border-purple-500 rounded-lg mt-3"
                        >
                            Simuler
                        </button>

                    </form>

                    </div>
                )}

            </Popup>
        </Polyline>
    );
};

export default Pipe;