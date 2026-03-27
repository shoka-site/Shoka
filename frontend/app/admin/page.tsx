import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Target, GitBranch, Package, Users, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { storage } from "@/lib/storage";

export const revalidate = 0; // Disable cache for admin dashboard to ensure fresh stats

export default async function AdminDashboard() {
    // Fetch stats on the server
    const stats = {
        services: (await storage.getServices(false)).length,
        projects: (await storage.getProjects(false)).length,
        packages: (await storage.getPackages(false)).length,
        testimonials: (await storage.getTestimonials(false)).length,
        updates: (await storage.getPlatformUpdates(false)).length,
        industries: (await storage.getIndustries(false)).length,
        solutions: (await storage.getSolutions(false)).length,
        team: (await storage.getTeamMembers(false)).length,
        consultations: (await storage.getConsultations()).length,
    };

    const contentTypes = [
        { icon: Briefcase, label: "Services", path: "/admin/services", key: "services" },
        { icon: FileText, label: "Projects", path: "/admin/projects", key: "projects" },
        { icon: Package, label: "Packages", path: "/admin/packages", key: "packages" },
        { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials", key: "testimonials" },
        { icon: GitBranch, label: "Platform Updates", path: "/admin/platform-updates", key: "updates" },
        { icon: Target, label: "Industries", path: "/admin/industries", key: "industries" },
        { icon: LayoutDashboard, label: "Use Case", path: "/admin/solutions", key: "solutions" },
        { icon: Users, label: "Our Team", path: "/admin/team", key: "team" },
        { icon: Mail, label: "Consultations", path: "/admin/consultations", key: "consultations" },
    ];

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <h1 className="text-4xl font-bold mb-2">Content Management Dashboard</h1>
                <p className="text-muted-foreground mb-8">Manage all website content from one place</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contentTypes.map((type) => {
                        const Icon = type.icon;
                        const count = (stats as Record<string, number>)[type.key] || 0;
                        return (
                            <Link key={type.path} href={type.path}>
                                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Icon className="w-8 h-8 text-primary" />
                                            <span className="text-2xl font-bold text-muted-foreground">{count}</span>
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
                        <li>• Use the &quot;Published&quot; toggle to show/hide content on the website</li>
                        <li>• Changes are reflected immediately on the frontend</li>
                        <li>• Order field controls the display sequence</li>
                        <li>• Real-time data synchronization across all admin pages</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
