import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import glyph from "@/assets/cuneiform-glyph.png";

export default function Welcome() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const bgX = useTransform(springX, (val) => val * 50);
  const bgY = useTransform(springY, (val) => val * 50);
  const glyphX = useTransform(springX, (val) => val * -80);
  const glyphY = useTransform(springY, (val) => val * -80);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-background relative overflow-hidden selection:bg-accent/30">
      
      {/* Background Ambience & Textures */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute -inset-20 opacity-30 bg-[radial-gradient(circle_at_center,_#332211_0%,_transparent_70%)]" 
        />
        <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Particles / Dust */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.2, 1],
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-accent/40 rounded-full blur-[1px]"
          />
        ))}
      </div>
      
      {/* Parallax Mesopotamian Glyphs */}
      <motion.div
        style={{ x: glyphX, y: glyphY }}
        className="absolute top-1/4 right-[15%] w-48 h-48 opacity-10 pointer-events-none blur-[2px]"
      >
        <img src={glyph} alt="" className="w-full h-full object-contain rotate-12" />
      </motion.div>

      <motion.div
        style={{ x: useTransform(springX, v => v * 100), y: useTransform(springY, v => v * 100) }}
        className="absolute bottom-1/4 left-[10%] w-64 h-64 opacity-5 pointer-events-none blur-[4px]"
      >
        <img src={glyph} alt="" className="w-full h-full object-contain -rotate-45" />
      </motion.div>
      
      {/* Centerpiece Branding */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Artifact Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 relative"
        >
          {/* Outer Rings */}
          <div className="absolute inset-[-40px] border border-accent/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute inset-[-20px] border border-accent/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className="absolute inset-[-2px] border-t-2 border-accent/40 rounded-full animate-[spin_4s_linear_infinite]"></div>
          
          <div className="relative w-32 h-32 bg-background/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(194,164,92,0.1)]">
            <motion.img 
              animate={{ 
                rotateY: [0, 360],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              src={glyph} 
              className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(194,164,92,0.5)]" 
            />
          </div>
        </motion.div>

        {/* Typography */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-display font-bold tracking-[-0.05em] mb-4 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                SHOKA
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
              />
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-2xl text-white/40 font-light tracking-[0.2em] uppercase mb-16 max-w-2xl mx-auto"
          >
            Systems of <span className="text-accent/60">Legacy</span> & <span className="text-white/70">Intelligence</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="/home">
              <a className="group relative px-12 py-5 bg-white text-black font-display font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:pr-14 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-sm">
                <span className="relative z-10 flex items-center gap-4">
                  Explore Platform
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" 
                />
              </a>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Frame Labels */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8 pointer-events-none"
      >
        <div className="flex flex-col gap-1">
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-bold">Protocol</span>
          <span className="text-accent/40 text-xs font-mono italic">HERITAGE.V1.2026</span>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-bold">Coordinates</span>
          <span className="text-white/40 text-xs font-mono">33.3152° N, 44.3661° E</span>
        </div>
      </motion.div>

      {/* Letterbox Bars */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-sm pointer-events-none border-b border-white/5 flex items-center justify-center">
        <span className="text-white/10 text-[9px] tracking-[1em] uppercase">Designing Intelligent Digital Systems</span>
      </div>
    </div>
  );
}