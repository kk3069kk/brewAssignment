import Sentiment from "sentiment";
import { Review, SentimentResult } from "@/types/movie";

const sentiment = new Sentiment();

export function analyzeSentiment(reviews: Review[]): {
  overall: "positive" | "mixed" | "negative";
  score: number;
  summary: string;
} {
  if (reviews.length === 0) {
    return { overall: "mixed", score: 0, summary: "No reviews found." };
  }

  const results = reviews.map((r) => sentiment.analyze(r.content));
  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = totalScore / reviews.length;

  let overall: "positive" | "mixed" | "negative" = "mixed";
  // Refined thresholds for better classification in common scenarios
  if (averageScore >= 2) overall = "positive";
  else if (averageScore <= -2) overall = "negative";
  else overall = "mixed";

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
