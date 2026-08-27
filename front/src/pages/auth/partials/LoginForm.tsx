import React, { useContext } from "react"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../../../services/authService"
import { toast } from "sonner"
import { Loader2, Lock, User } from "lucide-react"
import { AuthContext, type AuthContextData } from "../../../contexts/AuthContext"

interface LoginFormProps {
    onSwitch:  () => void
}

const loginSchema = z.object({
    email: z.email({message: "votre addresse email n'est pas valide"}),
    password: z.string().min(6, {message: "Le mot de passe doit contenir minimum six caractères"})
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm:React.FC<LoginFormProps> = function ({onSwitch}) {

    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextData
    
    const  navigate = useNavigate();

    const client = useQueryClient()

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(loginSchema)})

    
    const mutation = useMutation({

        mutationFn: authService.login,

        onSuccess: (data) => {
            
            const {user} = data

            updateUser(user)

            toast.success("Bienvenue sur votre dashboard")

            client.invalidateQueries({queryKey: ["auth"]})

            return navigate("/dashboard", {replace: true})
        },
        onError:  (error:any) => {
            const message = error?.response?.data?.message ||  "La connexion à votre compte a échoué";
            toast.error(message) 
        }
    })

    const onSubmit = (data: LoginFormData) =>  mutation.mutate(data)

    return (
        <>
            <h2 className="text-dark mb-2 text-2xl font-bold ">Connectez vous à votre compte</h2>
            <p className="text-sm md:text-base text-gray-500 mb-8">Rejoignez la communauté</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="text-gray-700 mb-2 text-base ">Adresse email</label>
                    <div className="mb-2 relative">
                        <User className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3"/>
                        <input type="text" 
                        placeholder="Saisissez votre adresse email"
                        {...register("email")}
                        id="email"
                        className="rounded-lg text-sm border  border-gray-300 text-dark transition-all w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    {errors.email  &&  <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="text-gray-700 mb-2 text-base ">Votre mot de passe</label>
                    <div className="mb-2 relative">
                        <Lock className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3"/>
                        <input type="password" 
                        placeholder="Saisissez votre mot de passe"
                        {...register("password")}
                        id="password"
                        className="rounded-lg text-sm border  border-gray-300 text-dark transition-all w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    {errors.password  &&  <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
                </div>

                <button className="text-white py-3 px-4 flex items-center justify-center w-full border border-gray-300 bg-purple-500 hover:bg-purple-600 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mt-3 ">{mutation.isPending ? <Loader2  className="animate-spin size-5"/> : "Se connecter"}</button>
        </form>

        <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Vous n'avez pas de compte ?</span>
            <span onClick={onSwitch} className="font-medium text-primary transition-all durtion-200 hover:underline"> S'inscrire</span>
        </div>
        </>


    )
}

export default LoginForm