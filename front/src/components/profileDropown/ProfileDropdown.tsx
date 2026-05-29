import { ChevronDown } from "lucide-react";
import React, { useContext } from "react";
import { AuthContext, type AuthContextData } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "sonner";

interface ProfileDropdownData  {
    email: string,
    // connectCode: string,
    name: string,
    isOpen: boolean,
    onToggle: (e: React.MouseEvent) => void
}

const ProfileDropdown:React.FC<ProfileDropdownData> = function ({onToggle, email, name, isOpen}) {

    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextData


    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            updateUser(null);
            toast.success("Déconnecté avec succès ✅!");
            queryClient.clear();
        },
        onError: (error:any) => {
            const message = error?.response.data.message || "Une érreur est survenue !";
            toast.error(message)
        }

    })


    return(

        <div className="relative">
            <button className="flex items-center p-2 gap-3 animate-in transition-all duration-200 rounded-lg hover:bg-gray-100" onClick={onToggle}>

                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-linear-to-r from-purple-400  to-purple-500 ">
                   <span className="text-white font-medium text-sm">{currentUser?.name.charAt(0).toUpperCase()}</span>
                </div>

                <div className="text-left hidden sm:block">
                    <p className="text-sm text-gray-900 font-medium" >{name}</p>
                    <p  className="text-xs text-gray-500">{email}</p>
                </div>

                <ChevronDown className="size-5 font-medium text-gray-500"/>
            </button>


            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white z-50 rounded-lg shadow-lg border border-gray-100 py-2 ">

                    <div className="px-4 py-3  border-b  border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-gray-500 text-xs">{email}</p>
                    </div>

                    <a href="#"  className="block px-4  py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Voir le profile
                    </a>

                    <div className="border-t border  border-gray-100 mt-2 pt-2">
                        <a 
                            href="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            onClick={function () {
                                return mutation.mutate()
                            }}
                            
                        >
                            Se déconnecter
                        </a>
                    </div>


                </div>
                
            )}



        </div>
    )
}

export default ProfileDropdown