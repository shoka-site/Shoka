"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Cloud, Brain, Workflow, Building2, Shield, Server, BarChart3, Zap } from "lucide-react";
import { useServices } from "@/hooks/use-content";
import { slugify } from "@/lib/utils";

const serviceTypeIcons: Record<string, React.ElementType> = {
  software_development: Code2,
  web_development: Code2,
  mobile_apps: Smartphone,
  data_analytics: Database,
  cloud_solutions: Cloud,
  ai_ml: Brain,
  digital_transformation: Workflow,
  enterprise_solutions: Building2,
  security: Shield,
  infrastructure: Server,
  analytics: BarChart3,
  default: Zap,
};

function getServiceIcon(type?: string): React.ElementType {
  if (!type) return Zap;
  const key = type.toLowerCase().replace(/[^a-z_]/g, '_');
  return serviceTypeIcons[key] ?? serviceTypeIcons['default'];
}

export default function ServicesPanel({ isRtl }: { isRtl: boolean }) {
  const { data: services = [] } = useServices();

  return (
    <ul className="grid grid-cols-2 gap-6">
      {services.slice(0, 6).map((service, idx) => {
        const ServiceIcon = getServiceIcon(service.type);
        return (
          <motion.li
            key={service.id}
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href={`/services/${slugify(service.titleEn)}/`} className="focus-ring transition-ui group flex items-start gap-5 rounded-lg border border-transparent p-5 text-start hover:border-border hover:bg-muted">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <ServiceIcon aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{service.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{service.description}</div>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
