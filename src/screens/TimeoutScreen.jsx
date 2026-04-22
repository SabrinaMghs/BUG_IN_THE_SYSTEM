import { useEffect, useState } from "react";
import "./TimeoutScreen.css";

export default function TimeoutScreen({ puzzle, onRetry, onBack }) {
  const [visible, setVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Entrada com delay dramático
    const t1 = setTimeout(() => setVisible(true), 100);

    // Glitch loop
    const glitch = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearInterval(glitch);
    };
  }, []);

  const wordsFound = puzzle?.wordList?.filter(w => !w.hidden).length ?? 0;

  return (
    <div className={`timeout-screen ${visible ? "visible" : ""}`}>
      {/* Scanlines overlay */}
      <div className="timeout-scanlines" />

      {/* Background grid */}
      <div className="timeout-grid-bg" />

      {/* Glitch overlay */}
      {glitchActive && <div className="timeout-glitch-overlay" />}

      <div className="timeout-content">

        {/* Ícone de alerta animado */}
        <div className="timeout-icon-wrap">
          <div className="timeout-ring timeout-ring-1" />
          <div className="timeout-ring timeout-ring-2" />
          <div className="timeout-icon-inner">⏱</div>
        </div>

        {/* Código de erro estilo terminal */}
        <div className="timeout-code">
          <span className="timeout-code-prefix">ERR_</span>
          <span className={`timeout-code-main ${glitchActive ? "glitch" : ""}`}>TIMEOUT_042</span>
        </div>

        {/* Título principal */}
        <div className={`timeout-title ${glitchActive ? "glitch" : ""}`}>
          TEMPO ESGOTADO
        </div>

        <div className="timeout-divider" />

        {/* Mensagem narrativa */}
        <div className="timeout-narrative">
          <p className="timeout-narrative-line">
            <span className="timeout-prompt">▶</span>
            O prazo de investigação expirou.
          </p>
          <p className="timeout-narrative-line">
            <span className="timeout-prompt">▶</span>
            O suspeito apagou os rastros e desapareceu.
          </p>
          <p className="timeout-narrative-line timeout-narrative-fade">
            <span className="timeout-prompt">▶</span>
            O caso foi arquivado sem solução.
          </p>
        </div>

        {/* Info do caso */}
        {puzzle && (
          <div className="timeout-case-info">
            <div className="timeout-case-row">
              <span className="timeout-case-label">CASO</span>
              <span className="timeout-case-value">
                {puzzle.isTutorial ? "TUTORIAL" : `#${puzzle.id} — ${puzzle.title}`}
              </span>
            </div>
            <div className="timeout-case-row">
              <span className="timeout-case-label">DIFICULDADE</span>
              <span className="timeout-case-value" style={{ color: puzzle.diffColor }}>
                {puzzle.difficulty}
              </span>
            </div>
            <div className="timeout-case-row">
              <span className="timeout-case-label">STATUS</span>
              <span className="timeout-case-value timeout-status-fail">
                ✘ NÃO SOLUCIONADO
              </span>
            </div>
          </div>
        )}

        {/* Dica motivacional */}
        <div className="timeout-tip">
          <span className="timeout-tip-icon">💡</span>
          <span className="timeout-tip-text">
            DICA: Encontre todas as palavras-chave antes de submeter o veredito.
          </span>
        </div>

        {/* Botões */}
        <div className="timeout-btn-row">
          <button className="timeout-btn timeout-btn-primary" onClick={onRetry}>
            <span className="timeout-btn-icon">↺</span>
            TENTAR NOVAMENTE
          </button>
          <button className="timeout-btn timeout-btn-secondary" onClick={onBack}>
            <span className="timeout-btn-icon">←</span>
            TODOS OS CASOS
          </button>
        </div>

        {/* Rodapé de sistema */}
        <div className="timeout-footer">
          <span className="timeout-footer-dot" />
          SISTEMA BUG_IN_THE_SYSTEM v2.0 — SESSÃO ENCERRADA
          <span className="timeout-footer-dot" />
        </div>
      </div>
    </div>
  );
}
