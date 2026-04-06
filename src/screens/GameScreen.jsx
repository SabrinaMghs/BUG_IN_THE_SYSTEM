import { useState } from "react";
import useGame from "../hooks/useGame";
import WordGrid    from "../components/WordGrid";
import ProgressBar from "../components/ProgressBar";
import WordChips   from "../components/WordChips";
import ClueList    from "../components/ClueList";
import VerdictForm from "../components/VerdictForm";

export default function GameScreen({ puzzle, onBack, onSolve }) {
  const [answer, setAnswer]   = useState({ culprit: "", language: "", location: "" });
  const [wrongAns, setWrongAns] = useState(false);

  const { foundWords, dragCells, dragging, flash, foundSet, dragSet, allFound, startDrag, moveDrag, endDrag } =
    useGame(puzzle);

  function handleSubmit() {
    if (
      answer.culprit  === puzzle.culprit &&
      answer.language === puzzle.language &&
      answer.location === puzzle.location
    ) {
      onSolve();
    } else {
      setWrongAns(true);
      setTimeout(() => setWrongAns(false), 800);
    }
  }

  return (
    <div className="game">
      {/* Header */}
      <div className="g-hdr">
        <button className="back" onClick={onBack}>← CASOS</button>
        <div
          className="g-badge"
          style={{
            background: puzzle.diffColor + "18",
            color: puzzle.diffColor,
            border: `1px solid ${puzzle.diffColor}44`,
          }}
        >
          CASO {puzzle.id} · {puzzle.difficulty}
        </div>
        <div className="g-title">{puzzle.title}</div>
        <div className="g-sub">{puzzle.subtitle}</div>
      </div>

      {/* Layout */}
      <div className="layout">
        {/* Left: grid */}
        <div>
          <div className="panel" style={{ display: "inline-block" }}>
            <div className="ptitle">▶ GRADE DE EVIDÊNCIAS</div>
            <WordGrid
              puzzle={puzzle}
              foundSet={foundSet}
              dragSet={dragSet}
              flash={flash}
              startDrag={startDrag}
              moveDrag={moveDrag}
              endDrag={endDrag}
            />
            <ProgressBar found={foundWords.length} total={puzzle.wordList.length} />
            <WordChips wordList={puzzle.wordList} foundWords={foundWords} allFound={allFound} />
          </div>
        </div>

        {/* Right: clues + verdict */}
        <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
          <ClueList clues={puzzle.clues} />
          <VerdictForm
            puzzle={puzzle}
            answer={answer}
            setAnswer={setAnswer}
            allFound={allFound}
            wrongAns={wrongAns}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
