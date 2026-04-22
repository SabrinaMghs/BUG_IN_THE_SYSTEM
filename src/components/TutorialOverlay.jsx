export default function TutorialOverlay({ onClose }) {
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-modal-title">🕹 COMO JOGAR</div>
        <div className="tutorial-modal-body">
          <p>Encontre palavras escondidas na grade arrastando o dedo (ou o mouse) sobre as letras.</p>
          <div className="tut-directions">
            <div className="tut-dir-item">
              <span className="tut-dir-arrow">→</span>
              <span>Horizontal</span>
            </div>
            <div className="tut-dir-item tut-dir-highlight">
              <span className="tut-dir-arrow">←</span>
              <span>De trás pra frente</span>
            </div>
            <div className="tut-dir-item">
              <span className="tut-dir-arrow">↓</span>
              <span>Vertical</span>
            </div>
            <div className="tut-dir-item tut-dir-highlight">
              <span className="tut-dir-arrow">↘</span>
              <span>Diagonal</span>
            </div>
          </div>
        </div>
        <button className="tutorial-modal-btn" onClick={onClose}>ENTENDI — VAMOS LÁ!</button>
      </div>
    </div>
  );
}
