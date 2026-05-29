import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useLocation } from "react-router-dom";

export type ContextData = "light" | "dark";

export type ThemeContextData = {
    theme: ContextData,
    toggleTheme: () =>  void
}

export const ThemeContext = createContext<ThemeContextData | null>(null)

export const useTheme = function  () {
    const context = useContext(ThemeContext)

    if (!context)  { 
        throw new Error("UseTheme must be within a theme provider")
    }

    return context
}

export const ThemeContextProvider = function ({children}: {children: React.ReactNode}) {

    const [theme, setTheme] = useState<ContextData>(function() {
        // Si je suis dans le navigateur
        if (typeof window !== "undefined") {
            const stored = window.localStorage.getItem("theme")
            return stored === "dark" ? "dark" : "light"
        }
        return "light"
    })
 
    useEffect(function() {
        if (typeof window !== "undefined")  {
            window.localStorage.setItem("theme", theme)
        }
    }, [theme])

    // Affecter directemen le dom
    useEffect(function() {
        const root  = document.documentElement

        if ( theme === "dark") {
            root.classList.add("dark")
            root.classList.remove("light")
        } else {
            root.classList.add("light")

            root.classList.remove("dark")
        }
        window.localStorage.setItem("theme", theme) 

    }, [theme])

    // useEffect(function() {
    //     const root  = document.documentElement

    //     root.classList.remove("light", "dark")
    //     root.classList.add(theme)
    //     window.localStorage.setItem("theme", theme)

    // }, [theme])


    const toggleTheme = function () {
        setTheme(function(prev) {
            return prev === "dark" ? "light" : "dark"
        })
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}