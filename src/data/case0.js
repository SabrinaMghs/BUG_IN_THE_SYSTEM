// ─── case0.js — TUTORIAL ────────────────────────────────────
// Grade 6×6. Palavras:
//   BUG → horizontal →  r0 c0..c2   grid[0][0..2] = B U G
//   BOT → vertical  ↓   c5 r0..r2   grid[0..2][5]  = B O T
//   FIX → diagonal  ↘   r1c0 r2c1 r3c2  grid[1][0]=F  grid[2][1]=I  grid[3][2]=X

const case0 = {
  id: 0,
  isTutorial: true,
  difficulty: "TUTORIAL",
  diffColor: "#00e5ff",
  title: "Primeiros Passos",
  subtitle: "Aprenda a marcar palavras — arraste em qualquer direção, até na diagonal!",

  //       c0   c1   c2   c3   c4   c5
  grid: [
    ["B", "U", "G", "Z", "Q", "B"], // r0
    ["F", "W", "V", "K", "L", "O"], // r1
    ["P", "I", "J", "M", "N", "T"], // r2
    ["Y", "R", "X", "A", "D", "H"], // r3
    ["C", "E", "S", "T", "U", "V"], // r4
    ["W", "X", "Y", "Z", "A", "B"], // r5
  ],

  wordList: [
    {
      word: "BUG",
      dir: "→",
      tutorialHint: "→",
      label: "horizontal →",
      cells: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }],
    },
    {
      word: "BOT",
      dir: "↓",
      tutorialHint: "↓",
      label: "vertical ↓",
      cells: [{ r: 0, c: 5 }, { r: 1, c: 5 }, { r: 2, c: 5 }],
    },
    {
      word: "FIX",
      dir: "↘",
      tutorialHint: "↘",
      label: "diagonal ↘",
      cells: [{ r: 1, c: 0 }, { r: 2, c: 1 }, { r: 3, c: 2 }],
    },
  ],

  clues: [
    "Arraste da esquerda para a direita para marcar BUG",
    "Arraste de cima para baixo para marcar BOT",
    "Arraste na DIAGONAL (↘) para marcar FIX",
  ],

  suspects: ["TUTORIAL"],
  languages: ["TUTORIAL"],
  locations: ["TUTORIAL"],
  culprit: "TUTORIAL",
  language: "TUTORIAL",
  location: "TUTORIAL",
  isTutorialOnly: true,

  narrative:
    "Missão de treinamento concluída! Você aprendeu que palavras podem estar em qualquer direção — horizontal, vertical e diagonal. Use esse conhecimento nos casos reais. Boa sorte, investigador.",
};

export default case0;
