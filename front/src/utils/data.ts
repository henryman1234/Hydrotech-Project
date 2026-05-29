import { BookOpen, CheckCircle, Lightbulb, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";


export type FeatureType = {
    title: string,
    description: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    gradient: string
}

export const FEATURES = [
    {
        title: "Simulation Hydraulique",
        description: "Cette appliaction permet de simuler l'écoulement de l'eau potable en temps réel dans le quartier de Bonas ",
        icon: Lightbulb,
        gradient: "from-violet-500 to-purple-600"
    },
    {
        title: "Commnication entre opérateur et abonés",
        description: "Cette appliaction permet de connecter l'opérateus et les consommateurs, ce qui facilite la détection des fuites",
        icon: BookOpen,
        gradient: "from-blue-500 to-cyan-600"
    },
    {
        title: "Surveillance du réseau hydraulique en temps réel",
        description: "Grace à HydroTech, vous pouvez surveiller votre réseau hydraulique en temps réel en simulant directement les fonctonnalités d'Epanet dans le navigateur",
        icon: BookOpen,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        title: "Détection des fuites",
        description: "Cette appliaction permet entre autres, grace aux notions d'indices de pertes de détecter des pertes et d'émettre des alarmes",
        icon: BookOpen,
        gradient: "from-pink-500 to-rose-600"
    }
]

export const TESTIMONIALS = [
    {
        quote: "HydroTech est une superbe plateforme conçu par des ingénieurs qui vous permet de surveiller un réseaun hydraulique en temps réel grace à une planoplie d'outils bien intégrés",
        author: "Onana Jacques",
        avatar: "./images/1.jpg",
        title: "Retour d'utilisation",
        rating: 5
    },
    {
        quote: "HydroTech est une superbe plateforme conçu par des ingénieurs qui vous permet de surveiller un réseaun hydraulique en temps réel grace à une planoplie d'outils bien intégrés",
        author: "Bimogo Stéphane",
        avatar: "./images/2.jpg",
        title: "Retour d'utilisation",

        rating: 5
    },
    {
        quote: "HydroTech est une superbe plateforme conçu par des ingénieurs qui vous permet de surveiller un réseaun hydraulique en temps réel grace à une planoplie d'outils bien intégrés",
        author: "Sonzeu Emile",
        avatar: "./images/3.jpg",
        title: "Retour d'utilisation",

        rating: 5
    },
]

export const values = [
    {value: "Cartographie interactive du réseau en temps réel", icon: CheckCircle},
    {value: "Calcul automatisé des indices de pertes (ILP)", icon: CheckCircle},
    {value: "Interface intuitive pour une maintenance proactive", icon: CheckCircle},
    {value: "Intégration rigoureuse des données topographiques", icon: CheckCircle},
    {value: "Monitoring dynamique des besoins usagers", icon: CheckCircle},
    {value: "Conçue pour s'adapter à l'évolution urbaine", icon: CheckCircle},
]