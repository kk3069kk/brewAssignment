import { useState, useCallback } from "react";
import axios from "axios";

const API_BASES = (
    import.meta.env.VITE_API_BASES || "http://localhost:5000,http://localhost:5001"
)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

async function getWithFallback(path) {
    let lastError;
    for (const base of API_BASES) {
        try {
            return await axios.get(`${base}${path}`);
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError || new Error("API is unreachable");
}

export function useMovie() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMovieInsight = useCallback(async (imdbId) => {
        if (!imdbId || imdbId.trim() === "") return;

        setLoading(true);
        setError(null);

        try {
            const res = await getWithFallback(`/api/movie/${imdbId}`);
            const fullData = res.data;

            if (fullData.error) {
                throw new Error(fullData.error);
            }

            setData(fullData);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.error ||
                err.message ||
                "Failed to fetch movie data. Please check the IMDb ID."
            );
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const getLatestMovie = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getWithFallback("/api/movie/latest");
            if (res.data) {
                setData(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch latest movie:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, getMovieInsight, getLatestMovie };
}
