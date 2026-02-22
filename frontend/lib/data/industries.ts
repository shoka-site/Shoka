import { 
  Building2, 
  ShoppingCart, 
  HeartPulse, 
  GraduationCap, 
  Wallet, 
  Car, 
  Factory, 
  Plane, 
  Home, 
  Utensils,
  Music,
  Gamepad2
} from "lucide-react";

export const industryCategories = [
  {
    title: "industries.categories.healthcare",
    icon: HeartPulse,
    items: [
      { name: "industries.items.hospital_management", href: "/industries#healthcare" },
      { name: "industries.items.telemedicine", href: "/industries#telemedicine" },
      { name: "industries.items.health_analytics", href: "/industries#health-analytics" },
    ],
  },
  {
    title: "industries.categories.education",
    icon: GraduationCap,
    items: [
      { name: "industries.items.e_learning", href: "/industries#elearning" },
      { name: "industries.items.lms", href: "/industries#lms" },
      { name: "industries.items.ed_tech", href: "/industries#edtech" },
    ],
  },
  {
    title: "industries.categories.finance",
    icon: Wallet,
    items: [
      { name: "industries.items.fintech", href: "/industries#fintech" },
      { name: "industries.items.banking", href: "/industries#banking" },
      { name: "industries.items.blockchain", href: "/industries#blockchain" },
    ],
  },
  {
    title: "industries.categories.retail",
    icon: ShoppingCart,
    items: [
      { name: "industries.items.ecommerce", href: "/industries#ecommerce" },
      { name: "industries.items.pos_systems", href: "/industries#pos" },
      { name: "industries.items.inventory", href: "/industries#inventory" },
    ],
  },
  {
    title: "industries.categories.manufacturing",
    icon: Factory,
    items: [
      { name: "industries.items.automation", href: "/industries#automation" },
      { name: "industries.items.iot", href: "/industries#iot" },
      { name: "industries.items.supply_chain", href: "/industries#supply-chain" },
    ],
  },
  {
    title: "industries.categories.real_estate",
    icon: Home,
    items: [
      { name: "industries.items.property_management", href: "/industries#property" },
      { name: "industries.items.smart_buildings", href: "/industries#smart-buildings" },
      { name: "industries.items.marketplace", href: "/industries#marketplace" },
    ],
  },
  {
    title: "industries.categories.travel",
    icon: Plane,
    items: [
      { name: "industries.items.booking_systems", href: "/industries#booking" },
      { name: "industries.items.tourism_tech", href: "/industries#tourism" },
      { name: "industries.items.travel_analytics", href: "/industries#travel-analytics" },
    ],
  },
  {
    title: "industries.categories.automotive",
    icon: Car,
    items: [
      { name: "industries.items.fleet_management", href: "/industries#fleet" },
      { name: "industries.items.autonomous_vehicles", href: "/industries#autonomous" },
      { name: "industries.items.auto_dealerships", href: "/industries#dealerships" },
    ],
  },
  {
    title: "industries.categories.food",
    icon: Utensils,
    items: [
      { name: "industries.items.food_delivery", href: "/industries#delivery" },
      { name: "industries.items.restaurant_apps", href: "/industries#restaurant" },
      { name: "industries.items.food_safety", href: "/industries#food-safety" },
    ],
  },
  {
    title: "industries.categories.entertainment",
    icon: Music,
    items: [
      { name: "industries.items.streaming", href: "/industries#streaming" },
      { name: "industries.items.gaming", href: "/industries#gaming" },
      { name: "industries.items.social_media", href: "/industries#social" },
    ],
  },
];
