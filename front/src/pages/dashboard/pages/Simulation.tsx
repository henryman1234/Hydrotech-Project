import React, { useEffect, useState } from "react";
import {MapContainer, TileLayer, Popup, Marker, Polyline} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { nodeService } from "../../../services/nodeService";
import Pin from "../components/Pin";
import { pipeService } from "../../../services/pipeService";
import Pipe from "../components/Pipe";
import { networkService } from "../../../services/networkService";
import SimulationInfo from "../components/SimulationInfo";
import type { NodeData, PipeData } from "./Network";
import { simulationService } from "../../../services/simulationService";



const Simulation = function () {

  const date = new Date();
  const localHour = date.getHours()

  const [currentHour, setCurrentHour] = useState(() => {
    return localHour;
  })

  const currentDay = new Date().toLocaleDateString("fr-FR")

  // Mise à jour automatique si l'heure change
  useEffect(() => {
    const interval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== currentHour) {
        setCurrentHour(newHour);
      }
    }, 60000); // Vérifie chaque minute

    return () => clearInterval(interval);
  }, [currentHour]);

//   Données issues de la surveillance rééle pour une heure
  const {data: resultsData} = useQuery({
    queryKey: ["simulations", currentHour],
    queryFn: () => simulationService.fetchSimulationsByHour(currentHour),
    refetchInterval: 5000
  })

  const currentSnapshot = resultsData?.data

  console.log("Résultats spécifiques à une heure: ", resultsData)

//   Resultats du réseau général
//   const  {data: allResults} = useQuery({
//     queryKey: ["all-results"],
//     queryFn: networkService.fetchSimulatedResults,
//     refetchInterval: 1000
//   })

//   console.log("Tous les resultats: ", allResults)

  
  const position:[number, number] = [3.854933,  11.500602];

//   Nodes statiques
  const  {isLoading, error, data:nodes} = useQuery({
    queryKey: ["water-nodes"],
    queryFn: nodeService.all,
    refetchInterval: 5000
  })

//   Pipes statiques
  const  {data:pipes} = useQuery({
    queryKey: ["water-pipes"],
    queryFn: pipeService.all,
    refetchInterval: 5000
  })

    if (isLoading) {
      return (
        <div className="text-base text-slate-800 dark:text-white">
          Chargement de la carte en cours...
        </div>
      )
    }

    if (error) {
      console.log("Une érreur est survénue: ", error?.message)
    }

    return (
        <MapContainer 
            center={position} 
            zoom={30} 
            scrollWheelZoom={false}
            style={{width: "100%", height: "100vh"}}
        >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Simulation Data */}
        <SimulationInfo 
          hour={currentHour} 
          date={currentDay}
        />

        {/* Adding nodes */}
       {nodes?.data?.map(function(node: NodeData){
          return (
            <Pin
              key={node?._id}
              node={node}
              dynamicData={currentSnapshot?.nodes?.[node._id]}
            />
          )
       })}


        {/* Adding pipes */}
        {pipes?.data?.map(function(pipe: PipeData){
          return (
            <Pipe 
              pipe={pipe} 
              key={pipe?._id}
              dynamicData={currentSnapshot?.links?.[pipe._id]}
            />
          )
        })}

      </MapContainer>
    )
}

export default Simulation