import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Flower, Network, OrbitIcon, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = function () {

    const user = null

    return (
        <div>
            <div className="relative bg-gradient-to-br from-violet-50 via-white to-purple-50 overflow-hidden">


                {/*Floatting background */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                
                {/* Container */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 relative">
                    
                    {/* Wrapper */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* The left content */}
                        <div className="max-w-xl space-y-8">

                            <div className="inline-flex items-center bg-white/80 px-4 py-2 backdrop-blur-sm rounded-full border border-violet-100 shadow-sm space-x-2">
                                <Sparkles className="w-4 h-4  text-violet-600"/>
                                <span className="text-sm font-medium text-violet-900">Projet Académique</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl font-bold lg:text-6xl text-gray-900 leading-tight tracking-tight">
                                Simulez votre réseau
                                <span className="block mt-2 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                                    Hydraulique
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                Notre plateforme web révolutionne le principe d'adduction en eau potable grace à une panoplie d'ouils à savoir la suerveillance des réseaux hydrauliques, la détection des fuites, un canal de communication permanent entre l'opérateur et les abonnés
                            </p>


                            <div className="flex flex-col sm:flex-row items-start sm:items-center  gap-4">

                                <Link to={user ? "/dashboard" : "/auth"}
                                    className="group inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 px-8 py-4 shadow-lg text-white rounded-xl font-semibold shadow-violet-500/30 group-hover:scale-110 transition-all duration-300"
                                >
                                    <span>Lancer la simulation</span>
                                    <ArrowRight  className="w-7 h-7"/>
                                </Link>

                                <a href="#" className="inline-flex space-x-2 items-center text-gray-700 font-medium hover:text-violet-600 transition-colors duration-300">
                                    <span className="">lire la documentation</span>
                                    <span className="text-violet-600">🔎</span>
                                </a>
                                
                            </div>

                            <div className="flex items-center gap-8 pt-2">
                                <div className="">
                                    <div className="text-2xl font-bold text-gray-900">05+</div>
                                    <div className="text-sm text-gray-600">Fonctionnalités</div>
                                </div>

                                <div className="w-[2px] h-12 bg-gray-300"></div>
                                
                                <div className="">
                                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                                    <div className="text-sm text-gray-600">Score mensuel</div>
                                </div>

                                <div className="w-[2px] h-12 bg-gray-300"></div>

                                <div className="">
                                    <div className="text-2xl font-bold text-gray-900">100%</div>
                                    <div className="text-sm text-gray-600">Open-source</div>
                                </div>

                            </div>
                        </div>


                        {/* The Right Content */}
                        <div className="relative lg:pl-8">

                            <div className="relative">

                                <div className="absolute -inset-4  bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>

                                <div className="bg-white relative rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                                    <img alt="Image of hero's section" className="w-full h-auto" src="./images/hero.jpg" />

                                    <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border border-gray-100 animate-in slide-in-from-right duration-200 transition-all">

                                        <div className="flex space-x-3 items-center">

                                            <div className="w-10  h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                <OrbitIcon className="text-white w-5 h-5"/>
                                            </div>

                                            <div>
                                                <div className="text-xs text-gray-500">En cours</div>
                                                <div className="text-sm text-gray-900 font-semibold">Simutation en cours</div>
                                            </div>

                                        </div>
                                        

                                    </div>

                                </div>

                                <div className="absolute bottom-6 left-6 bg-white animate-in slide-in-from-right p-4 transition-all duration-200 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-100 fade-in delay-200">

                                    <div className="flex items-center space-x-3">
                                        <div className="h-10  w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                            <Network  className="text-white w-5 h-5"/>
                                        </div>

                                        <div className="">
                                            <div className="text-xs text-gray-600">Terminé</div>
                                            <div className="text-gray-900 font-medium text-sm">Simulation terminée</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decoration */}
                            <div className="absolute -top-8 w-22 h-22 bg-violet-400/20 rounded-2xl -left-5  rotate-12   "></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-400/30 rounded-full"></div>



                        </div>  



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero