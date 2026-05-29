import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const recentsOrders = [
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "completed",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "pending",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "completed",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "cancelled",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "completed",
        date: "2024-01-15"
    },
    {   id: "#3847",
        customer: "John Smith",
        product: "MacBook Pro 16",
        amount: "$2,399",
        status: "pending",
        date: "2024-01-15"
    }
];

 const topProducts = [
    {
        name: "MacBook Pro 16",
        sales: 1234,
        revenue: "$2,987",
        trend: "up",
        change: "+12%"
    },
    {
        name: "iPhone 15 Pro",
        sales: 2156,
        revenue: "$2,587,044",
        trend: "up",
        change: "+12%"
    },
    {
        name: "Airpods Pro",
        sales: 2156,
        revenue: "$2,587,044",
        trend: "up",
        change: "+12%"
    },
    {
        name: "TV Smart",
        sales: 2552,
        revenue: "$2,587,044",
        trend: "up",
        change: "+12%"
    },
    {
        name: "Redmi Note",
        sales: 2552,
        revenue: "$663",
        trend: "down",
        change: "+12%"
    }
 ]


const TableSection = function () {

    const getStatusColor = function (status:string) {
        switch(status) {
            case "completed":
                return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                break;
            case "pending":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                break;
            case "cancelled":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                break;
            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
        }
    }

    return (

        <div className="space-y-6">

            <div className="bg-white/80 overflow-hidden dark:bg-slate-900/80 rounded-b-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">

                <div className="p-6 border-b shadow-lg border-slate-200/50 dark:border-slate-700/50 ">

                    <div className="flex items-center justify-between">
                        <div >
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recents orders</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Latest customers orders</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">Voir tout</button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Order ID</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Product</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Amount</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentsOrders.map(function(order, index) {
                                return (
                                    <tr key={index} className="border-b border-slate-200/50 dark:border-slate-700/50  hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">

                                        <td className="p-4">
                                            <span className="text-sm font-bold text-slate-800 dark:text-white">
                                                {order.id}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                {order.product}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                {order.amount}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className={`text-sm px-3 py-1 rounded-full  ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                {order.date}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm text-slate-800 dark:text-white">
                                                <MoreHorizontal className="w-4 h-4"/>
                                            </span>
                                        </td>

                                    </tr>)
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden rounded-2xl">

                <div className="p-6 border-b border-slate-200/50  dark:border-slate-700/50 ">
                    <div className="flex justify-between items-center">

                        <div className="text-lg font-bold text-slate-800 dark:text-white">
                            <h3 className="text-lg font-bold  ">Top Products</h3>
                        </div>

                        <p className="text-sm text-slate-500  daek:text-slate-400">
                          Bests performing products      
                        </p>
                    </div>
                    <button className="text-sm text-blue-600  hover:text-blue-700 font-medium">Voir tout</button>
                </div>

                {/* Dynamic data */}
                <div className="p-6 space-y-4 ">
                    {topProducts.map(function(product, index){
                        return (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 transition-colors">
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{product.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{product.sales}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{product.revenue}</p>
                                    <div className="flex flex-row items-center  space-x-1">
                                        {product.trend === "up" ?<TrendingUp className="size-4 text-emerald-500"/> : <TrendingDown className="size-4  text-red-500"/>}

                                        <span className={`text-xs font-medium ${product.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>{product.change}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>



        </div>

    )
}

export default TableSection