import { Building2, Landmark, ShoppingBag, Plane, Play, GraduationCap } from "lucide-react";

export const industryCategories = [
    {
        title: "navbar.menu.industries.finance.title",
        icon: Landmark,
        description: "navbar.menu.industries.finance.desc",
        href: "/industries",
        image: "/images/industries/finance.png",
        items: [
            { name: "navbar.menu.industries.finance.banking", href: "/industries" },
            { name: "navbar.menu.industries.finance.fintech", href: "/industries" },
            { name: "navbar.menu.industries.finance.insurance", href: "/industries" },
        ]
    },
    {
        title: "navbar.menu.industries.healthcare.title",
        icon: Building2,
        description: "navbar.menu.industries.healthcare.desc",
        href: "/industries",
        image: "/images/industries/healthcare.png",
        items: [
            { name: "navbar.menu.industries.healthcare.telehealth", href: "/industries" },
            { name: "navbar.menu.industries.healthcare.hms", href: "/industries" },
            { name: "navbar.menu.industries.healthcare.diagnostics", href: "/industries" },
        ]
    },
    {
        title: "navbar.menu.industries.government.title",
        icon: Building2,
        description: "navbar.menu.industries.government.desc",
        href: "/industries",
        image: "/images/industries/government.png",
        items: [
            { name: "navbar.menu.industries.government.egov", href: "/industries" },
            { name: "navbar.menu.industries.government.smart_city", href: "/industries" },
            { name: "navbar.menu.industries.government.public_safety", href: "/industries" },
        ]
    },
    {
        title: "navbar.menu.industries.retail.title",
        icon: ShoppingBag,
        description: "navbar.menu.industries.retail.desc",
        href: "/industries",
        image: "/images/retail.png",
        items: [
            { name: "navbar.menu.industries.retail.ecommerce", href: "/industries" },
            { name: "navbar.menu.industries.retail.logistics", href: "/industries" },
            { name: "navbar.menu.industries.retail.fashion", href: "/industries" },
        ]
    },
    {
        title: "navbar.menu.industries.travel.title",
        icon: Plane,
        description: "navbar.menu.industries.travel.desc",
        href: "/industries",
        image: "/images/travel.png",
        items: [
            { name: "navbar.menu.industries.travel.aviation", href: "/industries" },
            { name: "navbar.menu.industries.travel.hospitality", href: "/industries" },
            { name: "navbar.menu.industries.travel.agencies", href: "/industries" },
        ]
    },
    {
        title: "navbar.menu.industries.media.title",
        icon: Play,
        description: "navbar.menu.industries.media.desc",
        href: "/industries",
        image: "/images/media.png",
        items: [
            { name: "navbar.menu.industries.media.video", href: "/industries" },
            { name: "navbar.menu.industries.media.betting", href: "/industries" },
            { name: "navbar.menu.industries.media.publishing", href: "/industries" },
        ]
    },
    {
        title: "navbar.menu.industries.education.title",
        icon: GraduationCap,
        description: "navbar.menu.industries.education.desc",
        href: "/industries",
        image: "/images/education.png",
        items: [
            { name: "navbar.menu.industries.education.platforms", href: "/industries" },
            { name: "navbar.menu.industries.education.ai_edtech", href: "/industries" },
            { name: "navbar.menu.industries.education.lms", href: "/industries" },
        ]
    }
];
