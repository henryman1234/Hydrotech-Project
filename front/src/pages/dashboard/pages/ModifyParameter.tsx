import React, { useEffect, useMemo, useState } from "react";
import {MapContainer, TileLayer, Popup, Marker, Polyline} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { nodeService } from "../../../services/nodeService";
import { type AlertType } from "../components/Node";
import { pipeService } from "../../../services/pipeService";
import Pipe from "../components/Pipe";
import { scenariosService } from "../../../services/scenariosService";
import ScenariosInfo from "../components/ScenariosInfo";
import Node from "../components/Node";


export type PipeData = {
  _id: string,
  code: string,
  diameter: number,
  material: string
  velocity?: number, 
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

const ModifyDiameter = () => {

  const [currentHour, setCurrentHour] = useState(
      () => new Date().getHours()
  );

  const currentDay = new Date().toLocaleDateString("fr-FR");

  const [isScenarioMode, setIsScenarioMode] = useState<boolean>(false)



  useEffect(() => {
    const state = window.localStorage.getItem("mode_scenario")

    if (!state) {
        return ;
    }

    setIsScenarioMode(JSON.parse(state));

  }, [])

  useEffect(()=> {
    if (!isScenarioMode)  return;

    window.localStorage.setItem("mode_scenario", JSON.stringify(isScenarioMode))

  }, [isScenarioMode])


  /**
   * ⏱ Sync heure locale
   */
  useEffect(() => {
      const interval = setInterval(() => {
          const newHour = new Date().getHours();
          setCurrentHour(prev => (prev !== newHour ? newHour : prev));
      }, 60000);

      return () => clearInterval(interval);
  }, []);

  /**
   * 📊 Simulation API
   */
  const { data: resultsData } = useQuery({
      queryKey: ["results-per-hours", currentHour],
      queryFn: () => scenariosService.fetchSimulatedResultsByHour(currentHour),
      refetchInterval: 5000
  });


  // Tous les snapshot
  const {data: snapshots} = useQuery({
    queryKey: ["all-results"],
    queryFn: scenariosService.fetchSimulatedResults,
    refetchInterval: 5000
  })
  const currentSnapshot = resultsData?.data;


  console.log("Résultats spécifiques à une heure: ", resultsData)
  console.log("Tous les snapshots: ", snapshots)


  /**
   * =========================
   * ⚠️ ALERTES NOEUDS
   * =========================
   */

  const negativePressureIds = useMemo(() => {
      return new Set(
          (resultsData?.warnings?.pressures?.negative || []).map(
              (n: any) => String(n._id)
          )
      );
  }, [resultsData]);

  const lowPressureIds = useMemo(() => {
      return new Set(
          (resultsData?.warnings?.pressures?.low || []).map(
              (n: any) => String(n._id)
          )
      );
  }, [resultsData]);

  

  /**
   * =========================
   * ⚠️ ALERTES CONDUITES
   * =========================
   */

  const lowVelocityIds = useMemo(() => {
      return new Set(
          (resultsData?.warnings?.velocities?.low || []).map(
              (p: any) => String(p._id)
          )
      );
  }, [resultsData]);

  const highVelocityIds = useMemo(() => {
      return new Set(
          (resultsData?.warnings?.velocities?.great || []).map(
              (p: any) => String(p._id)
          )
      );
  }, [resultsData]);

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


          {/* ScenarioInfo */}
          <ScenariosInfo
                hour={currentHour}
                date={currentDay}
                isScenarioMode={isScenarioMode}
                setIsScenarioMode={setIsScenarioMode}
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


export default ModifyDiameter