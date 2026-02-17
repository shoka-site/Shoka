import { Building2, Landmark, ShoppingBag, Plane, Play, GraduationCap } from "lucide-react";

export const industryCategories = [
    {
        title: "Finance",
        icon: Landmark,
        description: "Empowering financial institutions with robust data analytics and secure digital infrastructure.",
        href: "/industries",
        image: "/images/industries/finance.png",
        items: [
            { name: "Asset Management", href: "/industries" },
            { name: "Capital Markets", href: "/industries" },
            { name: "Insurance", href: "/industries" },
            { name: "Banking", href: "/industries" },
            { name: "Payments", href: "/industries" },
        ]
    },
    {
        title: "Healthcare",
        icon: Building2,
        description: "Advancing patient care through innovative digital health solutions and intelligent information systems.",
        href: "/industries",
        image: "/images/industries/healthcare.png",
        items: [
            { name: "Digital Health", href: "/industries" },
            { name: "Medical Devices", href: "/industries" },
            { name: "DiGA", href: "/industries" },
            { name: "GenAI for Healthcare", href: "/industries" },
            { name: "Hospital Information Systems (HIS)", href: "/industries" },
        ]
    },
    {
        title: "Retail",
        icon: ShoppingBag,
        description: "Transforming the shopping experience with omnichannel strategies and supply chain excellence.",
        href: "/industries",
        image: "/images/industries/retail.png",
        items: [
            { name: "eCommerce", href: "/industries" },
            { name: "Logistics", href: "/industries" },
            { name: "Customer Engagement", href: "/industries" },
            { name: "Fashion", href: "/industries" },
            { name: "Supply Chain Management", href: "/industries" },
        ]
    },
    {
        title: "Travel",
        icon: Plane,
        description: "Elevating the travel industry with smart aviation, hospitality, and agency technology solutions.",
        href: "/industries",
        image: "/images/industries/travel.png",
        items: [
            { name: "Aviation", href: "/industries" },
            { name: "Cruise and Ferry", href: "/industries" },
            { name: "Hospitality", href: "/industries" },
            { name: "Agency Solutions", href: "/industries" },
        ]
    },
    {
        title: "Media",
        icon: Play,
        description: "Innovating the media landscape with next-gen video, betting, and digital publishing solutions.",
        href: "/industries",
        image: "/images/industries/media.png",
        items: [
            { name: "Video Business", href: "/industries" },
            { name: "Sports Betting", href: "/industries" },
            { name: "Art Market", href: "/industries" },
            { name: "Music Business", href: "/industries" },
            { name: "Book Publishing", href: "/industries" },
            { name: "Digital Media", href: "/industries" },
        ]
    },
    {
        title: "Education",
        icon: GraduationCap,
        description: "Shaping the future of learning with data platforms and AI-first educational technology.",
        href: "/industries",
        image: "/images/industries/education.png",
        items: [
            { name: "EdTech Data Platforms", href: "/industries" },
            { name: "AI-first EdTech Solutions", href: "/industries" },
            { name: "LMS and Learning Platforms", href: "/industries" },
            { name: "Next-Gen Education Platforms", href: "/industries" },
        ]
    }
];
