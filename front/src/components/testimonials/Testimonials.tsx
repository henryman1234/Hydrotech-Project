import { Quote, Star, StarIcon, Stars } from "lucide-react"
import React from "react"
import { TESTIMONIALS } from "../../utils/data"


const Testimonials = function () {
    return (
        <div id="testimonials" className="relative py-20  bg-gradient-to-br from-violet-50 via-white to-purple-50">


            {/* SEcorative Elements */}
            <div className=" absolute top-20 right-10 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl "></div>
            <div className="absolute bottom-20 left-10 rounded-full bg-purple-200/20 w-96 h-96 blur-3xl"></div>

            {/* Container */}
            <div className="w-full max-w-7xl px-6 lg:px-8 relative mx-auto" >
                
                {/* Header */}
                <div className="text-center mb-20 space-y-4">

                    <div className="inline-flex items-center bg-white/80 px-4 py-2 border border-violet-100 rounded-full space-x-2 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-violet-600 fill-violet-600"/>
                        <span className="text-sm font-semibold text-gray-900">Témoignages</span>
                    </div>
                    <h2 className="tracking-tight text-gray-900 font-bold sm:text-5xl text-4xl  ">
                        Apprécié par la 
                        <span className="block bg-clip-text text-transparent mt-2 bg-gradient-to-r from-violet-600 to-purple-600">
                        Communauté Estudiantine
                        </span>
                    </h2>

                    <p className="text-lg max-w-2xl text-gray-600 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum sed culpa voluptatibus</p>

                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {TESTIMONIALS.map(function(item, index:number) {
                        return (
                            <div className="relative  group backdrop-blur-sm rounded-3xl bg-white/80 p-8 border border-gray-200 hover:border-violet-200 hover:shadow-2xl hover: shadow-violet-500/30 hover:-translate-y-1 duration-300 transition-all"  key={index}>

                                {/* QUOTE ICON */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 rotate-6 group-hover:rotate-12 transition-transform duration-200">
                                    <Quote className="w-4 h-4 text-white"/>
                                </div>


                                {/* Stars Icons */}
                                <div className="flex items-center mb-6 space-x-1">
                                    {[...Array(item.rating)].map(function (_, i) {
                                        return (
                                            <StarIcon key={i} className="w-5 h-5 text-violet-500 fill-violet-500"/>
                                        )
                                    })}
                                </div>

                                
                                {/* Quote */}
                                <p className="text-gray-700 mb-8 leading-relaxed text-base">"{item.quote}"</p>


                                {/* Author Info */}
                                <div className="flex items-center space-x-4 ">

                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 blur opacity-30 rounded-full"></div>
                                        <img className="relative w-14 h-14 rounded-full object-cover ring ring-white shadow-lg" src={item.avatar} alt="Image" />
                                    </div>
                                    

                                    <div className="flex-1 ">
                                        <p className="font-semibold text-gray-900 text-base">{item.author}</p>
                                        <p className="text-sm text-gray-500">{item.title}</p>
                                    </div>

                                </div>

                                {/* Hover gradient background */}
                                <div className="bg-gradient-to-br absolute inset-0 from-violet-50/0 to-purple-50/0  blur opacity-70 group-hover:from-violet-50/50 group-hover:to-purple-50/30 rounded-3xl transition-all duration-200 -z-10"></div>
                            </div>
                        )
                    })}
                </div>


                {/* Bottom Stats */}
                <div className="mt-18 grid grid-cols-1 gap-10 sm:grid-cols-3 max-w-2xl mx-auto">

                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">05+</div>
                        <div className=" text-gray-600">Fonctionnalités</div>
                    </div>

                    
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                        <div className=" text-gray-600">Score mensuel</div>
                    </div>


                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
                        <div className=" text-gray-600">Open-source</div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Testimonials