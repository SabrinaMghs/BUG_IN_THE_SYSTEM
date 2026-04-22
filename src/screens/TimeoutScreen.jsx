import { useEffect, useState } from "react";
import "./TimeoutScreen.css";

export default function TimeoutScreen({ puzzle, foundWords = [], onRetry, onBack }) {
  const [visible, setVisible] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 160);
    }, 3000);
    return () => { clearTimeout(t1); clearInterval(iv); };
  }, []);

  const totalWords = puzzle?.wordList?.filter(w => !w.hidden).length ?? 0;
  const found = foundWords.filter(w => {
    const e = puzzle?.wordList?.find(x => x.word === w);
    return e && !e.hidden;
  }).length;

  return (
    <div className={`to-screen${visible ? " to-visible" : ""}`}>
      <div className="to-scanlines" />
      <div className="to-gridbg" />
      {glitch && <div className="to-glitch-bar" />}

      <div className="to-body">

        <div className="to-icon-wrap">
          <div className="to-ring to-ring-a" />
          <div className="to-ring to-ring-b" />
          <div className="to-emoji">⏱</div>
        </div>

        <div className="to-errcode">
          <span className="to-errpre">SYS::</span>
          <span className={`to-errmain${glitch ? " to-glitch" : ""}`}>TIMEOUT_042</span>
        </div>

        <h1 className={`to-title${glitch ? " to-glitch" : ""}`}>TEMPO ESGOTADO</h1>

        <div className="to-line" />

        <div className="to-narrative">
          {[
            "O prazo de investigação expirou.",
            "O suspeito apagou os rastros e desapareceu.",
            "O caso foi arquivado sem solução.",
          ].map((txt, i) => (
            <p key={i} className="to-nline" style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
              <span className="to-arrow">▶</span>{txt}
            </p>
          ))}
        </div>

        {puzzle && (
          <div className="to-card">
            <ToRow label="CASO" value={puzzle.isTutorial ? "TUTORIAL" : `#${puzzle.id} — ${puzzle.title}`} />
            <ToRow label="DIFICULDADE" value={puzzle.difficulty} vc={puzzle.diffColor} />
            <ToRow label="PROGRESSO" value={`${found} / ${totalWords} PALAVRAS`} />
            <ToRow label="STATUS" value="✘ NÃO SOLUCIONADO" vc="var(--r)" />
          </div>
        )}

        <div className="to-tip">
          <span>💡</span>
          <span>DICA: Marque as palavras-chave na grade antes de submeter o veredicto.</span>
        </div>

        <div className="to-btns">
          <button className="to-btn to-btn-red" onClick={onRetry}>↺ TENTAR NOVAMENTE</button>
          <button className="to-btn to-btn-dim" onClick={onBack}>← TODOS OS CASOS</button>
        </div>

        <div className="to-footer">
          <span className="to-dot" />BUG_IN_THE_SYSTEM — SESSÃO ENCERRADA<span className="to-dot" />
        </div>
      </div>
    </div>
  );
}

function ToRow({ label, value, vc }) {
  return (
    <div className="to-card-row">
      <span className="to-card-label">{label}</span>
      <span className="to-card-value" style={vc ? { color: vc } : {}}>{value}</span>
    </div>
  );
}
