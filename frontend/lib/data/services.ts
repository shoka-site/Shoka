import {
    Database,
    Brain,
    Layers,
    Server,
    Cloud
} from "lucide-react";

export const serviceCategories = [
    {
        title: "navbar.menu.services.data.title",
        icon: Database,
        description: "navbar.menu.services.data.desc",
        href: "/services",
        image: "/images/services/service_data_services.png",
        items: [
            { name: "navbar.menu.services.data.analyst", href: "/services" },
            { name: "navbar.menu.services.data.science", href: "/services" },
            { name: "navbar.menu.services.data.entries", href: "/services" },
            { name: "navbar.menu.services.data.engineering", href: "/services" },
        ]
    },
    {
        title: "navbar.menu.services.ai.title",
        icon: Brain,
        description: "navbar.menu.services.ai.desc",
        href: "/services",
        image: "/images/services/service_ai_solutions.png",
        items: [
            { name: "navbar.menu.services.ai.chatbot", href: "/services" },
            { name: "navbar.menu.services.ai.cv", href: "/services" },
            { name: "navbar.menu.services.ai.ml", href: "/services" },
            { name: "navbar.menu.services.ai.agentic", href: "/services" },
        ]
    },
    {
        title: "navbar.menu.services.fullstack.title",
        icon: Layers,
        description: "navbar.menu.services.fullstack.desc",
        href: "/services",
        image: "/images/services/service_full_stack.png",
        items: [
            { name: "navbar.menu.services.fullstack.web", href: "/services" },
            { name: "navbar.menu.services.fullstack.app", href: "/services" },
            { name: "navbar.menu.services.fullstack.platforms", href: "/services" },
        ]
    },
    {
        title: "navbar.menu.services.backend.title",
        icon: Server,
        description: "navbar.menu.services.backend.desc",
        href: "/services",
        image: "/images/services/service_backend.png",
        items: [
            { name: "navbar.menu.services.backend.systems", href: "/services" },
            { name: "navbar.menu.services.backend.iot", href: "/services" },
            { name: "navbar.menu.services.backend.robotics", href: "/services" },
        ]
    },
    {
        title: "navbar.menu.services.cloud.title",
        icon: Cloud,
        description: "navbar.menu.services.cloud.desc",
        href: "/services",
        image: "/images/services/service_cloud.png",
        items: [
            { name: "navbar.menu.services.cloud.dbm", href: "/services" },
            { name: "navbar.menu.services.cloud.storage", href: "/services" },
            { name: "navbar.menu.services.cloud.control", href: "/services" },
        ]
    }
];
