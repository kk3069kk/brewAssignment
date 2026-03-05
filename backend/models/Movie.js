const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    imdbID: { type: String, required: true, unique: true },
    title: String,
    year: String,
    rated: String,
    released: String,
    runtime: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    awards: String,
    poster: String,
    ratings: [
        {
            source: String,
            value: String,
        },
    ],
    metascore: String,
    imdbRating: String,
    imdbVotes: String,
    type: String,
    boxOffice: String,
    sentiment: {
        overall: String,
        score: Number,
        summary: String,
        reviews: [
            {
                id: String,
                author: String,
                content: String,
                rating: Number,
                date: String,
            },
        ],
    },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", MovieSchema);
