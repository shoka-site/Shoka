import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, BarChart3, Briefcase, MessageSquare, Target, GitBranch, Lightbulb, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
    { icon: LayoutDashboard, label: "Hero Slides", path: "/admin/hero-slides" },
    { icon: BarChart3, label: "Stats", path: "/admin/stats" },
    { icon: Briefcase, label: "Services", path: "/admin/services" },
    { icon: FileText, label: "Projects", path: "/admin/projects" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Target, label: "Why Shoka", path: "/admin/why-shoka" },
    { icon: GitBranch, label: "Process Steps", path: "/admin/process-steps" },
    { icon: Lightbulb, label: "Insights", path: "/admin/insights" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [location] = useLocation();
    const { logout } = useAuth();
    const [, setLocation] = useLocation();

    const handleLogout = () => {
        logout();
        setLocation("/admin/login");
    };

    return (
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
                        const isActive = location === item.path;
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
    );
}
