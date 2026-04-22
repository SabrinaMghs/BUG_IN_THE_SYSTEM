import { useState } from "react";

const CREATORS = [
{ name: "Anthony Matheus" },
{ name: "Emerson de Melo Silva" },
{ name: "George Rufino"}, 
{ name: "Isabelle Andrade" },
{ name: "Klayverton Emerson" },
{ name: "Sabrina de Lima Magalhães" },
{ name: "Thyago Felipe" },
];

export default function CreditsModal({ isOpen, onClose }) {
  const [glitchIdx, setGlitchIdx] = useState(null);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ zIndex: 200 }}
    >
      <div
        className="ranking-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "520px",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decoração de fundo */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,229,255,.025) 29px)",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Título */}
          <div style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: ".45rem",
            letterSpacing: "6px",
            color: "#1e3d55",
            marginBottom: ".3rem",
          }}>
            ▶ ARQUIVO · SISTEMA · v1.0
          </div>

          <div style={{
            fontFamily: "'Orbitron',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
            color: "var(--c)",
            textShadow: "0 0 20px var(--c)",
            letterSpacing: "4px",
            marginBottom: ".2rem",
          }}>
            BUG<span style={{ color: "var(--r)", textShadow: "0 0 20px var(--r)" }}> IN THE SYSTEM</span>
          </div>

          <div style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: ".65rem",
            color: "#2d5a7a",
            marginBottom: "1.8rem",
            lineHeight: 1.6,
            borderLeft: "2px solid var(--brd)",
            paddingLeft: ".8rem",
          }}>
            Caça-palavras de mistério em TI.<br />
            Encontre as evidências, desvende o código,<br />
            identifique o culpado antes que o tempo acabe.
          </div>

          {/* Linha divisória */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--c), transparent)",
            marginBottom: "1.5rem",
            opacity: .3,
          }} />

          <div style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: ".45rem",
            letterSpacing: "5px",
            color: "#1e3d55",
            marginBottom: "1rem",
          }}>
            EQUIPE DE DESENVOLVIMENTO
          </div>

          {/* Lista de criadores */}
          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", marginBottom: "1.8rem" }}>
            {CREATORS.map((c, i) => (
              <div
                key={i}
                onMouseEnter={() => setGlitchIdx(i)}
                onMouseLeave={() => setGlitchIdx(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".5rem .8rem",
                  background: glitchIdx === i
                    ? "rgba(0,229,255,.07)"
                    : "rgba(0,229,255,.02)",
                  border: `1px solid ${glitchIdx === i ? "rgba(0,229,255,.25)" : "var(--brd)"}`,
                  transition: "all .15s",
                  cursor: "default",
                }}
              >
                <span style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: ".72rem",
                  color: glitchIdx === i ? "#fff" : "#a0c8e8",
                  letterSpacing: "1px",
                  transition: "color .15s",
                }}>
                  {glitchIdx === i ? "> " : "  "}{c.name}
                </span>
                <span style={{
                  fontFamily: "'Orbitron',sans-serif",
                  fontSize: ".42rem",
                  letterSpacing: "2px",
                  color: glitchIdx === i ? "var(--y)" : "#1e3d55",
                  transition: "color .15s",
                }}>
                  {c.role}
                </span>
              </div>
            ))}
          </div>

          {/* Linha divisória */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--brd), transparent)",
            marginBottom: "1rem",
          }} />

          {/* Rodapé de créditos */}
          <div style={{
            textAlign: "center",
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: ".55rem",
            color: "#1e3d55",
            lineHeight: 1.8,
            marginBottom: "1.4rem",
          }}>
            <span style={{ color: "#2d5a7a" }}>ENGINE</span> · React + Vite<br />
            <span style={{ color: "#2d5a7a" }}>FONTES</span> · Orbitron · Share Tech Mono<br />
            <span style={{ color: "#2d5a7a" }}>ANO</span> · 2025
          </div>

          <button
            className="btn success"
            onClick={onClose}
            style={{ background: "transparent" }}
          >
            FECHAR_ARQUIVO
          </button>
        </div>
      </div>
    </div>
  );
}
