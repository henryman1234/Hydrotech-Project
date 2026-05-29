import { HeartIcon, Triangle } from "lucide-react";
import React from "react";
import { values } from "../../utils/data";

const Values = function () {
    return (
        <div id="values" className="bg-purple-200/50 overflow-hidden">
            {/* Container */}
            <div className="w-full mx-auto max-w-7xl px-6 lg:px-8 py-15 ">

                {/* Wrapper */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left */}
                    <div className="space-y-6 max-w-xl">
                        <div className="inline-flex px-4 py-2 bg-white/80 space-x-2 items-center border border-purple-100 rounded-full shadow-sm ">
                            <HeartIcon className="w-4 text-purple-500 h-4"/>
                            <span className="text-gray-900 font-medium text-sm">Points clés</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight"><span className="bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-600">La digitalisation</span> et <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-600"> l'adduction en eau</span> centralisées</h2>


                        <ul className="mt-2 space-y-4">
                            {values.map(function(item, i) {
                                const Icon = item.icon
                                return (
                                    <li key={i} className="inline-flex  lg:items-center items-baseline space-x-3">
                                        <Icon className="w-4 h-4 font-bold text-purple-500 "/>
                                       <span className="text-base font-medium text-gray-600 "> {item.value}</span>
                      
                                    </li>
                                )
                            })}
                        </ul>

                        <a href="#" className="text-base font-semibold rounded-xl px-4 py-3 mt-2 text-white bg-purple-500 transition-colors shadow-lg shadow-green-500/50  duration-200 hover:bg-purple-400 ">Commençer</a>
                    </div>

                    {/* Right */}
                    <div className="relative lg:px-8">

                        <div className="relative space-y-4">


                            {/* The main element */}
                            <div className="relative border-gray-100 ">

                                <img src="./images/about-3.jpg" className="w-full object-cover rotate-3 rounded-2xl  h-auto " alt="Image  de la section about" />

                                {/* Decorative elements */}
                                <div className="absolute -inset-7 bg-linear-to-t from-black/10 rounded-2xl via-transparent to-transparent"></div>

                                <div className="absolute rounded-2xl bg-linear-to-t -inset-4  from-black/10 via-transparent to-transparent "></div>

                                <div className="absolute -top-4 -right-4 rounded-full animate-bounce w-3 h-3 bg-blue-400 opacity-70"></div>

                                <div className="left-6 bottom-8 absolute opacity-40 animate-ping bg-purple-400 rounded-full w-4 h-4"></div>


                                {/* Animated circle */}
                                <div className="absolute hidden animate-pulse lg:block -left-10 space-y-2  top-10 rotate-3">
                                    {[...Array(8)].map(function(item, index) {
                                        return (
                                            <div className="flex gap-3 items-center" key={index}>
                                                <div className="h-2 w-2 bg-purple-300 rounded-full"></div>
                                                <div className="bg-purple-300 h-2 w-2 rounded-full "></div>
                                            </div>
                                        )
                                    })}

                                </div>

                            </div>

                            {/* The second child */}
                            <div className="mt-12 flex items-center gap-3">
                            {[...Array(4)].map(function(triangle, i) {
                                    return (
                                        <Triangle key={i} className={` ${i % 2 === 0 ? "text-gray-900" : "text-purple-400"} w-8 -rotate-90 h-8`}/>
                                    )
                                })}
                            </div>

                        </div>

                    </div>

                </div>
                
            </div>

        </div>
    )
}

export default Values