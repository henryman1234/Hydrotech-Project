import React, { useEffect, useState } from "react";
import StatsGrid from "../components/StatsGrid";
import ChartSection from "./ChartSection";
import TableSection from "../components/TableSection";
import ActivityFeed from "../components/ActivityFeed";
import DiagnosticsGrid from "../components/DiagnosticGrid";
import DiagnosticsTable from "../components/DiagnosticsTable";


const Diagnostics = function () {



    return (
        <div className="space-y-6 sm:p-6  p-2">
            
            {/* DiagnosticsStats */}
            <DiagnosticsGrid/>

            {/* DiagnosticsTable */}
            <DiagnosticsTable/>

            {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                <div className="xl:col-span-2">
                    <TableSection/>
                </div>
                <div>
                    <ActivityFeed/>
                </div>
            </div> */}


        </div>
    )
}

export default Diagnostics