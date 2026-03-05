import { Star, Clock, Calendar, Film } from "lucide-react";

export default function MovieHero({ movie }) {
    const genreList = movie?.genre ? movie.genre.split(", ") : [];

    return (
        <div className="movie-hero">
            <div className="movie-poster-wrapper">
                <div className="movie-poster-container glass">
                    <img
                        src={movie?.poster && movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                        alt={movie?.title || "Movie poster"}
                        className="movie-poster"
                    />
                    <div className="poster-overlay" />
                </div>
            </div>

            <div className="movie-details">
                <div>
                    <div className="genre-tags">
                        {genreList.map((g) => (
                            <span key={g} className="genre-tag">
                                {g}
                            </span>
                        ))}
                    </div>
                    <h1 className="movie-title">{movie?.title || "Untitled"}</h1>
                    <div className="movie-meta">
                        <span className="movie-meta-item">
                            <Star className="star-icon" />
                            <span className="meta-highlight">{movie?.imdbRating || "N/A"}</span>
                            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7 }}>
                                IMDb
                            </span>
                        </span>
                        <span className="movie-meta-item">
                            <Clock />
                            {movie?.runtime || "N/A"}
                        </span>
                        <span className="movie-meta-item">
                            <Calendar />
                            {movie?.year || "N/A"}
                        </span>
                        <span className="movie-meta-item">
                            <Film />
                            {movie?.rated || "N/A"}
                        </span>
                    </div>
                </div>

                <p className="movie-plot">{movie?.plot || "Plot not available."}</p>

                <div className="movie-credits">
                    <div>
                        <h4 className="credit-label">Director</h4>
                        <p className="credit-value">{movie?.director || "N/A"}</p>
                    </div>
                    <div>
                        <h4 className="credit-label">Writer</h4>
                        <p className="credit-value">{movie?.writer || "N/A"}</p>
                    </div>
                    <div className="credit-full">
                        <h4 className="credit-label">Cast</h4>
                        <p className="credit-value cast">{movie?.actors || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
