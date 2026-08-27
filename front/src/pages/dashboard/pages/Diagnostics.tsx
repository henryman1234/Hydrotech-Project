import React, { useEffect, useState } from "react";
import StatsGrid from "../components/StatsGrid";
import ChartSection from "./ChartSection";
import TableSection from "../components/TableSection";
import ActivityFeed from "../components/ActivityFeed";
import DiagnosticsGrid from "../components/DiagnosticGrid";
import DiagnosticsTable from "../components/DiagnosticsTable";
import RecommendationCard from "../components/RecomendationCard";
import { CircleArrowUp, CookingPot, Ruler, ShieldAlert, WavesArrowDown } from "lucide-react";



const diagnosticsData = [
    {
        title: "Optimiser les diamètres",
        desc: "Plusieurs conduites presentent des vitesses anormales.Reviser les diamètre pour augmenter l'éfficacité du réseau",
        icon: Ruler
    },
    {
        title: "Améliorer le renouvellement",
        desc: "Zones à faibles vitesses détectés.Mettre en place des purges régulières ou augmenter le débit dans ces secteurs",
        icon: CircleArrowUp
    },
    {
        title: "Vérifier l'alimentation",
        desc: "Des sous-pression détectées dans plusieurs noeuds.Vérifier les pompes et la capacité des reservoirs",
        icon: WavesArrowDown
    },
    {
        title: "Surveiller les risques",
        desc: "Surveiller régulièrement les zones critiques pour prévénir les riques d'infiltration et d'usure",
        icon: ShieldAlert
    }
]


const Diagnostics = function () {


    return (
        <div className="space-y-6 sm:p-6  p-2">
            
            {/* DiagnosticsStats */}
            <DiagnosticsGrid/>

            {/* DiagnosticsTable */}
            <DiagnosticsTable/>


            <h2 className="text-sm sm:text-xl text-emerald-600 dark:text-emerald-400 font-medium">Recommendations générales</h2>


            <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
                
                {diagnosticsData.map((diagnostic, index:number) => {
                    return (
                        <RecommendationCard {...diagnostic}/>
                    )
                })}                
            </div>


        </div>
    )
}

export default Diagnostics