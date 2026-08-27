import React, { useEffect, useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    createColumnHelper,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { diagnosticsService } from "../../../services/diagnosticsService";
import { useQuery } from "@tanstack/react-query";


interface DiagnosticData {
    code:  string,
    type: string,
    value: number,
    diagnostic: string,
    severity:  "élévée" | "critique" | "moyenne"
    recommendation: string,
    localisation: string
}

// const data: DiagnosticData[] = [
//     {
//         code: "P-12",
//         type: "Stagnation",
//         value: 0.08,
//         diagnostic: "Faible renouvellement de l'eau, risque de dégradation de la qualité",
//         severity: "moyenne",
//         recommendation: "Réduire le diamètre ou augmenter le débit",
//         localisation: "voir sur la carte"
//     },
//     {
//         code: "P-14",
//         type: "Vitesse élévée",
//         value: 2.89,
//         diagnostic: "Vitesse excessive dans la conduite, risque d'usure et d'abrasion",
//         severity: "élévée",
//         recommendation: "Véifier le diamètre ou installer un réducteur",
//         localisation: "voir sur la carte"
//     },
//     {
//         code: "P-0021",
//         type: "Sous-pression",
//         value: 4.20,
//         diagnostic: "Pression insuffisantes, usagers mal alimentés",
//         severity: "élévée",
//         recommendation: "Vérifier les pertes de charges, améliorer l'alimentation",
//         localisation: "voir sur la carte"
//     },
//     {
//         code: "P-00221",
//         type: "Sous-pression",
//         value: 8.20,
//         diagnostic: "Pression insuffisantes, usagers mal alimentés",
//         severity: "moyenne",
//         recommendation: "Vérifier les pertes de charges, améliorer l'alimentation",
//         localisation: "voir sur la carte"
//     },
//     {
//         code: "P-0331",
//         type: "Pression négative",
//         value: -5.08,
//         diagnostic: "Risque d'infiltration, situation critique",
//         severity: "critique",
//         recommendation: "Vérifier le fonctionnement du reservoir / des pompes",
//         localisation: "voir sur la carte"
//     },
//     {
//         code: "P-1433",
//         type: "Vitesse élévée",
//         value: 2.39,
//         diagnostic: "Vitesse excessive dans la conduite, risque d'usure et d'abrasion",
//         severity: "moyenne",
//         recommendation: "Véifier le diamètre ou installer un réducteur",
//         localisation: "voir sur la carte"
//     },

// ];

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor("code", {header: "Code Element"}),
    columnHelper.accessor("type", {header: "Type d'alerte"}),
    columnHelper.accessor("value", {header: "Valeur", cell: ({getValue}) => {
        const value = getValue()

        return `${value}`
    }}),
    columnHelper.accessor("diagnostic", {header: "Diagnostic"}),

    columnHelper.accessor("severity", {header: "Sévérité", cell: ({getValue}) => {
        const  severity = getValue()

        if (severity === "moyenne") {

           return <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 text-sm px-3 py-1 rounded-full">
                Moyenne
            </span>
        }

        if (severity === "critique") {
            return (
                <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm px-3 py-1 rounded-full">
                    Critique
                </span>
            );
        }

        if (severity === "élévée") {
            return (
                <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm px-3 py-1 rounded-full">
                    Elévée
                </span>
            );
        }

    } }),


    columnHelper.accessor("recommendation", {header: "Recommendation"}),
    columnHelper.accessor("localisation", {header: "Localisation"}),
]



const DiagnosticsTable = () => {

        // Fetch real data
        const [currentHour, setCurrentHour] = useState(() => {
            return new Date().getHours();
        })
    
        useEffect(function(){
            const interval = setInterval(() => {
                const newHour = new Date().getHours();
                if (newHour !== currentHour) {
                    setCurrentHour(newHour);
                }
                setCurrentHour(currentHour) 
            }, 6000)
    
            return function () {
                clearInterval(interval)
            }
        }, [currentHour])
    
        const {data:real , isError, isPending} = useQuery({
            queryKey: ["table-diagnostics", currentHour],
            queryFn:  () => diagnosticsService.table(currentHour)
        })

        const array = real?.data || [];
    
        // ====================================

    const [globalFilter, setGlobalFilter] = useState("");

    const filteredData =  useMemo(()=>{
        return array.filter((item, index) => item.code.toLowerCase().includes(globalFilter.toLowerCase()))
    }, [array, globalFilter])

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    })


    return (
        <div className="space-y-4">
            
            {/* Header */}
            <div className="flex shadow-xs items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border rounded-xl p-4 border-slate-200/50 dark:border-slate-700/50 ">

                <div className="">
                    <h2 className="font-semibold text-base sm:text-xl text-slate-600 dark:text-slate-400 tracking-tight">Detais des diagnostics</h2>
                </div>

                <div className="">

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-slate-500"/>
                        <input 
                            className="pr-4 py-2 w-full border text-slate-600 dark:text-slate-400  pl-10 placeholder-slate-500  border-slate-300 dark:border-slate-700 rounded-2xl outline-none" 
                            type="text" value={globalFilter} 
                            placeholder="Rechercher..." 
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>


                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border rounded-xl border-slate-200/50 dark:border-slate-700/50 w-full overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full text-left border-collapse">

                    <thead className="bg-slate-50 dark:bg-slate-800">

                        {table.getHeaderGroups().map((headerGroup) => (

                            <tr key={headerGroup.id}>

                                {headerGroup.headers.map((header) => (

                                    <th key={header.id} className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">

                                        {flexRender(header.column.columnDef.header, header.getContext())}

                                    </th>

                                ))}

                            </tr>

                        ))}

                    </thead>

                    <tbody>

                        {table.getRowModel().rows.map((row) => (

                            <tr key={row.id} className="border-t border-slate-200 dark:border-slate-700  dark:bg-slate-800 bg-slate-100  transition-colors">

                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}

                            </tr>
                        ))}
                        
                    </tbody>

                </table>
            </div>

            {/* Pagination (Sorti de la table) */}
            <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-4 py-2 rounded-xl border border-slate-600 dark:border-slate-400 text-sm text-slate-600 dark:text-slate-200 disabled:opacity-50"
                >
                    Précédent
                </button>

                <span className="text-sm text-slate-500">
                    Page {table.getState().pagination.pageIndex + 1}
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-2 rounded-xl border border-slate-600 dark:border-slate-400 text-sm text-slate-600 dark:text-slate-200 disabled:opacity-50"
                >
                    Suivant
                </button>
            </div>

        </div>

        </div>
    )
}

export default DiagnosticsTable