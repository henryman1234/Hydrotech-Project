import { AlertTriangle, ArrowRightToLine, Gauge, Ruler } from "lucide-react";
import React from "react";


const SubPressionCard = ()  => {

    // {
    //     title: "Total Views",
    //     value:  "456773",
    //     change: "-2.1%",
    //     trend: "down",
    //     icon: Eye,
    //     color: "from-orange-500 to-red-600",
    //     bgColor: "bg-orange-50 dark:bg-orange-900/20",
    //     textColor: "text-orange-600 dark:text-orange-400"
    // }
    return (

        <div className="border p-6 border-gray-200/50 backdrop-blur-xl  dark:border-gray-700/50 rounded-xl  bg-white/80 dark:bg-slate-900/80 ">


            <div className="flex items-start justify-between gap-10">

                {/* First */}
                <div className={`p-3 rounded-full size-18 sm:size-20 bg-orange-50 dark:bg-orange-900/40 flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                    <Gauge  className={`size-10 sm:size-12  text-orange-600 dark:text-orange-400  `}/>
                </div>
                
                {/* Second */}
                <div className="flex-1 ">

                    <p className="text-5xl font-bold mb-2 text-orange-500 dark:text-orange-400 transition-colors">14</p>


                    <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400 transition-colors">Sous-pressions</p>


                    <div className="flex  flex-col ">

                        <div className="flex items-center space-x-1 mb-2 ">
                            <ArrowRightToLine className="h-4 w-4 text-orange-400"/>
                            <span className={`text-sm font-semibold  text-orange-400`}>Pressions assez</span>
                        </div>

                        <span className="text-slate-500  dark:text-slate-400 text-sm">insuffisantes</span>
                    </div>
                </div>
                

            </div>

        {/*Progressbar */}
        <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full overflow-hidden">

            <div style={{width:  "100%" }} className={`bg-linear-to-r from-orange-400 to-red-500 w-full rounded-full h-full transition-all duration-200`}>
            </div>
        </div>

    </div>
    )
}

export default SubPressionCard