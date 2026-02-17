import { Switch, Route, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Welcome from "@/pages/welcome";
import WelcomeV2 from "@/pages/welcome-v2";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Portfolio from "@/pages/portfolio";
import About from "@/pages/about";
import Industries from "@/pages/industries";
import Solutions from "@/pages/solutions";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/index";
import AdminHeroSlides from "@/pages/admin/hero-slides";
import AdminStats from "@/pages/admin/stats";
import AdminServices from "@/pages/admin/services";
import AdminProjects from "@/pages/admin/projects";
import AdminTestimonials from "@/pages/admin/testimonials";
import AdminWhyShoka from "@/pages/admin/why-shoka";
import AdminProcessSteps from "@/pages/admin/process-steps";
import AdminInsights from "@/pages/admin/insights";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={WelcomeV2} />
        <Route path="/welcome-v1" component={Welcome} />
        <Route path="/home" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/industries" component={Industries} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />

        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin">
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/hero-slides">
          <ProtectedRoute>
            <AdminHeroSlides />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/stats">
          <ProtectedRoute>
            <AdminStats />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/services">
          <ProtectedRoute>
            <AdminServices />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/projects">
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/testimonials">
          <ProtectedRoute>
            <AdminTestimonials />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/why-shoka">
          <ProtectedRoute>
            <AdminWhyShoka />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/process-steps">
          <ProtectedRoute>
            <AdminProcessSteps />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/insights">
          <ProtectedRoute>
            <AdminInsights />
          </ProtectedRoute>
        </Route>

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [location] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Hide navbar/footer on Welcome and Admin pages
  const isWelcome = location === "/" || location === "/welcome-v1";
  const isAdmin = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">
          {!isAdmin && <div className="fixed inset-0 z-0 bg-grain opacity-50 pointer-events-none mix-blend-multiply"></div>}

          {!isWelcome && !isAdmin && <Navbar />}
          <main className="relative z-10">
            <Router />
          </main>
          {!isWelcome && !isAdmin && <Footer />}
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;