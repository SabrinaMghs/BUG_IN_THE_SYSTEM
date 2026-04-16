export default function ClueList({ clues, maxVisible = 3, onRevealMore }) {
  const visibleClues = clues.slice(0, maxVisible);
  const hasMore = clues.length > maxVisible;

  return (
    <div className="panel">
      <div className="ptitle">▶ PISTAS DO CASO</div>

      {visibleClues.map((clue, i) => (
        <div key={i} className="clue">
          <span className="clue-n">#{i + 1}</span>
          <span>{clue}</span>
        </div>
      ))}

      {hasMore && (
        <button
          className="btn2 a"
          onClick={onRevealMore}
          style={{ marginTop: ".5rem", width: "100%" }}
        >
          🔍 VER MAIS PISTAS (- pontos)
        </button>
      )}
    </div>
  );
}