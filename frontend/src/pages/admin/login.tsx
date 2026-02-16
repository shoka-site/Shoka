import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const [, setLocation] = useLocation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const success = login(username, password);
        if (success) {
            setLocation("/admin");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Shoka Admin</h1>
                        <p className="text-muted-foreground">Sign in to manage content</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            Sign In
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
                        <p className="text-sm font-mono text-center">
                            <span className="text-muted-foreground">username:</span> <strong>admin</strong><br />
                            <span className="text-muted-foreground">password:</span> <strong>admin123</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
