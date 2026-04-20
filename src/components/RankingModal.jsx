import React, { useState } from "react";

const TABS = ["TUDO", "SPEEDRUN", "PONTUAÇÃO", "ESTRELAS"];

export default function RankingModal({ isOpen, onClose, ranking }) {
  const [tab, setTab] = useState("TUDO");
  const [filter, setFilter] = useState("");

  if (!isOpen) return null;

  const formatTime = (s) =>
    s != null ? `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}` : "-";

  const renderStars = (n) =>
    "★".repeat(n || 0) + "☆".repeat(5 - (n || 0));

  // Classificar conforme aba
  let sorted = [...ranking];
  if (tab === "SPEEDRUN") {
    sorted = sorted
      .filter((r) => r.speedrunSeconds != null)
      .sort((a, b) => a.speedrunSeconds - b.speedrunSeconds);
  } else if (tab === "PONTUAÇÃO") {
    sorted = sorted.sort((a, b) => b.score - a.score);
  } else if (tab === "ESTRELAS") {
    sorted = sorted.sort((a, b) => b.stars - a.stars || b.score - a.score);
  }

  // Filtrar por nome ou caso
  if (filter.trim()) {
    const q = filter.toLowerCase();
    sorted = sorted.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        r.puzzleTitle?.toLowerCase().includes(q)
    );
  }

  const medalColors = ["#ffd600", "#c0c0c0", "#cd7f32"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="ranking-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "860px" }}
      >
        <div className="ptitle" style={{ marginBottom: "1rem" }}>
          ▶ TERMINAL DE RANKING: AGENTES ATIVOS
        </div>

        {/* Abas */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: "'Orbitron',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "2px",
                padding: "5px 12px",
                background: tab === t ? "var(--c)" : "transparent",
                color: tab === t ? "#05080f" : "var(--c)",
                border: "1px solid var(--c)",
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {t}
            </button>
          ))}

          {/* Busca */}
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="FILTRAR..."
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "1px solid var(--brd)",
              color: "var(--c)",
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "0.6rem",
              padding: "5px 10px",
              outline: "none",
              width: "140px",
            }}
          />
        </div>

        <div className="table-wrapper">
          <table className="ranking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>AGENTE</th>
                <th>CASO</th>
                <th>DIFICULDADE</th>
                {tab === "SPEEDRUN" ? (
                  <th>⚡ SPEEDRUN</th>
                ) : (
                  <th>TEMPO</th>
                )}
                <th>★ ESTRELAS</th>
                <th>PONTOS</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length > 0 ? (
                sorted.map((player, i) => (
                  <tr key={i} className="ranking-row">
                    <td
                      className="rank-pos"
                      style={{
                        color: medalColors[i] ?? "#1e3d55",
                        fontFamily: "'Orbitron',sans-serif",
                        fontWeight: 700,
                        fontSize: i < 3 ? "1rem" : ".7rem",
                      }}
                    >
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </td>

                    <td className="player-name">{player.name}</td>
                    <td className="puzzle-name">{player.puzzleTitle}</td>
                    <td
                      style={{
                        fontSize: "0.6rem",
                        color:
                          player.difficulty === "ESPECIALISTA"
                            ? "var(--r)"
                            : player.difficulty === "DIFÍCIL"
                            ? "#ff8800"
                            : player.difficulty === "MÉDIO"
                            ? "var(--y)"
                            : "var(--g)",
                        fontFamily: "'Orbitron',sans-serif",
                        letterSpacing: "1px",
                      }}
                    >
                      {player.difficulty || "-"}
                    </td>

                    <td className="time-val">
                      {tab === "SPEEDRUN" && player.speedrunSeconds != null ? (
                        <span
                          style={{
                            color: "var(--g)",
                            fontFamily: "'Orbitron',sans-serif",
                            fontWeight: 700,
                          }}
                        >
                          ⚡ {formatTime(player.speedrunSeconds)}
                        </span>
                      ) : (
                        formatTime(player.timeSpent)
                      )}
                    </td>

                    <td
                      className="stars-val"
                      style={{
                        letterSpacing: "1px",
                        color:
                          player.stars >= 5
                            ? "var(--g)"
                            : player.stars >= 3
                            ? "var(--y)"
                            : "#5a8aaa",
                      }}
                    >
                      {renderStars(player.stars)}
                    </td>

                    <td
                      className="score-val"
                      style={{
                        fontFamily: "'Orbitron',sans-serif",
                        fontWeight: 700,
                        color: "var(--g)",
                      }}
                    >
                      {player.score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-ranking">
                    NENHUM DADO NO SISTEMA
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button className="btn success" onClick={onClose} style={{ marginTop: "1rem" }}>
          SAIR_DO_TERMINAL
        </button>
      </div>
    </div>
  );
}
