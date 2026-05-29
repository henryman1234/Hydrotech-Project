import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './pages/home/Home';
import {Toaster} from "sonner"
import AuthPage from './pages/auth/AuthPage';
import Dashboard from './pages/dashboard/DashboardLayout';
import About from './pages/about/About';
import {Layout , RequireAuthLayout} from "./pages/layout/Layout"
import { ThemeContextProvider } from './contexts/ThemeContext';
import Inventory from './pages/dashboard/pages/Inventory';
import Settings from './pages/dashboard/pages/Settings';
import Calendar from './pages/dashboard/pages/Calendar';
import Messages from './pages/dashboard/pages/Messages';
import Main from './pages/dashboard/pages/Main';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Network from './pages/dashboard/pages/Network';
import Simulation from './pages/dashboard/pages/Simulation';


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <Home/>

        },
        {
          path: "auth",
          element: <AuthPage/>
        },

        {
          path: "about",
          element: <About/>
        }
      ]
    },

    {
      path: "/",
      element: <RequireAuthLayout/>,
      children: [
        {
          path: "dashboard",
          element: <DashboardLayout/>,
          children: [
            {
              path: "",
              element: <Main/>
            },
            {
              path: "inventory",
              element:  <Inventory/>
            },
            {
              path: "messages",
              element: <Messages/>
            },
            {
              path: "network",
              element: <Network/>
            },
            {
              path: "simulation",
              element: <Simulation/>
            },
            {
              path: "calendar",
              element: <Calendar/>
            }
          ]
        },

      ]
    }



  ])

  return (
    <>
      <RouterProvider router={router}/>
      <Toaster richColors position="top-right"/>
    </>
  )
}

export default App
