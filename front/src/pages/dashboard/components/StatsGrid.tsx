import { ArrowDown, ArrowRight, ArrowUp, DollarSign, Eye, ShoppingCart, User } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mainService } from "../../../services/mainService";
import LinearStats from "./LinearStats";
import SmallVelocityStat from "./SmallVelocityStat";
import GreatVelocityStat from "./greatVelocityStat";
import GreatPressureStat from "./greatPressureStat";

export const Stats = [
    {
        title: "Total Revenue",
        value:  "2000 XAF",
        change: "+12,5%",
        trend: "up",
        icon: DollarSign,
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
        title: "Active Users",
        value:  "3400",
        change: "+8,5%",
        trend: "up",
        icon: User,
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        title: "Total Orders",
        value:  "3500",
        change: "+18,5%",
        trend: "up",
        icon: ShoppingCart,
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-600 dark:text-purple-400"
    },
    {
        title: "Total Views",
        value:  "456773",
        change: "-2.1%",
        trend: "down",
        icon: Eye,
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-600 dark:text-orange-400"
    }
]

const StatsGrid:React.FC = function () {

 

    return (
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* {Stats.map((grid, index:number) => {

            const Icon = grid.icon
            return (
                <StatGridItem  Icon={Icon} grid={grid} />
            )
        })} */}

        <LinearStats/>
        <SmallVelocityStat/>
        <GreatVelocityStat/>
        <GreatPressureStat/>

        </div>)
    }

export default StatsGrid