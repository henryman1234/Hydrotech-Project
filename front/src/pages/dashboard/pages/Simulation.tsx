import React, { useEffect, useMemo, useState } from "react";
import {MapContainer, TileLayer, Popup, Marker, Polyline} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { nodeService } from "../../../services/nodeService";
import Pin, { type AlertType } from "../components/Pin";
import { pipeService } from "../../../services/pipeService";
import Pipe from "../components/Pipe";
import { networkService } from "../../../services/networkService";
import SimulationInfo from "../components/SimulationInfo";


export type PipeData = {
  _id: string,
  code: string,
  diameter: number,
  material: string
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

const Network = () => {

  const [currentHour, setCurrentHour] = useState(
      () => new Date().getHours()
  );

  const currentDay = new Date().toLocaleDateString("fr-FR");

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
      queryFn: () => networkService.fetchSimulatedResultsByHour(currentHour),
      refetchInterval: 5000
  });


  // Tous les snapshot
  const {data: snapshots} = useQuery({
    queryKey: ["all-results"],
    queryFn: networkService.fetchSimulatedResults,
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

  console.log("Resultats de surveillance: ", lowPressureIds, negativePressureIds)
  

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
                  <Pin
                      key={node._id}
                      node={node}
                      dynamicData={dynamicNode}
                      alertType={alertType}
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
                  />
              );
          })}
      </MapContainer>
  );
};


export default Network