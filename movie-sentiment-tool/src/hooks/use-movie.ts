"use client";

import { useState, useCallback } from "react";
import { MovieInsight } from "@/types/movie";
import { fetchMovieDetails, fetchMovieReviews } from "@/services/movie-service";
import { analyzeSentiment } from "@/services/sentiment-service";

export function useMovie() {
  const [data, setData] = useState<MovieInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovieInsight = useCallback(async (imdbId: string) => {
    if (!imdbId || imdbId.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const [movie, reviews] = await Promise.all([
        fetchMovieDetails(imdbId),
        fetchMovieReviews(imdbId),
      ]);

      const sentimentResult = analyzeSentiment(reviews);

      setData({
        movie,
        sentiment: {
          ...sentimentResult,
          reviews,
        },
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch movie data. Please check the IMDb ID.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getMovieInsight };
}
