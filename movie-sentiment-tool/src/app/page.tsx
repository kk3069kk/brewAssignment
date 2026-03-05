"use client";

import { useMovie } from "@/hooks/use-movie";
import { SearchBox } from "@/components/movie/SearchBox";
import { MovieDisplay } from "@/components/movie/MovieDisplay";
import { Navbar } from "@/components/layout/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { data, loading, error, getMovieInsight } = useMovie();

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]">
              AI-Powered Movie Insights
            </h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gradient mb-8 leading-[1.1]">
              Analyze Cinema <br className="hidden md:block" /> Through Audience Eyes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Enter an IMDb ID to fetch movie details and get an instant sentiment analysis of audience reviews using our premium AI engine.
            </p>
          </motion.div>
          
          <SearchBox onSearch={getMovieInsight} loading={loading} />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 glass rounded-2xl border-red-500/20 flex items-center gap-3 text-red-500 bg-red-500/5 justify-center max-w-md mx-auto"
            >
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-semibold">{error}</p>
            </motion.div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <div key="loading" className="space-y-12 animate-in-fade">
              <div className="flex flex-col md:flex-row gap-10">
                <Skeleton className="w-full md:w-1/3 lg:w-1/4 aspect-[2/3] rounded-3xl glass-card" />
                <div className="flex-1 space-y-6 pt-4">
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-3/4 rounded-xl glass" />
                    <Skeleton className="h-4 w-1/2 rounded-lg glass" />
                  </div>
                  <Skeleton className="h-32 w-full rounded-2xl glass" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 w-full rounded-xl glass" />
                    <Skeleton className="h-16 w-full rounded-xl glass" />
                  </div>
                </div>
              </div>
            </div>
          ) : data ? (
            <div key="results">
              <MovieDisplay insight={data} />
            </div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="py-20 flex flex-col items-center opacity-30 grayscale pointer-events-none"
            >
              <div className="glass-card p-12 rounded-full mb-8">
                <SearchBox onSearch={() => {}} loading={false} />
              </div>
              <p className="text-muted-foreground font-bold tracking-widest uppercase text-sm">Waiting for input...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Decorative blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] aspect-square bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-primary/5 blur-[120px] rounded-full -z-10" />
    </main>
  );
}
