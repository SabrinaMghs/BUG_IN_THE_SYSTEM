import { useState, useEffect } from "react";

export function calcStars({ score, hintsUsed, timeSpent, allFound, maxHints, difficulty }) {
  let stars = 0;


  if (allFound) stars += 1;


  if (hintsUsed === 0) stars += 1;

  const speedThresholds = {
    "FÁCIL": 120,
    "MÉDIO": 90,
    "DIFÍCIL": 70,
    "ESPECIALISTA": 60,
  };
  const diffKey = (difficulty ?? "MÉDIO").toUpperCase();
  const threshold = speedThresholds[diffKey] ?? 90;
  if (timeSpent > 0 && timeSpent <= threshold) stars += 1;


  const scoreThresholds = {
    "FÁCIL": 500,
    "MÉDIO": 600,
    "DIFÍCIL": 700,
    "ESPECIALISTA": 800,
  };
  const scoreThresh = scoreThresholds[diffKey] ?? 600;
  if (score >= scoreThresh) stars += 1;

  if (stars === 4 && hintsUsed === 0) stars = 5;

  return Math.min(stars, 5);
}

export default function useRanking() {
  const [ranking, setRanking] = useState(() => {
    const saved = localStorage.getItem("ranking");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ranking", JSON.stringify(ranking));
  }, [ranking]);

  function updateRanking({ name, score, timeSpent, allFound, hintsUsed, puzzleTitle, difficulty, maxHints, speedrunSeconds }) {
    const stars = calcStars({ score, hintsUsed, timeSpent, allFound, maxHints, difficulty });

    const newEntry = {
      name,
      score,
      timeSpent,
      speedrunSeconds: speedrunSeconds ?? null,
      stars,
      puzzleTitle,
      difficulty: difficulty ?? "",
      date: new Date().toLocaleDateString("pt-BR"),
    };

    const updated = [...ranking, newEntry]
      .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
      .slice(0, 20);

    setRanking(updated);
  }

  return { ranking, updateRanking };
}
