import React from "react";
import RevenueChart from "../components/RevenueChart";
import SalesChart from "../components/SalesChart";


const ChartSection:React.FC =  function () {
    return(
        <div className="grid  grid-cols-1 xl:grid-cols-3 gap-6 overflow-auto">
            <div className="xl:col-span-2 ">
                <RevenueChart/>
            </div>
            <div className="space-y-6">
                <SalesChart/>
            </div>
        </div>
    )
}

export default ChartSection