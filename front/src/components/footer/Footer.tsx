import { BookOpen, Github, GithubIcon, Linkedin, LinkedinIcon, Twitter, X, XIcon } from "lucide-react";
import React from "react";


const Footer  = function () {
    return(
        <div id="footer" className="relative text-white overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950">
            
            {/* Subtle backgound Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-500 blur-2xl"></div>
            </div>

            <div className="mx-auto px-6 lg:px-8 w-full max-w-7xl ">

                <div className="grid  grid-cols-1 py-10 md:grid-cols-12 gap-12">

                    {/* Brand section */}
                    <div className="md:col-span-5 space-y-6">

                        <a className=" space-x-2.5 group flex items-center">

                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center shadow-violet-500/30 group-hover:bg-violet-500/50 transition-all duration-300">
                                <BookOpen className="w-5 h-5 text-white"/>
                            </div>

                            <span className="text-2xl font-medium font-semibold tracking-tight">HydroTech</span>
                        </a>

                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima unde veritatis itaque expedita aut quidem explicabo, perferendis est quibusdam corrupti maxime.
                        </p>

                        {/* Social Media Links */}
                        <div className="pt-2 space-x-2 flex items-center">

                            <a href="#"aria-label="X" className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <XIcon  className="w-5 h-5"/>
                            </a>

                            <a href="#"className="h-10 w-10 flex justify-center items-center duration-200 transition-all  rounded-lg hover:scale-110 bg-white/5 hover:bg-violet-600">
                                <LinkedinIcon className="w-5 h-5"/>
                            </a>

                            <a href="#" className="h-10 w-10 flex justify-center items-center duration-200 transition-all  rounded-lg hover:scale-110 bg-white/5 hover:bg-violet-600">
                                <GithubIcon className="h-5 w-5"/>
                            </a>
                        </div>
                    </div>

                    {/*Quicks Links */}
                    <div className="grid md:col-span-7 grid-cols-2 sm:grid-cols-3 gap-8">

                        <div className="">
                            <h3  className="mb-4 text-white font-semibold ">Calculs</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm">
                                        Indice linéaire de pertes
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors duration-200 text-gray-400 text-sm">
                                        Indice linéaire de consommation
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm">
                                        Indice linéaire de fuites
                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div className="">
                            <h3 className="text-white mb-4 font-semibold">Simulation</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm">
                                        Débit
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm">
                                        Préssion
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm">
                                        Charger hydraulique
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="">
                            <h3 className="mb-4 font-semibold text-white">Résultats</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm ">
                                        Consommation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm ">
                                        Détection
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm ">
                                        Simulation
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>


                </div>
                {/* Bottoms bar */}
                <div className="border-t border-white/10 py-8">
                    <div className="flex flex-col justify-between items-center md:flex-row space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} HydroTech. Tous droits reservés
                        </p>
                        <p className="text-violet-400 text-sm">
                            Dveloppé par <span className="text-violet-500">Henry</span>
                        </p>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default Footer