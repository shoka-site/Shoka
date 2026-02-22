import { 
  Code2, 
  Database, 
  Cloud, 
  Brain, 
  Smartphone, 
  Shield, 
  Workflow, 
  LineChart, 
  Users, 
  Lightbulb,
  Globe,
  Cpu,
  Server,
  Lock,
  Gauge,
  Building2
} from "lucide-react";

export const serviceCategories = [
  {
    title: "services.categories.software_development",
    icon: Code2,
    items: [
      { name: "services.items.web_development", href: "/services#web" },
      { name: "services.items.mobile_apps", href: "/services#mobile" },
      { name: "services.items.custom_software", href: "/services#custom" },
      { name: "services.items.api_development", href: "/services#api" },
    ],
  },
  {
    title: "services.categories.data_analytics",
    icon: Database,
    items: [
      { name: "services.items.business_intelligence", href: "/services#bi" },
      { name: "services.items.data_visualization", href: "/services#visualization" },
      { name: "services.items.big_data", href: "/services#bigdata" },
      { name: "services.items.predictive_analytics", href: "/services#predictive" },
    ],
  },
  {
    title: "services.categories.cloud_solutions",
    icon: Cloud,
    items: [
      { name: "services.items.cloud_migration", href: "/services#migration" },
      { name: "services.items.cloud_infrastructure", href: "/services#infrastructure" },
      { name: "services.items.devops_services", href: "/services#devops" },
      { name: "services.items.cloud_security", href: "/services#cloud-security" },
    ],
  },
  {
    title: "services.categories.ai_ml",
    icon: Brain,
    items: [
      { name: "services.items.machine_learning", href: "/services#ml" },
      { name: "services.items.nlp_solutions", href: "/services#nlp" },
      { name: "services.items.computer_vision", href: "/services#vision" },
      { name: "services.items.ai_strategy", href: "/services#ai-strategy" },
    ],
  },
  {
    title: "services.categories.digital_transformation",
    icon: Workflow,
    items: [
      { name: "services.items.process_automation", href: "/services#automation" },
      { name: "services.items.digital_strategy", href: "/services#strategy" },
      { name: "services.items.change_management", href: "/services#change" },
      { name: "services.items.digital_consulting", href: "/services#consulting" },
    ],
  },
  {
    title: "services.categories.enterprise_solutions",
    icon: Building2,
    items: [
      { name: "services.items.erp_systems", href: "/services#erp" },
      { name: "services.items.crm_solutions", href: "/services#crm" },
      { name: "services.items.enterprise_integration", href: "/services#integration" },
      { name: "services.items.security_solutions", href: "/services#security" },
    ],
  },
];
