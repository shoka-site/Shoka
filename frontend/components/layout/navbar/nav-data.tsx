import { LayoutGrid, Package, Globe, type LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import PanelSkeleton from "./PanelSkeleton";
import {
  PRIMARY_NAV,
  type PrimaryNavId,
  type PrimaryNavLink,
} from "@/lib/site-navigation";

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

export interface NavCategory extends PrimaryNavLink {
  icon: LucideIcon;
  layout: "list" | "grid" | "columns";
  Panel: React.ComponentType<{ isRtl: boolean }>;
}

const CATEGORY_META: Record<
  PrimaryNavId,
  Pick<NavCategory, "icon" | "layout" | "Panel">
> = {
  industries: {
    icon: LayoutGrid,
    layout: "list",
    Panel: IndustriesPanel,
  },
  services: {
    icon: LayoutGrid,
    layout: "list",
    Panel: ServicesPanel,
  },
  packages: {
    icon: Package,
    layout: "grid",
    Panel: PackagesPanel,
  },
  projects: {
    icon: LayoutGrid,
    layout: "list",
    Panel: ProjectsPanel,
  },
  about: {
    icon: Globe,
    layout: "columns",
    Panel: AboutPanel,
  },
};

export const NAV_CATEGORIES: NavCategory[] = PRIMARY_NAV.map((category) => ({
  ...category,
  ...CATEGORY_META[category.id],
}));
