"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Cloud, Brain, Workflow, Building2, Shield, Server, BarChart3, Zap } from "lucide-react";
import { useServices } from "@/hooks/use-content";

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
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href={`/services/${service.id}`} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                <ServiceIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{service.title}</div>
                <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{service.description}</div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </ul>
  );
}
