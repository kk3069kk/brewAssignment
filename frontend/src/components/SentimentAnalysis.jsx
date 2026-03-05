import { MessageSquare, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

export default function SentimentAnalysis({ sentiment }) {
    const {
        overall = "mixed",
        score = 0,
        summary = "No sentiment summary available.",
        reviews = [],
    } = sentiment || {};

    // Map score to 0-100 range for progress bar (sentiment score usually -5 to 5)
    const normalizedScore = Math.min(Math.max(((score + 5) / 10) * 100, 0), 100);

    const getColorClass = () => {
        if (overall === "positive") return "positive";
        if (overall === "negative") return "negative";
        return "mixed";
    };

    const getIcon = () => {
        if (overall === "positive") return <ThumbsUp style={{ color: "var(--green)" }} />;
        if (overall === "negative") return <ThumbsDown style={{ color: "var(--red)" }} />;
        return <AlertCircle style={{ color: "var(--yellow)" }} />;
    };

    return (
        <div>
            <div className="sentiment-header">
                <h3 className="sentiment-title">
                    <MessageSquare />
                    Audience Sentiment
                </h3>
                <span className={`sentiment-badge ${getColorClass()}`}>
                    {overall}
                </span>
            </div>

            <div className="sentiment-card glass-card">
                <div className="sentiment-card-inner">
                    <div className="score-circle">
                        <div className="score-circle-inner">
                            {getIcon()}
                            <span className="score-value">{score.toFixed(1)}</span>
                            <span className="score-label">Avg Score</span>
                        </div>
                    </div>

                    <div className="sentiment-content">
                        <p className="sentiment-summary">"{summary}"</p>
                        <div>
                            <div className="progress-labels">
                                <span>Critical</span>
                                <span>Positive</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className={`progress-fill ${getColorClass()}`}
                                    style={{ width: `${normalizedScore}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reviews-grid">
                {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="review-card glass">
                        <div className="review-header">
                            <span className="review-author">@{review.author}</span>
                            <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-content">{review.content}</p>
                        <div className="review-bars">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <div
                                    key={j}
                                    className={`review-bar ${j < (review.rating || 0) / 2 ? "filled" : ""}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
