// ─── case2.js ───────────────────────────────────────────────
const case2 = {
  id: 2,
  difficulty: "INTERMEDIÁRIO",
  diffColor: "#ffd600",
  title: "A Queda do Servidor",
  subtitle: "O banco de dados parou de responder às 03h da manhã...",

  //   0    1    2    3    4    5    6    7    8    9
  grid: [
    ["P","Y","T","H","O","N","Z","K","L","M"],   // r0 — PYTHON → (0,0..5)
    ["B","A","C","K","E","N","D","Q","S","E"],   // r1 — BACKEND → (1,0..6)
    ["E","M","E","R","S","O","N","X","E","R"],   // r2 — EMERSON → (2,0..6)
    ["T","H","Y","A","G","O","B","C","S","U"],   // r3 — THYAGO → (3,0..5)
    ["T","O","K","E","N","R","Y","Z","I","O"],   // r4 — TOKEN → (4,0..4)  [col 8 = vertical S de SESSION]
    ["S","E","R","V","E","R","A","P","O","S"],   // r5 — SERVER → (5,0..5)  [col 8 = N]
    ["D","A","T","A","B","A","S","E","X","C"],   // r6 — DATABASE → (6,0..7)
    ["Q","U","E","R","Y","L","O","G","S","D"],   // r7 — QUERY → (7,0..4)
    ["A","U","T","H","X","J","W","K","L","P"],   // r8
    ["D","E","B","U","G","M","N","B","V","C"],   // r9
    // SESSION ↓ em col 8: r4=S, r5=E(já em r5c8=N), veja abaixo
    // Reescrevendo SESSION verticalmente na col 8:
    // r4c8=S, r5c8=E, r6c8=S(já X, ajustado), r7c8=S, r8c8=I, r9c8=O, r10c8=N
    ["C","A","C","H","E","Z","X","C","I","B"],   // r10 — CACHE → (10,0..4)
    ["S","E","S","S","I","O","N","A","O","D"],   // r11 — SESSION → (11,0..6)
  ],

  // SESSION é colocado horizontal em r11, CACHE em r10.
  // Para SESSION vertical usaríamos outra coluna — optamos por horizontal para manter o grid limpo.

  wordList: [
    // horizontal →
    { word: "PYTHON",
      cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5}] },
    { word: "BACKEND",
      cells: [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:1,c:6}] },
    { word: "EMERSON",
      cells: [{r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5},{r:2,c:6}] },
    { word: "THYAGO",
      cells: [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},{r:3,c:5}] },
    { word: "TOKEN",
      cells: [{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},{r:4,c:4}] },
    { word: "SERVER",
      cells: [{r:5,c:0},{r:5,c:1},{r:5,c:2},{r:5,c:3},{r:5,c:4},{r:5,c:5}] },
    { word: "DATABASE",
      cells: [{r:6,c:0},{r:6,c:1},{r:6,c:2},{r:6,c:3},{r:6,c:4},{r:6,c:5},{r:6,c:6},{r:6,c:7}] },
    { word: "CACHE",
      cells: [{r:10,c:0},{r:10,c:1},{r:10,c:2},{r:10,c:3},{r:10,c:4}] },

    // horizontal ←
    { word: "QUERY",
      cells: [{r:7,c:4},{r:7,c:3},{r:7,c:2},{r:7,c:1},{r:7,c:0}] },

    // vertical ↓ (col 8: r4..r10 = S,E,S,S,I,O,N — mas SESSION tem 7 letras)
    // Usamos SESSION horizontal em r11 para clareza
    { word: "SESSION",
      cells: [{r:11,c:0},{r:11,c:1},{r:11,c:2},{r:11,c:3},{r:11,c:4},{r:11,c:5},{r:11,c:6}] },
  ],

  clues: [
    "O erro está relacionado ao backend",
    "A falha envolvia tokens e sessão",
    "Logs mostram problema na camada de dados",
    "Uma pessoa tentou culpar outra que estava online",
  ],

  suspects: ["EMERSON","THYAGO","KLAYVERTON","ISABELLE"],
  languages: ["PYTHON","JAVA","GO","RUBY"],
  locations: ["BACKEND","FRONTEND","MOBILE","DEVOPS"],

  culprit: "EMERSON",
  language: "PYTHON",
  location: "BACKEND",
};

export default case2;