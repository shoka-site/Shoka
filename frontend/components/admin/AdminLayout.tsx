"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, BarChart3, Briefcase, MessageSquare, Target, GitBranch, Lightbulb, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import ProtectedRoute from "@/components/admin/ProtectedRoute";

const navItems = [
    { icon: Briefcase, label: "Services", path: "/admin/services" },
    { icon: FileText, label: "Projects", path: "/admin/projects" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Lightbulb, label: "Insights", path: "/admin/insights" },
    { icon: GitBranch, label: "Updates", path: "/admin/platform-updates" },
    { icon: Target, label: "Industries", path: "/admin/industries" },
    { icon: LayoutDashboard, label: "Solutions", path: "/admin/solutions" },
    { icon: MessageSquare, label: "Consultants", path: "/admin/consultants" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                {/* Sidebar */}
                <div className="fixed left-0 top-0 bottom-0 w-64 bg-muted border-r border-border p-6 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-display font-bold">Shoka Admin</h1>
                        <p className="text-sm text-muted-foreground">Content Management</p>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;
                            return (
                                <Link key={item.path} href={item.path}>
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className="w-full justify-start"
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-border">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="ml-64 p-8">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    );
}
