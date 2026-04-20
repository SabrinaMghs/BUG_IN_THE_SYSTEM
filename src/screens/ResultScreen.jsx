import PUZZLES from "../data/index";
import { calcStars } from "../hooks/useRanking";
import { HINT_LIMITS } from "../hooks/useGame";

export default function ResultScreen({ puzzle, pidx, stats, playerStats, onNext, onBack }) {
  const isTutorial = puzzle?.isTutorialOnly;

  const timeFormatted = stats
    ? `${Math.floor(stats.timeSpent / 60)}:${(stats.timeSpent % 60).toString().padStart(2, "0")}`
    : null;

  const speedrunFormatted = stats?.speedrunSeconds != null
    ? `${Math.floor(stats.speedrunSeconds / 60)}:${(stats.speedrunSeconds % 60).toString().padStart(2, "0")}`
    : null;

  // ─── Estrelas (novo sistema 5 estrelas) ─────────────────────────────────
  const getStarsEarned = () => {
    if (!playerStats) return stats?.stars || 0;
    const score = playerStats.totalScore;
    if (score >= 1000) return 5;
    if (score >= 700) return 4;
    if (score >= 400) return 3;
    if (score >= 150) return 2;
    if (score >= 50) return 1;
    return 0;
  };

  const starsEarned = getStarsEarned();

  const renderStarRow = (n) => Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      style={{
        fontSize: i < n ? "1.8rem" : "1.4rem",
        color: i < n ? "var(--y)" : "#1e3d55",
        textShadow: i < n ? "0 0 12px var(--y)" : "none",
        transition: "all .3s",
        animationDelay: `${i * 0.1}s`,
      }}
    >
      {i < n ? "★" : "☆"}
    </span>
  ));

  // Dificuldade e limite de dicas do puzzle
  const diffKey = puzzle?.difficulty?.toUpperCase() ?? "MÉDIO";
  const maxHints = HINT_LIMITS[diffKey] !== undefined ? HINT_LIMITS[diffKey] : 2;

  const speedThresholds = { "FÁCIL": 120, "MÉDIO": 90, "DIFÍCIL": 70, "ESPECIALISTA": 60 };
  const speedThreshold = speedThresholds[diffKey] ?? 90;

  return (
    <div className="result">
      <div className="res-case">
        {isTutorial ? "TUTORIAL" : `CASO ${puzzle.id} · ${puzzle.difficulty}`}
      </div>
      <div className="res-big">
        {isTutorial ? "TREINAMENTO CONCLUÍDO" : "CASO FECHADO"}
      </div>
      <div className="res-sub">
        {isTutorial ? "VOCÊ ESTÁ PRONTO" : "INVESTIGAÇÃO CONCLUÍDA"}
      </div>

      {/* ── Estrelas visuais ─────────────────────────────────── */}
      <div style={{
        display: "flex", gap: "6px", margin: "1rem 0",
        justifyContent: "center", alignItems: "center",
      }}>
        {renderStarRow(starsEarned)}
      </div>

      <div style={{
        fontFamily: "'Orbitron',sans-serif", fontSize: ".5rem",
        letterSpacing: "3px", color: "#1e3d55", marginBottom: "1.2rem", textAlign: "center",
      }}>
        {starsEarned === 5 ? "⚡ PERFOMANCE PERFEITA" :
         starsEarned >= 4 ? "EXCELENTE DESEMPENHO" :
         starsEarned >= 3 ? "BOM DESEMPENHO" :
         starsEarned >= 2 ? "MISSÃO CUMPRIDA" :
         starsEarned >= 1 ? "CASO SOLUCIONADO" : "CONTINUE TREINANDO"}
      </div>

      {/* ── Objetivos da missão ──────────────────────────────── */}
      {stats && (
        <div className="res-card">
          <div className="stats-header">OBJETIVOS DA MISSÃO</div>

          <div className={`res-row ${stats.allFound ? "met" : ""}`}>
            <span>ENCONTRAR TODAS AS PALAVRAS</span>
            <span>{stats.allFound ? "✔" : "✘"}</span>
          </div>

          <div className={`res-row ${stats.hintsUsed === 0 ? "met" : ""}`}>
            <span>FINALIZAR SEM DICAS</span>
            <span>{stats.hintsUsed === 0 ? "✔" : `✘ (${stats.hintsUsed}/${maxHints})`}</span>
          </div>

          <div className={`res-row ${stats.timeSpent <= speedThreshold ? "met" : ""}`}>
            <span>RESOLVER EM MENOS DE {Math.floor(speedThreshold / 60)}:{String(speedThreshold % 60).padStart(2,"0")}</span>
            <span>{stats.timeSpent <= speedThreshold ? "✔" : "✘"}</span>
          </div>

          {timeFormatted && (
            <div className="res-row">
              <span>TEMPO TOTAL</span>
              <span>{timeFormatted}</span>
            </div>
          )}

          {/* Speedrun */}
          {speedrunFormatted && (
            <div className="res-row met" style={{ borderColor: "var(--c)" }}>
              <span>⚡ SPEEDRUN (1ª → ÚLTIMA PALAVRA)</span>
              <span style={{ color: "var(--c)", fontFamily: "'Orbitron',sans-serif" }}>
                {speedrunFormatted}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Performance geral ───────────────────────────────── */}
      {!isTutorial && playerStats && (
        <div className="res-stats-card">
          <div className="stats-header">📊 SUA PERFORMANCE</div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">PONTUAÇÃO TOTAL</span>
              <span className="stat-value">{playerStats.totalScore}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">CASOS SOLUCIONADOS</span>
              <span className="stat-value">{playerStats.casesSolved}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">DICAS USADAS</span>
              <span className="stat-value">{playerStats.totalTipsUsed}</span>
            </div>
            {playerStats.bestSpeedrunPerCase &&
              Object.keys(playerStats.bestSpeedrunPerCase).length > 0 && (
              <div className="stat-item">
                <span className="stat-label">MELHOR SPEEDRUN</span>
                <span className="stat-value" style={{ color: "var(--c)", fontSize: ".8rem" }}>
                  ⚡ {Math.min(...Object.values(playerStats.bestSpeedrunPerCase))}s
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Narrativa ───────────────────────────────────────── */}
      {puzzle.narrative && (
        <div className="res-narrative">
          <div className="res-narrative-title">📋 RELATÓRIO NARRATIVO</div>
          <p className="res-narrative-text">{puzzle.narrative}</p>
        </div>
      )}

      {/* ── Relatório final ─────────────────────────────────── */}
      {!isTutorial && (
        <div className="res-card">
          <div className="ptitle" style={{ marginBottom: ".4rem" }}>▶ RELATÓRIO FINAL</div>
          {[
            ["👤 CULPADO", puzzle.culprit],
            ["💻 LINGUAGEM", puzzle.language],
            ["📍 LOCAL", puzzle.location],
          ].map(([l, v]) => (
            <div key={l} className="res-row">
              <span className="res-lbl">{l}</span>
              <span className="res-val">{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Conquistas ──────────────────────────────────────── */}
      {!isTutorial && playerStats?.achievements && (
        <div className="res-achievements">
          <div className="res-achievements-title">🏅 CONQUISTAS DESBLOQUEADAS</div>
          <div className="achievements-grid">
            {playerStats.achievements.novice && <div className="ach-badge">⭐ NOVATO</div>}
            {playerStats.achievements.intermediate && <div className="ach-badge">⭐⭐ INTERMEDIÁRIO</div>}
            {playerStats.achievements.master && <div className="ach-badge">⭐⭐⭐ MESTRE</div>}
            {playerStats.achievements.noTips && <div className="ach-badge">🎯 SEM DICAS</div>}
            {playerStats.achievements.speedDemon && <div className="ach-badge">⚡ SPEED DEMON</div>}
          </div>
        </div>
      )}

      {/* ── Botões ──────────────────────────────────────────── */}
      <div className="btn-row">
        {pidx < PUZZLES.length - 1 && (
          <button className="btn2 a" onClick={onNext}>PRÓXIMO CASO →</button>
        )}
        <button className="btn2 b" onClick={onBack}>← TODOS OS CASOS</button>
      </div>

      {pidx === PUZZLES.length - 1 && !isTutorial && (
        <div className="res-end">🎉 PARABÉNS! TODOS OS CASOS FORAM SOLUCIONADOS 🎉</div>
      )}
    </div>
  );
}
