import { useState, useEffect } from 'react';
import IntroScreen from './screens/IntroScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import PUZZLES from './data/index';
import './styles/global.css';
import useRanking from "./hooks/useRanking";

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);

  const { ranking, updateRanking } = useRanking();

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('gameProgress');
    return saved ? JSON.parse(saved) : 0;
  });

  const [playerStats, setPlayerStats] = useState(() => {
    const saved = localStorage.getItem('playerStats');
    return saved
      ? JSON.parse(saved)
      : {
          name: '',
          totalScore: 0,
          casesSolved: 0,
          totalTipsUsed: 0,
          totalWrongAttempts: 0,
          bestTimePerCase: {},
          bestSpeedrunPerCase: {},
          achievements: {
            novice: false,
            intermediate: false,
            master: false,
            speedDemon: false,
            noTips: false,
          },
        };
  });

  useEffect(() => {
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
  }, [progress, playerStats]);

  const setPlayerName = (name) => {
    setPlayerStats(prev => ({ ...prev, name }));
  };

  const handleStart = (idx) => {
    setCurrentPuzzleIdx(idx);
    setScreen('game');
  };

  const handleSolve = (score, hintsUsed, wrongAttempts, timeSpent, speedrunSeconds) => {
    const puzzle = PUZZLES[currentPuzzleIdx];
    const finalName = playerStats.name || "Agente_" + Math.floor(Math.random() * 1000);

    updateRanking({
      name: finalName,
      score,
      timeSpent,
      hintsUsed,
      allFound: true,
      puzzleTitle: puzzle.title,
      difficulty: puzzle.difficulty,
      maxHints: puzzle.maxHints,
      speedrunSeconds: speedrunSeconds ?? null,
    });

    setPlayerStats((prev) => {
      const newStats = { ...prev };
      newStats.totalScore += score;
      newStats.casesSolved += 1;
      newStats.totalTipsUsed += hintsUsed;
      newStats.totalWrongAttempts += wrongAttempts;

      if (!newStats.bestTimePerCase[currentPuzzleIdx] || timeSpent < newStats.bestTimePerCase[currentPuzzleIdx]) {
        newStats.bestTimePerCase[currentPuzzleIdx] = timeSpent;
      }

      if (speedrunSeconds != null) {
        if (!newStats.bestSpeedrunPerCase[currentPuzzleIdx] || speedrunSeconds < newStats.bestSpeedrunPerCase[currentPuzzleIdx]) {
          newStats.bestSpeedrunPerCase[currentPuzzleIdx] = speedrunSeconds;
        }
      }

      if (newStats.totalScore >= 100) newStats.achievements.novice = true;
      if (newStats.totalScore >= 500) newStats.achievements.intermediate = true;
      if (newStats.totalScore >= 1000) newStats.achievements.master = true;
      if (newStats.totalTipsUsed === 0 && newStats.casesSolved >= 1) newStats.achievements.noTips = true;
      if (speedrunSeconds != null && speedrunSeconds <= 60) newStats.achievements.speedDemon = true;

      return newStats;
    });

    if (currentPuzzleIdx + 1 > progress && currentPuzzleIdx + 1 < PUZZLES.length) {
      setProgress(currentPuzzleIdx + 1);
    }

    setScreen('result');
  };

  const handleTimeout = () => setScreen('intro');
  const handleBack = () => setScreen('intro');

  const handleNextCase = () => {
    if (currentPuzzleIdx + 1 < PUZZLES.length) {
      setCurrentPuzzleIdx(currentPuzzleIdx + 1);
      setScreen('game');
    } else {
      setScreen('intro');
    }
  };

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen
          onStart={handleStart}
          progress={progress}
          playerStats={playerStats}
          ranking={ranking}
          setPlayerName={setPlayerName}
        />
      )}
      {screen === 'game' && (
        <GameScreen
          puzzle={PUZZLES[currentPuzzleIdx]}
          onBack={handleBack}
          onSolve={handleSolve}
          onTimeout={handleTimeout}
          playerStats={playerStats}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          puzzle={PUZZLES[currentPuzzleIdx]}
          pidx={currentPuzzleIdx}
          onNext={handleNextCase}
          onBack={handleBack}
          playerStats={playerStats}
        />
      )}
    </>
  );
}
