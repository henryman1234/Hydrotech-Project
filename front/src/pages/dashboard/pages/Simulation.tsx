import React, { useEffect, useMemo, useState } from "react";
import {MapContainer, TileLayer, Popup, Marker, Polyline} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { nodeService } from "../../../services/nodeService";
import Pin, { type AlertType } from "../components/Node";
import { pipeService } from "../../../services/pipeService";
import Pipe from "../components/Pipe";
import SimulationInfo from "../components/SimulationInfo";
import { simulationService } from "../../../services/simulationService";
import Node from "../components/Node";


export type PipeData = {
  _id: string,
  code: string,
  diameter: number,
  material: string,
  roughness: number,
  length: number,
  startNode: {
    location: {
      coordinates: number[]
    }
  },
  endNode: {
    location: {
      coordinates: number[]
    }
  },
  geometry: {
    type: "LineString",
    coordinates: number[][]
  }
} 

export type NodeData = {
  _id: string
  name: string,
  type: string,
  baseDemand?: number,
  elevation: number,
  location: {
    type: string,
    coordinates: number[]
  }
}

const Simulation = () => {


  const [currentHour, setCurrentHour] = useState<number>(0);

  const currentDay = new Date().toLocaleDateString("fr-FR");

  const [isScenarioMode, setIsScenarioMode] = useState(false)



  // Tous les snapshot
  const {data: snapshots} = useQuery({
    queryKey: ["all-results"],
    queryFn: simulationService.fetchSimulatedResults,
    refetchInterval: 5000
  })

  const currentSnapshot = useMemo(() => {
    return snapshots?.results?.data?.times?.find((snapshot:any, index:number) => currentHour === snapshot?.Heure)
  }, [currentHour, snapshots])


    // On greffe les warnings  
  const { data } = useQuery({
      queryKey: ["results-per-hours"],
      queryFn: () => simulationService.fetchSimulationsByHour(currentSnapshot?.Heure),
      refetchInterval: 5000
  });


  console.log("Tous les snapshots: ", snapshots)

  console.log("Données spécifique à cette heure dans la simulation: ", currentSnapshot)

  console.log("Snapshot avec les warnings: ", data)


  /**
   * =========================
   * ⚠️ ALERTES NOEUDS
   * =========================
   */

  const negativePressureIds = useMemo(() => {
      return new Set(
          (data?.warnings?.pressures?.negative || []).map(
              (n: any) => String(n._id)
          )
      );
  }, [data]);

  const lowPressureIds = useMemo(() => {
      return new Set(
          (data?.warnings?.pressures?.low || []).map(
              (n: any) => String(n._id)
          )
      );
  }, [data]);

  console.log("Resultats de surveillance: ", lowPressureIds, negativePressureIds)
  

  /**
   * =========================
   * ⚠️ ALERTES CONDUITES
   * =========================
   */

  const lowVelocityIds = useMemo(() => {
      return new Set(
          (data?.warnings?.velocities?.low || []).map(
              (p: any) => String(p._id)
          )
      );
  }, [data]);

  const highVelocityIds = useMemo(() => {
      return new Set(
          (data?.warnings?.velocities?.great || []).map(
              (p: any) => String(p._id)
          )
      );
  }, [data]);

  console.log("Resultats de surveillance: ", lowVelocityIds, highVelocityIds)

  const position: [number, number] = [3.854933, 11.500602];
  

  /**
   * =========================
   * 🧱 LOADING
   * =========================
   */
  const { data: nodes, isLoading, error } = useQuery({
      queryKey: ["water-nodes"],
      queryFn: nodeService.all,
      refetchInterval: 5000
  });

  const { data: pipes } = useQuery({
      queryKey: ["water-pipes"],
      queryFn: pipeService.all,
      refetchInterval: 5000
  });

  if (isLoading) {
      return <div>Chargement de la carte...</div>;
  }

  if (error) {
      return <div>Erreur de chargement</div>;
  }

  return (
      <MapContainer
          center={position}
          zoom={30}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100vh" }}
      >
          <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <SimulationInfo
              hour={currentHour}
              date={currentDay}
              onHourChange={setCurrentHour}
          />


          {/* =========================
              🟢 NŒUDS
          ========================= */}
          {nodes?.data?.map((node: NodeData) => {


              const dynamicNode = currentSnapshot?.nodes?.[node._id];

              const isNegative = negativePressureIds.has(node._id);

              const isLowPressure = lowPressureIds.has(node._id);

              let alertType: AlertType = "normal";

              if (isNegative) alertType = "negative-pressure";

              else if (isLowPressure) alertType = "low-pressure";

              return (
                  <Node
                      key={node._id}
                      node={node}
                      dynamicData={dynamicNode}
                      alertType={alertType}
                      isScenarioMode={isScenarioMode}
                  />
              );
          })}

          {/* =========================
              🔵 CONDUITES
          ========================= */}
          {pipes?.data?.map((pipe: PipeData) => {


              const dynamicPipe = currentSnapshot?.links?.[pipe?._id];

              const isLowVelocity = lowVelocityIds.has(pipe._id);

              const isHighVelocity = highVelocityIds.has(pipe._id);

              return (
                  <Pipe
                      key={pipe?._id}
                      pipe={pipe}
                      dynamicData={dynamicPipe}
                      isLowVelocity={isLowVelocity}
                      isHighVelocity={isHighVelocity}
                      isScenarioMode={isScenarioMode}
                  />
              );
          })}
      </MapContainer>
  );
};


export default Simulation 