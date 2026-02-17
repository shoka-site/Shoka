
import {
    Database,
    Brain,
    Layers,
    Server,
    Cloud
} from "lucide-react";

export const serviceCategories = [
    {
        title: "Data Services",
        icon: Database,
        description: "Unlock the power of your data with our comprehensive analytics and engineering solutions.",
        href: "/services",
        items: [
            { name: "Data Analyst", href: "/services" },
            { name: "Data Science", href: "/services" },
            { name: "Data Entries", href: "/services" },
            { name: "Data Engineering", href: "/services" },
        ]
    },
    {
        title: "AI Solutions",
        icon: Brain,
        description: "Leverage cutting-edge artificial intelligence to automate and innovate.",
        href: "/services",
        items: [
            { name: "Chat Bot", href: "/services" },
            { name: "Computer Vision", href: "/services" },
            { name: "ML Models", href: "/services" },
            { name: "Agentic AI", href: "/services" },
        ]
    },
    {
        title: "Full Stack",
        icon: Layers,
        description: "End-to-end development for robust web and mobile applications.",
        href: "/services",
        items: [
            { name: "Web Development", href: "/services" },
            { name: "App Development", href: "/services" },
            { name: "Platforms", href: "/services" },
        ]
    },
    {
        title: "Backend",
        icon: Server,
        description: "Scalable and secure backend infrastructure for your digital products.",
        href: "/services",
        items: [
            { name: "Systems", href: "/services" },
            { name: "IoT", href: "/services" },
            { name: "Robotics", href: "/services" },
        ]
    },
    {
        title: "Cloud",
        icon: Cloud,
        description: "Modern cloud solutions for storage, management, and scalability.",
        href: "/services",
        items: [
            { name: "DBM", href: "/services" },
            { name: "Storage", href: "/services" },
            { name: "Data Control", href: "/services" },
        ]
    }
];
