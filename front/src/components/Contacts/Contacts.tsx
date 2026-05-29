import {  Facebook, Github, Mail, MapPin, MessageCircleIcon, MessageSquare, Send, Twitter } from "lucide-react";
import React from "react";


const Contacts = function () {
    return (
        <div id="contacts" className="relative py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">

            {/* Decorative Elements */}
            <div className="bg-violet-200/200 absolute top-10 right-20 h-64 w-64 rounded-full blur-3xl  "></div>
            <div className="bottom-20 left-10 absolute h-96 w-96 bg-purple-200/20 blur-3xl rounded-full"></div>

            <div id="container" className="max-w-7xl w-full mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-flex items-center justify-center rounded-full backdrop-blur-sm px-4 py-2 space-x-2 border border-violet-100 bg-white/80 ">
                        <MessageSquare className=" w-4 h-4 text-violet-600 fill-violet-600"/>
                        <span className="text-gray-900 font-semibold text-sm">Contact</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                        Partageons des idées
                        <span className="mt-2 block bg-clip-text text-transparent bg-gradient-to-br from-violet-600 to-purple-600">Ensemble</span>
                    </h2>

                    <p className="mx-auto text-gray-600 max-w-2xl text-lg">HydroTech étant un projet open-source, toute contribution ou participation aussi pétite soit elle , sera la bienvenue.</p>

                </div>

                {/* Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Left Item*/}
                    <div className="bg-white/80 border border-gray-200  rounded-xl p-8">
                        <form className="space-y-8">
                            <div>
                                <label className="block text-gray-500 font-medium text-sm mb-2" htmlFor="name">Nom</label>
                                <input className="w-full px-4 py-3 resize-none border border-violet-400 placeholder:text-gray-400  bg-gray-100/90 focus:outline-none focus:ring-2   focus:ring-violet-500   rounded-xl text-gray-600 focus:border-violet-500 transition-all duration-200" type="text" name="name" id="name" placeholder="Votre nom" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 font-medium mb-2" htmlFor="email">Email</label>
                                <input  className="w-full px-4 py-3 border border-violet-400 placeholder:text-gray-400  bg-gray-100/90 focus:outline-none focus:ring-2   focus:ring-violet-500   rounded-xl text-gray-600 focus:border-violet-500 transition-all duration-200" type="email" name="email" id="email" placeholder="Votre email" />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-gray-500 " htmlFor="message">Message</label>
                                <textarea rows={5} name="message" id="message" placeholder="Votre message" className="w-full px-4 py-3 border border-violet-400 placeholder:text-gray-400  bg-gray-100/90 focus:outline-none focus:ring-2   focus:ring-violet-500   rounded-xl text-gray-600 focus:border-violet-500 transition-all duration-200" />
                            </div>

                            <button className="group items-center flex justify-center space-x-2 bg-linear-to-r from-violet-500 to-violet-600 hover:shadow-xl hover:shadow-violet-500/40 font-medium transition-all duration-200 w-full px-6 py-3 rounded-xl text-white " type="submit">
                                <span>Envoyer</span> 
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"/>
                            </button>

                        </form>
                    </div>

                    {/* Right Item */}
                    <div className="space-y-8">

                        <div className="">
                            <h3 className="text-2xl mb-4 font-semibold text-gray-500">Let's connect</h3>

                            <p className="text-gray-600 leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, minima odio? Necessitatibus totam numquam dolor.</p>
                        </div>
                        
                        {/* Second */}
                        <div className="space-y-4">

                            <div className="group relative border border-violet-300 bg-gray-100/90  rounded-2xl p-6 transition-all duration-200 hover:border-violet-400">

                                <div className="flex items-center gap-4">

                                    <div className="p-3 bg-linear-to-br border border-violet-300 from-violet-400 to-violet-500 rounded-2xl">
                                        <Mail className="text-white w-6 h-6"/>
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Email</p>
                                        <a 
                                            href=""
                                            className="text-gray-600 hover:text-violet-500 font-medium transition-colors"
                                        >
                                            henrynomo68@gmail.com
                                        </a>
                                    </div>

                                    <div className="absolute inset-0 bg-linear-to-br from-violet-400/10 to-violet-500/10 pointer-events-none rounded-2xl group-hover:from-violet-400/50 group-hover:to-violet-500/30 duration-200 transition-all"></div>

                                </div>


                            </div>


                            <div className="group relative border border-violet-300 bg-gray-100/90  rounded-2xl p-6 transition-all duration-200 hover:border-violet-400">

                                <div className="flex items-center gap-4">

                                    <div className="p-3 bg-linear-to-br border border-violet-300 from-violet-400 to-violet-500 rounded-2xl">
                                        <MapPin className="w-6 h-6 text-white"/>
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p  className="text-gray-600 font-medium">Yaoundé</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* 3 */}
                        <div >
                            <p className="text-sm text-gray-600 mb-4">Connect with Me</p>

                            <div className="flex gap-4">
                                <a 
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-4 bg-gray-100/90 border border-violet-300 rounded-xl transition-all hover:scale-110 group-hover:border-violet-500"
                                >
                                    <Facebook className="w-6 h-6 text-violet-500 group-hover:text-violet-600 transition-colors"/>
                                </a>

                                <a 
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-4 bg-gray-100/90 border border-violet-300 rounded-xl transition-all hover:scale-110 group-hover:border-violet-500"
                                >
                                    <Twitter className="w-6 h-6 text-violet-500 group-hover:text-violet-600 transition-colors"/>
                                </a>

                                <a 
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-4 bg-gray-100/90 border border-violet-300 rounded-xl transition-all hover:scale-110 group-hover:border-violet-500"
                                >
                                    <Github className="w-6 h-6 text-violet-500 group-hover:text-violet-600 transition-colors"/>
                                </a>


                            </div>

                            

                        </div>


                    </div>

                </div>
                
            </div>
        </div>
    )
}


export default Contacts