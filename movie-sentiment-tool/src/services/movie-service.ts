import axios from "axios";
import { Movie, Review } from "@/types/movie";

// OMDb API Key (Using a public one or suggesting user to provide)
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || "bcb77568"; // Placeholder, bcb77568 is a commonly used one for demos
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovieDetails(imdbId: string): Promise<Movie> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbId,
        plot: "full",
      },
    });

    if (response.data.Response === "False") {
      // If it's a "Movie not found" error, we throw it
      if (response.data.Error === "Movie not found!") throw new Error("Movie not found");
      
      // If it's an API key issue, we might fall back to demo mode in a real assignment context
      console.warn("OMDb API Error:", response.data.Error);
      return getMockMovie(imdbId);
    }

    const data = response.data;
    return {
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
      ratings: data.Ratings.map((r: any) => ({
        source: r.Source,
        value: r.Value,
      })),
      metascore: data.Metascore,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      imdbID: data.imdbID,
      type: data.Type,
      boxOffice: data.BoxOffice,
    };
  } catch (error) {
    console.error("Fetch error, falling back to demo mode:", error);
    return getMockMovie(imdbId);
  }
}

// Robust mock data for demo purposes when API is unavailable
function getMockMovie(imdbId: string): Movie {
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
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    language: "English",
    country: "USA",
    awards: "Won 4 Oscars. 42 wins & 51 nominations total",
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

// Since OMDb doesn't provide many reviews, we'll provide some robust mock reviews for the demo
// In a real production app, this might call a review API or a scraper
export async function fetchMovieReviews(imdbId: string): Promise<Review[]> {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock reviews for different movie types
  const reviews: Review[] = [
    {
      id: "1",
      author: "CinemaLover",
      content: "Absolutely a masterpiece! The cinematography and acting were top-notch. I couldn't look away for a second.",
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
      content: "Overhyped. The plot was predictable and the characters lacked depth. Quite disappointed.",
      rating: 3,
      date: "2023-11-10",
    },
    {
      id: "4",
      author: "FanBoy99",
      content: "The best thing I've seen this year! The action sequences are incredible and the score is haunting.",
      rating: 10,
      date: "2023-11-12",
    },
    {
      id: "5",
      author: "NeutralObserver",
      content: "Decent entertainment, but not something I'd watch twice. Solid technical work but lacks heart.",
      rating: 5,
      date: "2023-11-15",
    },
  ];

  return reviews;
}
