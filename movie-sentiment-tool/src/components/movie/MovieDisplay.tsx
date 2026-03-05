"use client";

import { MovieInsight } from "@/types/movie";
import { MovieHero } from "./MovieHero";
import { SentimentAnalysis } from "./SentimentAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface MovieDisplayProps {
  insight: MovieInsight;
}

export function MovieDisplay({ insight }: MovieDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-12 pb-20"
    >
      <MovieHero movie={insight.movie} />
      
      <Separator className="bg-foreground/5 h-[1px]" />
      
      <Tabs defaultValue="sentiment" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="glass-card p-1 rounded-2xl h-14">
            <TabsTrigger 
              value="sentiment" 
              className="px-8 rounded-xl font-bold uppercase tracking-wider text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Sentiment Insights
            </TabsTrigger>
            <TabsTrigger 
              value="details" 
              className="px-8 rounded-xl font-bold uppercase tracking-wider text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Further Details
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="sentiment" className="mt-0 outline-none animate-in-fade">
          <SentimentAnalysis sentiment={insight.sentiment} />
        </TabsContent>
        
        <TabsContent value="details" className="mt-0 outline-none animate-in-fade">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl space-y-4">
              <h4 className="text-lg font-bold">Awards & recognition</h4>
              <p className="text-muted-foreground">{insight.movie.awards}</p>
            </div>
            <div className="glass-card p-8 rounded-3xl space-y-4">
              <h4 className="text-lg font-bold">Box Office</h4>
              <p className="text-muted-foreground">{insight.movie.boxOffice || "N/A"}</p>
            </div>
            <div className="glass-card p-8 rounded-3xl space-y-4 md:col-span-2">
              <h4 className="text-lg font-bold">Production</h4>
              <p className="text-muted-foreground font-mono">{insight.movie.production || insight.movie.country}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
