import React, { useState } from "react";
import LoginForm from "./partials/LoginForm";
import RegisterForm from "./partials/RegisterForm";
import { Mail, Network } from "lucide-react";


const AuthPage = function () {
    
    const [isLogin, setIsLogin] = useState<boolean>(false)
    return (
        <div id="authPage" className="w-full min-h-screen  flex flex-col md:flex-row bg-white">
            <div className="min-h-screen flex items-center flex-col bg-purple-500 text-white justify-center p-8 w-full md:w-6/12  ">

                <div className="mb-8 text-center">

                    <div className="flex  justify-center items-center mb-6">
                        <div className="rounded-full bg-white/20 p-3">
                            <Network className="size-10"/>
                        </div>
                    </div>

                    <h1 className="font-bold text-3xl mb-2">Bienvenue chez Hydrotech</h1>
                    <p>Participez dès maintenant à la digitalisation de l'Afrique</p>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-sm opacity-70">Rejoins maintenant des dizaines d'utilisateurs</p>
                </div>

                
            </div>
            <div className=" flex items-center justify-center p-8 w-full md:w-6/12">
                {isLogin ?  <div className="w-full md:w-[500px]">
                    <LoginForm onSwitch={() => setIsLogin(false)}/>
                </div> : <div className="w-full md:w-[500px]">
                    <RegisterForm onSwitch={() => setIsLogin(true)}/>
                </div>}
            </div>
        </div>
    )
}

export default AuthPage