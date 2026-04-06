export default function ProgressBar({ found, total }) {
  const pct = total > 0 ? (found / total) * 100 : 0;
  return (
    <div style={{ marginTop: ".7rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="ptitle" style={{ margin: 0, border: "none", padding: 0 }}>PROGRESSO</span>
        <span style={{ fontSize: ".52rem", color: "var(--c)", fontFamily: "'Orbitron',sans-serif" }}>
          {found}/{total}
        </span>
      </div>
      <div className="prog">
        <div className="prog-f" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
