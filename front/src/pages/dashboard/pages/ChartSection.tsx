import React from "react";
import DemandFlowInjectedChart from "../components/RevenueChart";
import PressuresChart from "../components/PressuresChart";


const ChartSection:React.FC =  function () {
    return(
        <div className="grid  grid-cols-1 xl:grid-cols-3 gap-6 overflow-auto">
            <div className="xl:col-span-2  ">
                <DemandFlowInjectedChart/>
            </div>
            <div className="space-y-6">
                <PressuresChart/>
            </div>
        </div>
    )
}

export default ChartSection