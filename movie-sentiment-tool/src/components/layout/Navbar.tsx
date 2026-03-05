"use client";

import { Film } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/30 backdrop-blur-xl"
    >
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
            <Film className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            MOVIE<span className="text-primary">SENTIMENT</span>
          </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-6">
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer">
            How it works
          </span>
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer">
            About
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
