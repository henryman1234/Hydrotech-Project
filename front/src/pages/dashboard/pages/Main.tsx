import React, { useEffect, useState } from "react";
import StatsGrid from "../components/StatsGrid";
import ChartSection from "./ChartSection";
import TableSection from "../components/TableSection";
import ActivityFeed from "../components/ActivityFeed";

const Main = function () {



    return (
        <div className="space-y-6 sm:p-6 p-2">
            
            {/* StatsGrid */}
            <StatsGrid/>

            {/* Chartsection */}
            <ChartSection/>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                <div className="xl:col-span-2">
                    <TableSection/>
                </div>
                <div>
                    <ActivityFeed/>
                </div>
            </div>


        </div>
    )
}

export default Main