import { useState } from "react";
import PUZZLES from "../data/index";
import RankingModal from "../components/RankingModal";
import CreditsModal from "../components/CreditsModal";

export default function IntroScreen({ onStart, progress, ranking }) {
  const [isRankOpen, setIsRankOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  return (
    <div className="intro">
      {/* Logo principal */}
      <div className="logo">
        BUG<em> In The System</em>
      </div>

      <div className="logo-sub" style={{ color: "#0245ff" }}>
        CAÇA-PALAVRAS DE MISTÉRIO EM TI
      </div>

      {/* Cards de Puzzle */}
      <div className="cards">
        {PUZZLES.map((p, i) => {
          const locked = i > progress;
          const isTutorial = p.isTutorial;

          return (
            <div
              key={p.id}
              className={`card ${locked ? "locked" : ""} ${isTutorial ? "card-tutorial" : ""}`}
              onClick={() => { if (!locked) onStart(i); }}
            >
              <div className="card-n">
                {isTutorial ? "00" : `0${p.id}`}
              </div>
              <div className="card-d" style={{ color: p.diffColor }}>
                {p.difficulty}
              </div>
              <div className="card-t">{p.title}</div>
              <div className="card-s">{p.subtitle}</div>
              <div className="card-wc">
                {isTutorial
                  ? "TUTORIAL · SEM TIMER · CLIQUE PARA COMEÇAR"
                  : `${p.wordList.length} PALAVRAS · ⏱ 3 MIN · CLIQUE PARA JOGAR`}
              </div>
              {locked && <div className="lock-overlay">🔒 BLOQUEADO</div>}
            </div>
          );
        })}
      </div>

      {/* Barra de ações */}
      <div className="actions-bar intro-actions" style={{ display: "flex", gap: ".75rem",flexWrap: "wrap", justifyContent: "flex-start", transform: "translateY(-15px)" }}>
        <button
          className="btn-ranking btn-ranking-main"
          onClick={() => setIsRankOpen(true)}
        >
          <span className="icon">📊</span> RANKING GLOBAL
        </button>

        <button
          className="btn-ranking btn-ranking-main"
          onClick={() => setIsCreditsOpen(true)}
          style={{ borderColor: "var(--y)", color: "var(--y)" }}
        >
          <span className="icon">📋</span> CRÉDITOS
        </button>
      </div>

      {/* Modal de Ranking */}
      <RankingModal
        isOpen={isRankOpen}
        onClose={() => setIsRankOpen(false)}
        ranking={ranking}
      />

      {/* Modal de Créditos */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      {/* Rodapé */}
      <div className="footer-tip">
        ARRASTE NA GRADE PARA MARCAR PALAVRAS · DIAGONAL INCLUÍDA
      </div>
    </div>
  );
}
