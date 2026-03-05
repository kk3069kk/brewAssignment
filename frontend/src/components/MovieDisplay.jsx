import { useState } from "react";
import MovieHero from "./MovieHero";
import SentimentAnalysis from "./SentimentAnalysis";

export default function MovieDisplay({ insight }) {
    const [activeTab, setActiveTab] = useState("sentiment");
    const movie = insight?.movie || insight;
    const sentiment = insight?.sentiment || {
        overall: "mixed",
        score: 0,
        summary: "No sentiment data available.",
        reviews: [],
    };

    if (!movie) return null;

    return (
        <div style={{ paddingBottom: "5rem" }}>
            <MovieHero movie={movie} />

            <div className="separator" />

            <div className="tabs-wrapper">
                <div className="tabs-list">
                    <div className="tabs-list-inner glass-card">
                        <button
                            className={`tab-trigger ${activeTab === "sentiment" ? "active" : ""}`}
                            onClick={() => setActiveTab("sentiment")}
                        >
                            Sentiment Insights
                        </button>
                        <button
                            className={`tab-trigger ${activeTab === "details" ? "active" : ""}`}
                            onClick={() => setActiveTab("details")}
                        >
                            Further Details
                        </button>
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === "sentiment" ? (
                        <SentimentAnalysis sentiment={sentiment} />
                    ) : (
                        <div className="details-grid">
                            <div className="detail-card glass-card">
                                <h4>Awards & Recognition</h4>
                                <p>{movie.awards}</p>
                            </div>
                            <div className="detail-card glass-card">
                                <h4>Box Office</h4>
                                <p>{movie.boxOffice || "N/A"}</p>
                            </div>
                            <div className="detail-card glass-card full">
                                <h4>Production</h4>
                                <p>{movie.production || movie.country}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
