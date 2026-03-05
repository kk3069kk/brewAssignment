"use client";

import { MovieInsight } from "@/types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Need to add this shadcn component
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

interface SentimentAnalysisProps {
  sentiment: MovieInsight["sentiment"];
}

export function SentimentAnalysis({ sentiment }: SentimentAnalysisProps) {
  const { overall, score, summary, reviews } = sentiment;

  // Map score to 0-100 range for progress bar (sentiment score usually -5 to 5)
  const normalizedScore = Math.min(Math.max(((score + 5) / 10) * 100, 0), 100);

  const getColor = () => {
    if (overall === "positive") return "text-green-500 bg-green-500/10";
    if (overall === "negative") return "text-red-500 bg-red-500/10";
    return "text-yellow-500 bg-yellow-500/10";
  };

  const Icon = () => {
    if (overall === "positive") return <ThumbsUp className="h-6 w-6 text-green-500" />;
    if (overall === "negative") return <ThumbsDown className="h-6 w-6 text-red-500" />;
    return <AlertCircle className="h-6 w-6 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Audience Sentiment
        </h3>
        <Badge className={`px-4 py-1 text-sm font-semibold rounded-full capitalize ${getColor()}`}>
          {overall}
        </Badge>
      </div>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-shrink-0 relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-primary/20"
            >
              <div className="text-center">
                <Icon />
                <span className="block text-3xl font-bold mt-1">{score.toFixed(1)}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Avg Score</span>
              </div>
            </motion.div>

            <div className="flex-1 space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground italic">
                "{summary}"
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase text-muted-foreground">
                  <span>Critical</span>
                  <span>Positive</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${normalizedScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${overall === 'positive' ? 'bg-green-500' : overall === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.slice(0, 3).map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card className="h-full glass border-none shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">@{review.author}</span>
                  <span className="text-[10px] text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm line-clamp-3 text-muted-foreground/90">
                  {review.content}
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div 
                      key={j} 
                      className={`h-1 flex-1 rounded-full ${j < (review.rating || 0) / 2 ? 'bg-primary' : 'bg-muted'}`} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
