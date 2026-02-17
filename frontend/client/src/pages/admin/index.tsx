import AdminLayout from "@/components/admin/AdminLayout";
import { Link } from "wouter";
import { LayoutDashboard, FileText, BarChart3, Briefcase, MessageSquare, Target, GitBranch, Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const contentTypes = [
    { icon: LayoutDashboard, label: "Hero Slides", path: "/admin/hero-slides", count: 3 },
    { icon: BarChart3, label: "Stats", path: "/admin/stats", count: 4 },
    { icon: Briefcase, label: "Services", path: "/admin/services", count: 4 },
    { icon: FileText, label: "Projects", path: "/admin/projects", count: 2 },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials", count: 3 },
    { icon: Target, label: "Why Shoka Points", path: "/admin/why-shoka", count: 5 },
    { icon: GitBranch, label: "Process Steps", path: "/admin/process-steps", count: 5 },
    { icon: Lightbulb, label: "Insight Topics", path: "/admin/insights", count: 3 },
];

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <h1 className="text-4xl font-bold mb-2">Content Management Dashboard</h1>
                <p className="text-muted-foreground mb-8">Manage all website content from one place</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contentTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <Link key={type.path} href={type.path}>
                                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Icon className="w-8 h-8 text-primary" />
                                            <span className="text-2xl font-bold text-muted-foreground">{type.count}</span>
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
                        <li>• Currently using in-memory storage (configure DATABASE_URL for persistence)</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
