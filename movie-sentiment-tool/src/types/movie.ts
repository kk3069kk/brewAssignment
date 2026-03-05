export interface Movie {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: { source: string; value: string }[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  dvd?: string;
  boxOffice?: string;
  production?: string;
  website?: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating?: number;
  date: string;
}

export interface SentimentResult {
  score: number;
  comparative: number;
  calculation: { [word: string]: number }[];
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
  label: "positive" | "mixed" | "negative";
}

export interface MovieInsight {
  movie: Movie;
  sentiment: {
    summary: string;
    overall: "positive" | "mixed" | "negative";
    score: number;
    reviews: Review[];
  };
}
