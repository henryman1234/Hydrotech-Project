import React from "react";
import CriticsCard from "./DiagnosticsCriticsCard";
import StagnationRiskCard from "./StagnationRiskCard";
import SubPressionCard from "./SubPressionCard";
import UsureCard from "./UsureCard";
import OthersRisksCard from "./OthersRisksCard";


const DiagnosticsGrid = () => {
    
    return (
        <div className="grid md:grid-cols-2 gap-4 grid-cols-1 xl:grid-cols-4">

            <CriticsCard/>
            <StagnationRiskCard/>
            <SubPressionCard/>
            <UsureCard/>

        </div>
    )
}

export default DiagnosticsGrid