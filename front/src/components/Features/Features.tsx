import React from "react";
import { FEATURES, type FeatureType } from "../../utils/data";


const Features = function () {
    return (
        <div id="features" className="relative py-20 bg-white overflow-hidden">

            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 via-transparent to-purple-50/50 -z-1 "></div>
            
            {/* Container */}
            <div className="w-full mx-auto px-6 lg:px-32">

                <div className="text-center mb-10 space-y-4">
                    
                    <div className="bg-violet-500/30 space-x-2 inline-flex justify-center items-center py-2 px-4 rounded-full">
                        <span className="w-3 h-3 bg-violet-600 rounded-full animate-pulse "></span>
                        <span className="text-sm font-semibold text-violet-900">
                            Caractérisiques
                        </span>
                    </div>
                    <h2 className="text-4xl text-gray-900 font-bold tracking-tight sm:text-5xl ">Tout ce dont vous avez besoin
                        <span className="block mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            Pour comprendre votre réseau
                        </span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Notre plateforme vous pemet de surveiller votre réseau hydrauliques avec plus de cinq fonctionnalités incluses
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {FEATURES.map(function(feature:FeatureType, index:number) {

                        const Icon = feature.icon

                        return (
                            <div className="group relative bg-white rounded-2xl p-8 border hover:border-violet-200 border-gray-200 transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1" key={feature.gradient}>

                                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-purple-50/0 group-hover:from-violet-50/50 group-hover:to-purple-50/30 rounded-2xl "></div>

                                <div className="relative space-y-4">

                                    <div className={`w-14  h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-${feature.gradient}/20 transition-transform duration-200 group-hover:scale-110 `}>
                                        <Icon className="w-7 h-7 font-bold text-white"/>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-900 transition-all duration-300">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm ">{feature.description}</p>
                                </div>

                                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-violet-600 text-sm font-medium inline-flex items-center">
                                        Learn more
                                        <svg 
                                            className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>

                            </div>
                        )
                    })}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-gray-600 mb-6 text-base">Pret à commencer ?</p>
                    <a href="/auth" className="inline-flex text-white items-center space-x-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl px-8 py-4 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 duration-200 transition-all hover:scale-110 ">
                        <span>Commencer maintenant</span>
                        <svg 
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </a>
                </div>



            </div>
        </div>
    )
}
export default Features