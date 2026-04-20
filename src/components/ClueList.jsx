export default function ClueList({ clues }) {
  return (
    <div className="panel">
      <div className="ptitle">▶ PISTAS DO CASO</div>
      {clues.map((clue, i) => (
        <div key={i} className="clue">
          <span className="clue-n">#{i + 1}</span>
          <span>{clue}</span>
        </div>
      ))}
    </div>
  );
}
