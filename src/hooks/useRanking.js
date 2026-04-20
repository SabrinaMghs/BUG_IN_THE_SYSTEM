import { useState, useEffect } from "react";

export default function useRanking() {
    const [ranking, setRanking] = useState(() => {
        const saved = localStorage.getItem("ranking");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("ranking", JSON.stringify(ranking));
    }, [ranking]);

    function updateRanking({ name, score, timeSpent, allFound, hintsUsed, puzzleTitle }) {
        
        let stars = 0;
        if (allFound) stars += 1;
        if (hintsUsed === 0) stars += 1;
        if (timeSpent <= 90) stars += 1;

        const newEntry = {
            name,
            score,
            timeSpent,
            stars,
            puzzleTitle,
            date: new Date().toLocaleDateString()
        };

        // Ordena por maior pontuação e menor tempo
        const updated = [...ranking, newEntry]
            .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
            .slice(0, 15); 

        setRanking(updated);
    }

    return { ranking, updateRanking };
}
