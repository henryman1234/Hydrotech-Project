import React from "react"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { authService } from "../../../services/authService"
import { toast } from "sonner"
import { Loader2, Lock, Mail, User } from "lucide-react"

interface RegisterFormProps {
    onSwitch:  () => void
}

const registerSchema = z.object({
    fullName:  z.string().trim().min(3, {message: "votre nom est trop court"}),
    email:  z.email({message: "votre adresse e-mail n'est pas correcte"}),
    name:   z.string()
            .regex(/^[a-z0-9_]+$/, {message: "le nom d'utilisateur ne peut contenir que des lettres minuscules, des chiffres ou des underscores"})
            .min(3, {message: "trois caractères minimum"})
            .max(12, {message: "douze caractères maximum"})
            .transform((val) => val.toLocaleLowerCase()),

    password: z.string().min(6, {message: "Le mot de passe doit contenir minimum six caractères!"}),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {message: "Les mots de passes ne correspondent pas!", path: ["confirmPassword"]})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm:React.FC<RegisterFormProps> = function ({onSwitch}) {

    // Permet de lier Zod avec HookForm
    const  {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(registerSchema) })

    const mutation = useMutation({
        mutationFn: authService.register,
        onSuccess:  () =>  {
            onSwitch();
            toast.success("Votre compte a été créé avec succès")
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Inscription échouée";
            toast.error(message);
        }
    })

    const onSubmit = (data: RegisterFormData) => mutation.mutate(data)

    return (
        <>
            <h2 className="font-bold text-2xl mb-2 text-dark">Créez votre compte</h2>
            <p className="mb-8 text-base text-gray-500 md:text-lg">Rejoignez notre commmunauté </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name" className="text-gray-700 mb-2 text-base ">Nom d'utilisateur</label>
                    <div className="mb-2 relative">
                        <User className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3"/>
                        <input type="text" 
                        placeholder="Saisissez votre nom d'utilisateur"
                        {...register("name")}
                        id="name"
                        className="rounded-lg text-sm border  border-gray-300 text-dark transition-all w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    {errors.name  &&  <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="fullName" className="text-gray-700 mb-2 text-base ">Nom complet</label>
                    <div className="mb-2 relative">
                        <User className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3"/>
                        <input type="text" 
                        placeholder="Saisissez votre nom complet"
                        {...register("fullName")}
                        id="fullName"
                        className="rounded-lg text-sm border  border-gray-300 text-dark transition-all w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    {errors.fullName  &&  <p className="text-red-400 text-sm mt-2">{errors.fullName.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="text-gray-700 mb-2 text-base ">Adresse email</label>
                    <div className="mb-2 relative">
                        <Mail className="absolute inset-y-0 top-1/2 -translate-y-1/2 text-gray-400 size-5 mb-2 left-3"/>
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
                    <label htmlFor="password" className="text-base mt-2 text-gray-700">Mot de passe</label>
                    <div className="mb-2 relative">
                        <Lock className="size-5 text-gray-400 mb-2 absolute left-3 inset-y-0 -translate-y-1/2 top-1/2 "/>
                        <input type="password" 
                        {...register("password")}
                        name="password"
                        id="password"
                        className="pl-10 pr-3 py-3 border border-gray-300 transition-all duration-200 w-full rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
                        />
                        
                    </div>
                    {errors.password && <p className="text-red-400 mt-2 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="text-base mt-2 text-gray-700">Confirmer votre mot de passe</label>
                    <div className="mb-2 relative">
                        <Lock className="size-5 text-gray-400 mb-2 absolute left-3 inset-y-0 -translate-y-1/2 top-1/2 "/>
                        <input type="password" 
                        {...register("confirmPassword")}
                        name="confirmPassword"
                        id="confirmPassword"
                        className="pl-10 pr-3 py-3 border border-gray-300 transition-all duration-200 w-full rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
                        />
                        
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 mt-2 text-sm">{errors.confirmPassword.message}</p>}
                </div>



                <button className="mt-2 w-full text-white bg-purple-500 hover:bg-purple-600 transition-all duration-200 px-4 py-3 flex items-center justify-center cursor-pointer font-medium rounded-lg disabled:cursor-not-allowed disabled:opacity-70">{mutation.isPending ? <Loader2  className="animate-spin size-5"/> :" Créer un compte"}</button>

            </form>

            <div className="text-sm text-center mt-4">
                <span className="text-gray-600">Avez-vous déjà un compte?</span>
                <span onClick={onSwitch} className="font-medium cursor-pointer hover:underline text-primary"> Se connecter</span>
            </div>
        </>
    )
}

export default RegisterForm