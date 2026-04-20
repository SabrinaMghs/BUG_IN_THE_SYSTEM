import { useState, useRef, useEffect } from "react";

export function cellKey(r, c) {
  return `${r},${c}`;
}

export function getLineCells(r0, c0, r1, c1) {
  const dr = r1 - r0, dc = c1 - c0;
  if (dr === 0 && dc === 0) return [{ r: r0, c: c0 }];
  const absDr = Math.abs(dr), absDc = Math.abs(dc);
  if (dr !== 0 && dc !== 0 && absDr !== absDc) return [{ r: r0, c: c0 }];
  const steps = Math.max(absDr, absDc);
  const sr = Math.sign(dr), sc = Math.sign(dc);
  const cells = [];
  for (let i = 0; i <= steps; i++) {
    cells.push({ r: r0 + i * sr, c: c0 + i * sc });
  }
  return cells;
}

export const HINT_LIMITS = {
  "FÁCIL": 3,
  "MÉDIO": 2,
  "DIFÍCIL": 1,
  "ESPECIALISTA": 0,
};

export function hintPenalty(hintsUsed) {
  return [30, 50, 80][hintsUsed] ?? 100;
}

export default function useGame(puzzle) {
  const [foundWords, setFoundWords] = useState([]);
  const [dragCells, setDragCells] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [flash, setFlash] = useState(null);
  const [errorFlash, setErrorFlash] = useState(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [hiddenWordFound, setHiddenWordFound] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [speedrunStart, setSpeedrunStart] = useState(null);
  const [speedrunEnd, setSpeedrunEnd] = useState(null);

  const startCell = useRef(null);

  const diffKey = puzzle?.difficulty?.toUpperCase() ?? "MÉDIO";
  const maxHints = HINT_LIMITS[diffKey] !== undefined ? HINT_LIMITS[diffKey] : HINT_LIMITS["MÉDIO"];
  const hintsExhausted = hintsUsed >= maxHints;

  useEffect(() => {
    if (puzzle && !puzzle.isTutorial && !puzzle.isTutorialOnly) {
      const saved = localStorage.getItem(`puzzle_${puzzle.id}_progress`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFoundWords(parsed.foundWords || []);
        setScore(parsed.score || 0);
        setHintsUsed(parsed.hintsUsed || 0);
        setWrongAttempts(parsed.wrongAttempts || 0);
        setSpeedrunStart(parsed.speedrunStart || null);
        setSpeedrunEnd(parsed.speedrunEnd || null);
      } else {
        resetAll();
      }
    } else {
      resetAll();
    }
    setDragCells([]);
    setDragging(false);
    setFlash(null);
    setErrorFlash(null);
    setWrongCount(0);
    setHiddenWordFound(false);
    startCell.current = null;
  }, [puzzle?.id]);

  function resetAll() {
    setFoundWords([]);
    setScore(0);
    setHintsUsed(0);
    setWrongAttempts(0);
    setSpeedrunStart(null);
    setSpeedrunEnd(null);
  }

  useEffect(() => {
    if (puzzle && !puzzle.isTutorial && !puzzle.isTutorialOnly) {
      localStorage.setItem(`puzzle_${puzzle.id}_progress`, JSON.stringify({
        foundWords, score, hintsUsed, wrongAttempts, speedrunStart, speedrunEnd,
      }));
    }
  }, [foundWords, score, hintsUsed, wrongAttempts, speedrunStart, speedrunEnd, puzzle]);

  const foundSet = new Set(
    foundWords.flatMap((w) => {
      const entry = puzzle?.wordList.find((x) => x.word === w);
      return entry ? entry.cells.map(({ r, c }) => cellKey(r, c)) : [];
    })
  );

  const dragSet = new Set(dragCells.map(({ r, c }) => cellKey(r, c)));
  const allFound = puzzle?.wordList.every((e) => foundWords.includes(e.word)) ?? false;

  const visibleWords = puzzle?.wordList.filter(w => !w.hidden) ?? [];
  const foundVisible = foundWords.filter(w => {
    const e = puzzle?.wordList.find(x => x.word === w);
    return e && !e.hidden;
  });
  const progressPct = visibleWords.length > 0
    ? Math.round((foundVisible.length / visibleWords.length) * 100)
    : 0;

  function tryMatch(cells) {
    if (!puzzle) return null;
    for (const entry of puzzle.wordList) {
      if (foundWords.includes(entry.word)) continue;
      if (entry.cells.length !== cells.length) continue;
      const fwd = entry.cells.every((ec, i) => ec.r === cells[i].r && ec.c === cells[i].c);
      const rev = entry.cells.every((ec, i) =>
        ec.r === cells[cells.length - 1 - i].r && ec.c === cells[cells.length - 1 - i].c
      );
      if (fwd || rev) {
        if (entry.hidden) setHiddenWordFound(true);
        return entry.word;
      }
    }
    return null;
  }

  function isValidLine(r0, c0, r1, c1) {
    const dr = r1 - r0, dc = c1 - c0;
    if (dr === 0 && dc === 0) return true;
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return false;
    return true;
  }

  function startDrag(r, c) {
    if (foundSet.has(cellKey(r, c))) return;
    startCell.current = { r, c };
    setDragging(true);
    setDragCells([{ r, c }]);
  }

  function moveDrag(r, c) {
    if (!dragging || !startCell.current) return;
    const { r: r0, c: c0 } = startCell.current;
    if (!isValidLine(r0, c0, r, c)) return;
    const cells = getLineCells(r0, c0, r, c);
    const hasFound = cells.some(cell => foundSet.has(cellKey(cell.r, cell.c)));
    if (hasFound) return;
    setDragCells(cells);
  }

  function endDrag() {
    if (!dragging) return;
    const matched = tryMatch(dragCells);

    if (matched) {
      const now = Date.now();
      setSpeedrunStart(prev => prev ?? now);

      const wordEntry = puzzle?.wordList.find(e => e.word === matched);
      const wordLen = wordEntry?.cells.length ?? 4;
      const base = 50 + wordLen * 10;
      const precisionBonus = wrongAttempts === 0 ? 40 : 0;
      const errorPenalty = Math.min(wrongAttempts * 8, 60);
      const pointsEarned = Math.max(20, base + precisionBonus - errorPenalty);

      setScore(prev => prev + pointsEarned);

      const newFound = [...foundWords, matched];
      setFoundWords(newFound);

      const nonHidden = puzzle?.wordList.filter(w => !w.hidden) ?? [];
      if (nonHidden.every(e => newFound.includes(e.word))) {
        setSpeedrunEnd(now);
      }

      setFlash(matched);
      setTimeout(() => setFlash(null), 900);
    } else if (dragCells.length >= 3) {
      const attemptedWord = dragCells.map(({ r, c }) => puzzle?.grid[r][c]).join("");
      setErrorFlash(attemptedWord);
      setWrongCount(prev => prev + 1);
      setWrongAttempts(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 8));
      setTimeout(() => setErrorFlash(null), 600);
    }

    setDragging(false);
    setDragCells([]);
    startCell.current = null;
  }

  function useHint() {
    if (allFound || !puzzle) return null;
    if (puzzle.isTutorial || puzzle.isTutorialOnly) return null;
    if (maxHints === 0) return "NO_HINTS_LEFT";
    if (hintsExhausted) return "NO_HINTS_LEFT";

    const remainingWords = puzzle.wordList.filter(
      w => !foundWords.includes(w.word) && !w.hidden
    );
    if (remainingWords.length === 0) return null;

    const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    const penalty = hintPenalty(hintsUsed);
    setHintsUsed(prev => prev + 1);
    setScore(prev => Math.max(0, prev - penalty));

    setFlash(randomWord.word);
    setTimeout(() => setFlash(null), 1800);

    return randomWord.word;
  }

  function resetProgress() {
    if (puzzle && !puzzle.isTutorial && !puzzle.isTutorialOnly) {
      localStorage.removeItem(`puzzle_${puzzle.id}_progress`);
    }
    resetAll();
    setWrongCount(0);
    setHiddenWordFound(false);
    setDragCells([]);
    setDragging(false);
    setFlash(null);
    setErrorFlash(null);
    startCell.current = null;
  }

  function registerWrongVerdict() {
    setWrongCount(prev => prev + 1);
    setScore(prev => Math.max(0, prev - 15));
  }

  const speedrunSeconds =
    speedrunStart && speedrunEnd
      ? Math.round((speedrunEnd - speedrunStart) / 1000)
      : null;

  return {
    foundWords, dragCells, dragging, flash, errorFlash,
    foundSet, dragSet, allFound, wrongCount, hiddenWordFound,
    score, hintsUsed, wrongAttempts, maxHints, hintsExhausted,
    progressPct, speedrunSeconds,
    startDrag, moveDrag, endDrag, registerWrongVerdict, useHint, resetProgress,
  };
}
