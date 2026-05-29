import React from "react";


const Banner = function () {

    return (
        <div id="banner" className="py-10 bg-green-100/40 relative overflow-hidden">


            {/* Decorative Elements */}
            <div className="mx-auto absolute inset-0 pointer-events-none max-w-7xl px-6 lg:px-8  hidden lg:flex justify-between -z-10  ">

                {[...Array(5)].map(function(_, i) {
                    return (
                        <div className="relative h-full w-[2px] bg-gray-600/30">

                            <div className="absolute animate-scan  bg-purple-500 w-[1.5px] h-20 animate-scan" style={{animationDelay: `${i * 0.8}s`}}></div>
                            
                        </div>
                    )
                })}
            </div>

            {/* Container */}
            <div className="mx-auto w-full max-w-5xl px-6 lg:px-8 relative">

                <h3  className="text-purple-500 font-bold text-2xl md:text-3xl">À-propos de nous</h3>
                
                <h4 className="mt-2 font-medium text-lg text-gray-500 ">Qui sommes nous ?</h4>
              

            </div>

    </div>
    )

}

export default Banner