"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Target, Images, LogOut, Users, Mail, Package, Menu, X, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import ProtectedRoute from "@/components/admin/ProtectedRoute";

const navItems = [
    { icon: Briefcase, label: "Services", path: "/admin/services" },
    { icon: FileText, label: "Projects", path: "/admin/projects" },
    { icon: Package, label: "Packages", path: "/admin/packages" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Images, label: "Home Hero Slides", path: "/admin/platform-updates" },
    { icon: Target, label: "Industries", path: "/admin/industries" },
    { icon: LayoutDashboard, label: "Use Case", path: "/admin/solutions" },
    { icon: Users, label: "Our Team", path: "/admin/team" },
    { icon: Mail, label: "Consultations", path: "/admin/consultations" },
    { icon: BookOpen, label: "UI Library", path: "/admin/components-docs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background text-foreground" dir="ltr" lang="en">
                {/* Mobile Top Header */}
                <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-muted border-b border-border flex items-center justify-between px-6 z-40">
                    <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-lg">Sehle Admin</span>
                        <ThemeToggle />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>

                {/* Mobile Drawer Backdrop */}
                {mobileOpen && (
                    <div 
                        className="md:hidden fixed inset-0 bg-black/60 z-40 mt-16" 
                        onClick={() => setMobileOpen(false)} 
                    />
                )}

                {/* Mobile Drawer */}
                <div className={`md:hidden fixed top-16 bottom-0 left-0 w-64 bg-muted border-r border-border p-6 z-50 overflow-y-auto transition-transform duration-300 transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;
                            return (
                                <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
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

                {/* Desktop Sidebar */}
                <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-muted border-r border-border p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-display font-bold">Sehle Admin</h1>
                            <p className="text-sm text-muted-foreground">Content Management</p>
                        </div>
                        <ThemeToggle />
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
                <div className="md:ml-64 p-6 md:p-8 pt-24 md:pt-8">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    );
}
