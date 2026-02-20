"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { LayoutDashboard, FileText, BarChart3, Briefcase, MessageSquare, Target, GitBranch, Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
    services: number;
    projects: number;
    testimonials: number;
    insights: number;
    updates: number;
    industries: number;
    solutions: number;
    consultants: number;
}

export default function AdminDashboard() {
    const { data: stats, isLoading } = useQuery<DashboardStats>({
        queryKey: ["admin-dashboard-stats"],
        queryFn: async () => {
            const res = await fetch("/api/admin/dashboard-stats");
            return res.json();
        },
    });

    const contentTypes = [
        { icon: Briefcase, label: "Services", path: "/admin/services", key: "services" },
        { icon: FileText, label: "Projects", path: "/admin/projects", key: "projects" },
        { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials", key: "testimonials" },
        { icon: Lightbulb, label: "Insight Topics", path: "/admin/insights", key: "insights" },
        { icon: GitBranch, label: "Platform Updates", path: "/admin/platform-updates", key: "updates" },
        { icon: Target, label: "Industries", path: "/admin/industries", key: "industries" },
        { icon: LayoutDashboard, label: "Solutions", path: "/admin/solutions", key: "solutions" },
        { icon: MessageSquare, label: "Consultants", path: "/admin/consultants", key: "consultants" },
    ];

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <h1 className="text-4xl font-bold mb-2">Content Management Dashboard</h1>
                <p className="text-muted-foreground mb-8">Manage all website content from one place</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contentTypes.map((type) => {
                        const Icon = type.icon;
                        const count = stats ? (stats as any)[type.key] : 0;
                        return (
                            <Link key={type.path} href={type.path}>
                                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Icon className="w-8 h-8 text-primary" />
                                            {isLoading ? (
                                                <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                            ) : (
                                                <span className="text-2xl font-bold text-muted-foreground">{count}</span>
                                            )}
                                        </div>
                                        <CardTitle>{type.label}</CardTitle>
                                        <CardDescription>Manage {type.label.toLowerCase()} content</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 p-6 bg-muted rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• All content supports both English and Arabic</li>
                        <li>• Use the "Published" toggle to show/hide content on the website</li>
                        <li>• Changes are reflected immediately on the frontend</li>
                        <li>• Order field controls the display sequence</li>
                        <li>• Real-time data synchronization across all admin pages</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
