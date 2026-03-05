import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBox({ onSearch, loading }) {
    const [imdbId, setImdbId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (imdbId.trim()) {
            onSearch(imdbId.trim());
        }
    };

    return (
        <div className="search-wrapper">
            <form onSubmit={handleSubmit} className="search-form">
                <Search className="search-icon" />
                <input
                    type="text"
                    placeholder='Enter IMDb Movie ID (e.g., tt0133093)'
                    value={imdbId}
                    onChange={(e) => setImdbId(e.target.value)}
                    className="search-input"
                />
                <button
                    type="submit"
                    disabled={loading || !imdbId.trim()}
                    className="search-btn"
                >
                    {loading ? <div className="spinner" /> : "Analyze"}
                </button>
            </form>
            <p className="search-hint">
                Try <code>tt0133093</code> (The Matrix) or{" "}
                <code>tt0111161</code> (The Shawshank Redemption)
            </p>
        </div>
    );
}
