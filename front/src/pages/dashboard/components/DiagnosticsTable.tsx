import React, { useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    createColumnHelper,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

// import {
//     AlertTriangle,
//     CheckCircle,
//     Search,
// } from "lucide-react";

// type Diagnostic = {
//     code: string;
//     velocity: number;
//     flow: number;
//     status: "critical" | "warning" | "normal";
//     message: string;
// };

// const data: Diagnostic[] = [
//     {
//         code: "P-001",
//         velocity: 2.85,
//         flow: 32.4,
//         status: "critical",
//         message: "Vitesse trop élevée",
//     },
//     {
//         code: "P-018",
//         velocity: 0.07,
//         flow: 1.8,
//         status: "warning",
//         message: "Vitesse trop faible",
//     },
//     {
//         code: "P-112",
//         velocity: 1.25,
//         flow: 18.7,
//         status: "normal",
//         message: "Conforme",
//     },
//     {
//         code: "P-205",
//         velocity: 2.31,
//         flow: 27.4,
//         status: "critical",
//         message: "Vitesse trop élevée",
//     },
//     {
//         code: "P-321",
//         velocity: 0.12,
//         flow: 3.2,
//         status: "warning",
//         message: "Risque de dépôt",
//     },
// ];

// const columnHelper = createColumnHelper<Diagnostic>();

// const columns = [
//     columnHelper.accessor("code", {
//         header: "Conduite",
//     }),

//     columnHelper.accessor("velocity", {
//         header: "Vitesse",
//         cell: ({ getValue }) => (
//             <span>{getValue().toFixed(2)} m/s</span>
//         ),
//     }),

//     columnHelper.accessor("flow", {
//         header: "Débit",
//         cell: ({ getValue }) => (
//             <span>{getValue().toFixed(2)} L/s</span>
//         ),
//     }),

//     columnHelper.accessor("status", {
//         header: "État",
//         cell: ({ getValue }) => {
//             const status = getValue();

//             if (status === "critical") {
//                 return (
//                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
//                         Critique
//                     </span>
//                 );
//             }

//             if (status === "warning") {
//                 return (
//                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
//                         Alerte
//                     </span>
//                 );
//             }

//             return (
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
//                     Conforme
//                 </span>
//             );
//         },
//     }),

//     columnHelper.accessor("message", {
//         header: "Diagnostic",
//     }),
// ];

// const DiagnosticsTable = () => {
//     const [globalFilter, setGlobalFilter] = useState("");

//     const filteredData = useMemo(() => {
//         return data.filter((item) =>
//             item.code
//                 .toLowerCase()
//                 .includes(globalFilter.toLowerCase())
//         );
//     }, [globalFilter]);

//     const table = useReactTable({
//         data: filteredData,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//     });

//     return (
//         <div className="space-y-6">

//             {/* Header */}
//             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">

//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//                     <div>
//                         <h2 className="text-xl font-bold text-slate-800 dark:text-white">
//                             Diagnostics réseau
//                         </h2>

//                         <p className="text-sm text-slate-500">
//                             Analyse des conduites critiques
//                         </p>
//                     </div>

//                     <div className="relative w-full lg:w-80">
//                         <Search
//                             className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                             size={18}
//                         />

//                         <input
//                             value={globalFilter}
//                             onChange={(e) =>
//                                 setGlobalFilter(e.target.value)
//                             }
//                             placeholder="Rechercher une conduite..."
//                             className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//                 <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
//                     <div className="flex items-center gap-3">

//                         <AlertTriangle className="text-red-500" />

//                         <div>
//                             <p className="text-sm text-slate-500">
//                                 Critiques
//                             </p>

//                             <h3 className="text-2xl font-bold">
//                                 12
//                             </h3>
//                         </div>

//                     </div>
//                 </div>

//                 <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
//                     <div className="flex items-center gap-3">

//                         <AlertTriangle className="text-amber-500" />

//                         <div>
//                             <p className="text-sm text-slate-500">
//                                 Alertes
//                             </p>

//                             <h3 className="text-2xl font-bold">
//                                 8
//                             </h3>
//                         </div>

//                     </div>
//                 </div>

//                 <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
//                     <div className="flex items-center gap-3">

//                         <CheckCircle className="text-emerald-500" />

//                         <div>
//                             <p className="text-sm text-slate-500">
//                                 Conformes
//                             </p>

//                             <h3 className="text-2xl font-bold">
//                                 124
//                             </h3>
//                         </div>

//                     </div>
//                 </div>

//             </div>

//             {/* Table */}
//             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

//                 <div className="overflow-x-auto">

//                     <table className="w-full">

//                         <thead className="bg-slate-50 dark:bg-slate-800">

//                             {table.getHeaderGroups().map((headerGroup) => (
//                                 <tr key={headerGroup.id}>

//                                     {headerGroup.headers.map((header) => (
//                                         <th
//                                             key={header.id}
//                                             className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300"
//                                         >
//                                             {flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                         </th>
//                                     ))}

//                                 </tr>
//                             ))}

//                         </thead>

//                         <tbody>

//                             {table.getRowModel().rows.map((row) => (
//                                 <tr
//                                     key={row.id}
//                                     className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
//                                 >

//                                     {row.getVisibleCells().map((cell) => (
//                                         <td
//                                             key={cell.id}
//                                             className="px-6 py-4 text-sm"
//                                         >
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </td>
//                                     ))}

//                                 </tr>
//                             ))}

//                         </tbody>

//                     </table>

//                 </div>

//                 {/* Pagination */}

//                 <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">

//                     <button
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}
//                         className="px-4 py-2 rounded-xl border disabled:opacity-50"
//                     >
//                         Précédent
//                     </button>

//                     <span className="text-sm text-slate-500">
//                         Page{" "}
//                         {table.getState().pagination.pageIndex + 1}
//                     </span>

//                     <button
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}
//                         className="px-4 py-2 rounded-xl border disabled:opacity-50"
//                     >
//                         Suivant
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default DiagnosticsTable;

interface DiagnosticData {
    code:  string,
    type: string,
    value: number,
    diagnostic: string,
    severity:  "élévée" | "critique" | "moyenne"
    recommendation: string,
    localisation: string
}

const data: DiagnosticData[] = [
    {
        code: "P-12",
        type: "Stagnation",
        value: 0.08,
        diagnostic: "Faible renouvellement de l'eau, risque de dégradation de la qualité",
        severity: "moyenne",
        recommendation: "Réduire le diamètre ou augmenter le débit",
        localisation: "voir sur la carte"
    },
    {
        code: "P-14",
        type: "Vitesse élévée",
        value: 2.89,
        diagnostic: "Vitesse excessive dans la conduite, risque d'usure et d'abrasion",
        severity: "élévée",
        recommendation: "Véifier le diamètre ou installer un réducteur",
        localisation: "voir sur la carte"
    },
    {
        code: "P-0021",
        type: "Sous-pression",
        value: 4.20,
        diagnostic: "Pression insuffisantes, usagers mal alimentés",
        severity: "élévée",
        recommendation: "Vérifier les pertes de charges, améliorer l'alimentation",
        localisation: "voir sur la carte"
    },
    {
        code: "P-00221",
        type: "Sous-pression",
        value: 8.20,
        diagnostic: "Pression insuffisantes, usagers mal alimentés",
        severity: "moyenne",
        recommendation: "Vérifier les pertes de charges, améliorer l'alimentation",
        localisation: "voir sur la carte"
    },
    {
        code: "P-0331",
        type: "Pression négative",
        value: -5.08,
        diagnostic: "Risque d'infiltration, situation critique",
        severity: "critique",
        recommendation: "Vérifier le fonctionnement du reservoir / des pompes",
        localisation: "voir sur la carte"
    },
    {
        code: "P-1433",
        type: "Vitesse élévée",
        value: 2.39,
        diagnostic: "Vitesse excessive dans la conduite, risque d'usure et d'abrasion",
        severity: "moyenne",
        recommendation: "Véifier le diamètre ou installer un réducteur",
        localisation: "voir sur la carte"
    },

];

const columnHelper = createColumnHelper<DiagnosticData>()

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

    const [globalFilter, setGlobalFilter] = useState("");

    const filteredData =  useMemo(()=>{
        return data.filter((item, index) => item.code.toLowerCase().includes(globalFilter.toLowerCase()))
    }, [data, globalFilter])

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
                            className="pr-4 py-3 w-full border text-slate-600 dark:text-slate-400  pl-10 placeholder-slate-500  border-slate-300 dark:border-slate-700 rounded-2xl outline-none" 
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