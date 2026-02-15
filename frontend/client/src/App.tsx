import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Welcome from "@/pages/welcome";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Portfolio from "@/pages/portfolio";
import About from "@/pages/about";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Welcome} />
        <Route path="/home" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [location] = useLocation();
  // Hide navbar/footer on Welcome page for cinematic effect
  const isWelcome = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">
        <div className="fixed inset-0 z-0 bg-grain opacity-50 pointer-events-none mix-blend-multiply"></div>
        
        {!isWelcome && <Navbar />}
        <main className="relative z-10">
          <Router />
        </main>
        {!isWelcome && <Footer />}
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;