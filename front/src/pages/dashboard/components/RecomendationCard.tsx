import { AlertTriangle, ArrowRightToLine, Ruler, type LucideProps } from "lucide-react";
import React, { type ForwardRefExoticComponent, type RefAttributes } from "react";

interface RecomendationCardProps {
    title:string,
    desc: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const RecommendationCard:React.FC<RecomendationCardProps> = ({title, desc, icon})  => {

    const Icon = icon;

    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl shadow-xs  dark:border-gray-700/50 rounded-xl  bg-white/80 dark:bg-slate-900/80 ">


            <div className="flex items-start justify-between gap-5">

                {/* First */}
                <div className={`p-3 rounded-full size-18  bg-green-50 dark:bg-green-900/40 flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>

                    <Icon className={`size-10   text-green-600 dark:text-green-400  `}/>

                </div>
                
                {/* Second */}
                <div className="flex-1 ">

                    <p className="text-xl font-semibold mb-2 text-emerald-600 dark:text-emerald-400 transition-colors">{title}</p>


                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">{desc}</p>



                </div>
                

            </div>


    </div>
    )
}

export default RecommendationCard