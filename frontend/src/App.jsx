import "./App.css";
import { useMovie } from "./hooks/useMovie";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import MovieDisplay from "./components/MovieDisplay";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

function App() {
  const { data, loading, error, getMovieInsight, getLatestMovie } = useMovie();

  useEffect(() => {
    getLatestMovie();
  }, [getLatestMovie]);

  return (
    <main className="main-container">
      <Navbar />

      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <div>
            <h2 className="hero-badge">AI-Powered Movie Insights</h2>
            <h1 className="hero-title">
              Analyze Cinema Through Audience Eyes
            </h1>
            <p className="hero-subtitle">
              Enter an IMDb ID to fetch movie details and get an instant
              sentiment analysis of audience reviews using our premium AI
              engine.
            </p>
          </div>

          <SearchBox onSearch={getMovieInsight} loading={loading} />

          {error && (
            <div className="error-banner">
              <AlertCircle />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Area */}
        {loading ? (
          <div className="skeleton-container">
            <div className="skeleton-layout">
              <div className="skeleton skeleton-poster" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div className="skeleton skeleton-bar" />
                  <div className="skeleton skeleton-bar-sm" />
                </div>
                <div className="skeleton skeleton-block" />
                <div className="skeleton-cols">
                  <div className="skeleton skeleton-half" />
                  <div className="skeleton skeleton-half" />
                </div>
              </div>
            </div>
          </div>
        ) : data ? (
          <MovieDisplay insight={data} />
        ) : (
          <div className="placeholder-state">
            <p>Waiting for input...</p>
          </div>
        )}
      </div>

      {/* Decorative blobs */}
      <div className="blob blob-top" />
      <div className="blob blob-bottom" />
    </main>
  );
}

export default App;
