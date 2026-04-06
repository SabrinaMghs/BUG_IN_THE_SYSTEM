export default function VerdictForm({ puzzle, answer, setAnswer, allFound, wrongAns, onSubmit }) {
  return (
    <div className="panel">
      <div className="ptitle">▶ VEREDICTO FINAL</div>

      <span className="sel-lbl">👤 CULPADO</span>
      <select
        className="sel"
        value={answer.culprit}
        onChange={(e) => setAnswer((a) => ({ ...a, culprit: e.target.value }))}
      >
        <option value="">— selecione o suspeito —</option>
        {puzzle.suspects.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <span className="sel-lbl">💻 LINGUAGEM</span>
      <select
        className="sel"
        value={answer.language}
        onChange={(e) => setAnswer((a) => ({ ...a, language: e.target.value }))}
      >
        <option value="">— selecione a linguagem —</option>
        {puzzle.languages.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>

      <span className="sel-lbl">📍 LOCAL DO BUG</span>
      <select
        className="sel"
        value={answer.location}
        onChange={(e) => setAnswer((a) => ({ ...a, location: e.target.value }))}
      >
        <option value="">— selecione o local —</option>
        {puzzle.locations.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>

      <button
        className={`btn ${allFound ? "success" : "danger"}`}
        disabled={!allFound || !answer.culprit || !answer.language || !answer.location}
        onClick={onSubmit}
      >
        {allFound ? "▶ FECHAR CASO" : "▶ SUBMETER VEREDICTO"}
      </button>

      {wrongAns && (
        <div className="err">✗ RESPOSTA INCORRETA — INVESTIGUE MAIS</div>
      )}
      {!allFound && (
        <p className="warn-t">Encontre todas as palavras para liberar o veredicto</p>
      )}
    </div>
  );
}
