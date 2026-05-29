import { LucideSpeaker, Speaker, SpellCheck, Triangle, TriangleRight, Voicemail } from "lucide-react"
import React from "react"

const MainAbout = function () {
    return (
        <div  className="bg-linear-to-r from-green-50 to-lime-50 overflow-hidden relative">
            {/* Container */}
            <div id="container" className="mx-auto w-full px-6 lg:px-8 max-w-7xl py-16">
                {/* Wrapper */}
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/*First */}
                    <div className="max-w-xl space-y-5">

                        <div className="inline-flex shadow-sm px-4 py-2 items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-100">
                            <Speaker className="w-4 h-4 text-purple-500"/>
                            <span className="text-sm font-medium text-gray-900">Voici ce que nous faisons</span>
                        </div>

                        <h3 className="text-3xl font-bold lg:text-4xl text-gray-900 tracking-tight">
                        De la Simulation EPANET au Pilotage en Temps Réel :
                        Optimiser 
                         <span className="text-transparent bg-clip-text bg-linear-to-br from-purple-400 to-purple-500"> le Rendement</span>  et Éliminer <span className="text-transparent bg-clip-text bg-linear-to-br from-purple-400 to-purple-500">les Pertes Invisibles</span>
                        </h3>

                        <p className="leading-relaxed   text-base sm:text-lg text-gray-600">Face aux défis croissants de l'urbanisation et de la préservation des ressources hydriques, la gestion traditionnelle des réseaux de distribution d'eau atteint ses limites. Les fuites invisibles, les chutes de pression inexpliquées et le manque de données en temps réel nuisent à l'efficacité du service et entraînent un gaspillage considérable. Notre projet a pour mission de relever ces défis en transformant une infrastructure physique en un système numérique intelligent, transparent et réactif</p>

                        <p className="leading-relaxed  text-base sm:text-lg text-gray-600">Nous avons développé un Dashboard Web interactif propulsé par les technologies numériques les plus performantes : React, Tailwind et Leaflet. La force de notre solution réside dans le couplage unique entre la simulation hydraulique avancée d'EPANET et la visualisation géospatiale en temps réel. En centralisant toutes les données du réseau débits, pressions et profils de consommationsur une interface cartographique intuitive, nous offrons une clarté opérationnelle inégalée pour la détection et l'analyse des anomalies.!</p>

                        <p className="leading-relaxed  text-base sm:text-lg text-gray-600">Bien plus qu'un simple outil de monitoring, ce Dashboard est une véritable plateforme d'aide à la décision stratégique. Il permet aux gestionnaires de réseau de passer d'une maintenance curative à une approche proactive, réduisant drastiquement le temps de réaction face aux incidents. En suivant des indicateurs clés comme l'Indice Linéaire de Perte (ILP), notre solution optimise le rendement du réseau, assure une pression de service constante pour les usagers et garantit une gestion durable du patrimoine hydraulique.</p>

                    </div>

                    {/*Second */}
                    <div className="relative lg:px-8">

                        <div className="relative space-y-4">


                            {/* The main element */}
                            <div className="relative border-gray-100 ">

                                <img src="./images/about-2.jpg" className="w-full object-cover rotate-3 rounded-2xl  h-auto " alt="Image  de la section about" />

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

                {/* Statistics */}
                <div className="py-10">
                    
                </div>

            </div>
        </div>
    )
}


export default MainAbout