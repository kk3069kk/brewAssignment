import { analyzeSentiment } from "@/services/sentiment-service";
import { Review } from "@/types/movie";

describe("analyzeSentiment", () => {
  it("should return positive sentiment for highly positive reviews", () => {
    const reviews: Review[] = [
      { id: "1", author: "A", content: "Amazing movie, absolutely loved it, fantastic!", date: "2023-01-01" },
      { id: "2", author: "B", content: "Great acting and wonderful plot, masterpiece.", date: "2023-01-02" },
    ];
    const result = analyzeSentiment(reviews);
    expect(result.overall).toBe("positive");
    expect(result.score).toBeGreaterThanOrEqual(2);
  });

  it("should return negative sentiment for negative reviews", () => {
    const reviews: Review[] = [
      { id: "1", author: "A", content: "Terrible experience, hated it.", date: "2023-01-01" },
      { id: "2", author: "B", content: "Bad acting and poor direction.", date: "2023-01-02" },
    ];
    const result = analyzeSentiment(reviews);
    expect(result.overall).toBe("negative");
    expect(result.score).toBeLessThan(-1);
  });

  it("should return mixed sentiment for mixed reviews", () => {
    const reviews: Review[] = [
      { id: "1", author: "A", content: "It was okay, not great.", date: "2023-01-01" },
      { id: "2", author: "B", content: "Some good parts but mostly boring.", date: "2023-01-02" },
    ];
    const result = analyzeSentiment(reviews);
    expect(result.overall).toBe("mixed");
  });

  it("should handle empty reviews gracefully", () => {
    const result = analyzeSentiment([]);
    expect(result.overall).toBe("mixed");
    expect(result.summary).toBe("No reviews found.");
  });
});
