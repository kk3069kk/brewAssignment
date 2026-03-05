const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const Sentiment = require("sentiment");
require("dotenv").config();

const Movie = require("./models/Movie");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const API_KEY = process.env.OMDB_API_KEY || "bcb77568";
const BASE_URL = "https://www.omdbapi.com/";
const MONGO_URL = process.env.MONGO_URL;

const sentiment = new Sentiment();

app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ──────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ─── Sentiment Analysis Helper ──────────────────────────────────────────────
function analyzeSentiment(reviews) {
  if (reviews.length === 0) {
    return { overall: "mixed", score: 0, summary: "No reviews found." };
  }

  const results = reviews.map((r) => sentiment.analyze(r.content));
  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = totalScore / reviews.length;

  let overall = "mixed";
  if (averageScore >= 2) overall = "positive";
  else if (averageScore <= -2) overall = "negative";

  const positiveWords = results.flatMap((r) => r.positive);
  const negativeWords = results.flatMap((r) => r.negative);

  const topPos = Array.from(new Set(positiveWords)).slice(0, 3).join(", ");
  const topNeg = Array.from(new Set(negativeWords)).slice(0, 3).join(", ");

  let summary = `The overall sentiment is ${overall}. `;
  if (positiveWords.length > negativeWords.length) {
    summary += `Audiences appreciated aspects like: ${topPos}. `;
  } else if (negativeWords.length > positiveWords.length) {
    summary += `Critical reviews mentioned concerns such as: ${topNeg}. `;
  } else {
    summary += `Opinions are fairly divided among the audience. `;
  }

  return { overall, score: averageScore, summary };
}

// ─── Fetch movie details & sentiment ──────────────────────────────────────────
app.get("/api/movie/:imdbId(tt\\d+)", async (req, res) => {
  const { imdbId } = req.params;
  if (!imdbId || !imdbId.trim()) {
    return res.status(400).json({ error: "IMDb ID is required" });
  }

  try {
    let movieData;
    try {
      const movieResponse = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          i: imdbId,
          plot: "full",
        },
        timeout: 10000,
      });

      if (movieResponse.data.Response === "False") {
        if (movieResponse.data.Error === "Movie not found!") {
          return res.status(404).json({ error: "Movie not found" });
        }
        movieData = getMockMovie(imdbId);
      } else {
        const data = movieResponse.data;
        movieData = {
          title: data.Title,
          year: data.Year,
          rated: data.Rated,
          released: data.Released,
          runtime: data.Runtime,
          genre: data.Genre,
          director: data.Director,
          writer: data.Writer,
          actors: data.Actors,
          plot: data.Plot,
          language: data.Language,
          country: data.Country,
          awards: data.Awards,
          poster: data.Poster,
          ratings: Array.isArray(data.Ratings)
            ? data.Ratings.map((r) => ({
                source: r.Source,
                value: r.Value,
              }))
            : [],
          metascore: data.Metascore,
          imdbRating: data.imdbRating,
          imdbVotes: data.imdbVotes,
          imdbID: data.imdbID,
          type: data.Type,
          boxOffice: data.BoxOffice,
        };
      }
    } catch (omdbError) {
      console.error("OMDb fetch failed, using mock data:", omdbError.message || omdbError);
      movieData = getMockMovie(imdbId);
    }

    // Mock reviews
    const reviews = getMockReviews();
    const sentimentResult = analyzeSentiment(reviews);

    const fullData = {
      ...movieData,
      sentiment: {
        ...sentimentResult,
        reviews,
      },
      updatedAt: new Date(),
    };

    // Save or update in MongoDB, but do not fail the API response if DB is unavailable.
    try {
      await Movie.findOneAndUpdate({ imdbID: imdbId }, fullData, {
        upsert: true,
        returnDocument: "after",
      });
    } catch (dbError) {
      console.error("Mongo save failed:", dbError.message || dbError);
    }

    res.json(fullData);
  } catch (error) {
    console.error("Error processing movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Get latest searched movie ───────────────────────────────────────────────
app.get("/api/movie/latest", async (req, res) => {
  try {
    const latest = await Movie.findOne().sort({ updatedAt: -1 });
    res.json(latest || null);
  } catch (error) {
    console.error("Latest movie fetch failed:", error.message || error);
    res.json(null);
  }
});

// ─── Helper: Mock reviews ────────────────────────────────────────────────────
function getMockReviews() {
  return [
    {
      id: "1",
      author: "CinemaLover",
      content: "Absolutely a masterpiece! The cinematography and acting were top-notch.",
      rating: 9,
      date: "2023-11-01",
    },
    {
      id: "2",
      author: "MovieBuff22",
      content: "It was okay, but a bit slow in the middle. The ending redeemed it though.",
      rating: 6,
      date: "2023-11-05",
    },
    {
      id: "3",
      author: "HarshCritic",
      content: "Overhyped. Predictable and characters lacked depth. Quite disappointed.",
      rating: 3,
      date: "2023-11-10",
    },
    {
      id: "4",
      author: "FanBoy99",
      content: "The best thing I've seen this year! The action sequences are incredible.",
      rating: 10,
      date: "2023-11-12",
    },
    {
      id: "5",
      author: "NeutralObserver",
      content: "Decent entertainment, but not something I'd watch twice.",
      rating: 5,
      date: "2023-11-15",
    },
  ];
}

// ─── Helper: Mock movie ──────────────────────────────────────────────────────
function getMockMovie(imdbId) {
  return {
    title: "The Matrix (Demo Mode)",
    year: "1999",
    rated: "R",
    released: "31 Mar 1999",
    runtime: "136 min",
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    writer: "Lana Wachowski, Lilly Wachowski",
    actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
    language: "English",
    country: "USA",
    awards: "Won 4 Oscars.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    ratings: [{ source: "Internet Movie Database", value: "8.7/10" }],
    metascore: "73",
    imdbRating: "8.7",
    imdbVotes: "2,042,351",
    imdbID: imdbId,
    type: "movie",
    boxOffice: "$171,479,930",
  };
}

// ─── Start server ────────────────────────────────────────────────────────────
function startServer(port, retriesLeft = 10) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && retriesLeft > 0) {
      const nextPort = port + 1;
      console.warn(`Port ${port} in use, retrying on ${nextPort}...`);
      startServer(nextPort, retriesLeft - 1);
      return;
    }

    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

startServer(PORT);
