"use client";

import Image from "next/image";
import { Movie } from "@/types/movie";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, Film } from "lucide-react";
import { motion } from "framer-motion";

interface MovieHeroProps {
  movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
  return (
    <div className="flex flex-col md:flex-row gap-10 items-start">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0"
      >
        <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl glass border-4 border-white/10 group">
          <Image
            src={movie.poster !== "N/A" ? movie.poster : "/placeholder-poster.png"}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized // Using unoptimized for OMDb images to avoid config complexity for a demo
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>

      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.split(", ").map((g) => (
              <Badge key={g} variant="secondary" className="bg-primary/5 text-primary border-primary/10 px-3">
                {g}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gradient leading-tight mb-2">
            {movie.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-foreground font-bold">{movie.imdbRating}</span>
              <span className="text-xs uppercase opacity-70">IMDb</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              {movie.runtime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-5 w-5" />
              {movie.year}
            </span>
            <span className="flex items-center gap-1">
              <Film className="h-5 w-5" />
              {movie.rated}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-xl text-muted-foreground/90 leading-relaxed italic border-l-4 border-primary/20 pl-6">
            {movie.plot}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Director</h4>
              <p className="font-semibold text-lg">{movie.director}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Writer</h4>
              <p className="font-semibold text-lg">{movie.writer}</p>
            </div>
            <div className="sm:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Cast</h4>
              <p className="font-semibold text-lg leading-relaxed text-foreground/80">
                {movie.actors}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
