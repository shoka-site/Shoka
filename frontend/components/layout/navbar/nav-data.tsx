import { LayoutGrid, Package, Globe, type LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import PanelSkeleton from "./PanelSkeleton";

const IndustriesPanel = dynamic(() => import("./IndustriesPanel"), {
  loading: () => <PanelSkeleton />,
});
const ServicesPanel = dynamic(() => import("./ServicesPanel"), {
  loading: () => <PanelSkeleton />,
});
const PackagesPanel = dynamic(() => import("./PackagesPanel"), {
  loading: () => <PanelSkeleton />,
});
const ProjectsPanel = dynamic(() => import("./ProjectsPanel"), {
  loading: () => <PanelSkeleton />,
});
const AboutPanel = dynamic(() => import("./AboutPanel"), {
  loading: () => <PanelSkeleton />,
});

export interface NavCategory {
  id: string;
  titleKey: string;
  defaultTitle?: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
  layout: "list" | "grid" | "columns";
  Panel: React.ComponentType<{ isRtl: boolean }>;
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: "industries",
    titleKey: "navbar.industries",
    descriptionKey: "home.industries.description",
    href: "/industries",
    icon: LayoutGrid,
    layout: "list",
    Panel: IndustriesPanel,
  },
  {
    id: "services",
    titleKey: "navbar.services",
    defaultTitle: "Services",
    descriptionKey: "navbar.menu.services.description",
    href: "/services",
    icon: LayoutGrid,
    layout: "list",
    Panel: ServicesPanel,
  },
  {
    id: "packages",
    titleKey: "navbar.packages",
    descriptionKey: "navbar.menu.packages.description",
    href: "/packages",
    icon: Package,
    layout: "grid",
    Panel: PackagesPanel,
  },
  {
    id: "projects",
    titleKey: "navbar.projects",
    descriptionKey: "portfolio.projects.description",
    href: "/projects",
    icon: LayoutGrid,
    layout: "list",
    Panel: ProjectsPanel,
  },
  {
    id: "about",
    titleKey: "navbar.about",
    descriptionKey: "footer.desc",
    href: "/about",
    icon: Globe,
    layout: "columns",
    Panel: AboutPanel,
  },
];
