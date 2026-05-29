import { createContext, useEffect, useState } from "react"



export type UserData = {
    name: string,
    fullName: string,
    password: string,
    email: string,
    connectCode: string,
    _id: string
}

export type AuthContextData = {
    currentUser: UserData |  null,
    updateUser: (user: UserData | null) =>  void
}

export const AuthContext = createContext<AuthContextData | null>(null)


export const AuthContextProvider = function ({children}: {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<UserData | null>(function() {
        const storedUser = window.localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) as UserData : null
    })

    const updateUser = function (data: UserData | null) {
        setCurrentUser(data)
    }

    useEffect(function(){
       window.localStorage.setItem("user", JSON.stringify(currentUser))
    } ,[currentUser])


    return (
        <AuthContext.Provider  value={{currentUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}