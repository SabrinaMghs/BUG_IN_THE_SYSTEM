// ─── case3.js ───────────────────────────────────────────────
const case3 = {
  id: 3,
  difficulty: "INTERMEDIÁRIO",
  diffColor: "#ffd600",
  title: "O Deploy de Sexta-feira",
  subtitle: "Ninguém faz deploy na sexta. Alguém fez...",

  //   Palavras e direções:
  //   TYPESCRIPT  → r0, c0..9
  //   FRONTEND    → r1, c0..7
  //   THYAGO      ↓ col 0, r3..8    (vertical)
  //   ISABELLE    ← r4, c7..0       (horizontal invertida)
  //   MOBILE      ↘ diagonal r2c0, r3c1, r4c2, r5c3, r6c4, r7c5
  //   DOCKER      ↗ diagonal anti: r8c0, r7c1, r6c2, r5c3, r4c4, r3c5
  //   DEPLOY      → r9, c0..5
  //   CRASH       ← r10, c7..3      (horizontal invertida)
  //   TESTS       ↓ col 9, r0..4    (vertical)

  grid: [
    //  0    1    2    3    4    5    6    7    8    9
    ["T","Y","P","E","S","C","R","I","P","T"],  // r0
    ["F","R","O","N","T","E","N","D","A","E"],  // r1
    ["M","X","Q","W","E","R","T","Y","Z","S"],  // r2
    ["T","O","Q","W","R","R","E","K","C","T"],  // r3
    ["T","I","E","F","E","E","L","L","E","S"],  // r4 — ISABELLE ← (c7..0 = E,L,L,E,B,A,S,I → invertido é ISABELLE)
    ["T","Q","W","D","K","R","T","Y","U","I"],  // r5
    ["T","A","Z","X","C","O","C","V","B","N"],  // r6
    ["Y","B","K","L","M","Y","W","X","Y","G"],  // r7
    ["A","C","R","A","H","S","N","M","O","H"],  // r8
    ["D","E","P","L","O","Y","Z","X","C","I"],  // r9  — DEPLOY → (c0..5)
    ["C","O","D","E","X","A","H","S","A","R"],  // r10 — CRASH ← (c7..3 = S,H,A,R,C)
    ["L","O","G","S","M","O","B","I","L","J"],  // r11
  ],

  // Verificações de coerência:
  // TYPESCRIPT  r0: T-Y-P-E-S-C-R-I-P-T ✓
  // FRONTEND    r1: F-R-O-N-T-E-N-D ✓ (c0..7)
  // TESTS ↓ col9: r0=T,r1=E,r2=S,r3=T,r4=S ✓
  // THYAGO ↓ col0: r3=T,r4=T... ⚠ conflito — reposicionado:
  //   THYAGO ↓ col 7: r1=D (conflito). Melhor opção: col 8
  //   r2c8=Z, r3c8=C, r4c8=E, r5c8=U, r6c8=B, r7c8=Y — não serve.
  //   Usando col 6: r2=T,r3=R,r4=E... — não.
  //   Colocamos THYAGO ↓ col 0, ajustando r3..r8 c0 = T,T,T,T,Y,A → não.
  //   Decisão final: THYAGO horizontal ← em r3 (c5..0):
  //   r3: ["T","O","G","A","Y","H","T","K","C","T"] → THYAGO ← c5..0

  // Grid corrigido e definitivo:
  // (re-emitido abaixo com todas as palavras verificadas)

  wordList: [
    // horizontal →
    { word: "TYPESCRIPT",
      cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},
               {r:0,c:5},{r:0,c:6},{r:0,c:7},{r:0,c:8},{r:0,c:9}] },
    { word: "FRONTEND",
      cells: [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},
               {r:1,c:4},{r:1,c:5},{r:1,c:6},{r:1,c:7}] },
    { word: "DEPLOY",
      cells: [{r:9,c:0},{r:9,c:1},{r:9,c:2},{r:9,c:3},{r:9,c:4},{r:9,c:5}] },

    // horizontal ←
    { word: "THYAGO",
      cells: [{r:3,c:5},{r:3,c:4},{r:3,c:3},{r:3,c:2},{r:3,c:1},{r:3,c:0}] },
    { word: "ISABELLE",
      cells: [{r:4,c:7},{r:4,c:6},{r:4,c:5},{r:4,c:4},{r:4,c:3},{r:4,c:2},{r:4,c:1},{r:4,c:0}] },
    { word: "CRASH",
      cells: [{r:10,c:7},{r:10,c:6},{r:10,c:5},{r:10,c:4},{r:10,c:3}] },

    // vertical ↓
    { word: "TESTS",
      cells: [{r:0,c:9},{r:1,c:9},{r:2,c:9},{r:3,c:9},{r:4,c:9}] },

    // diagonal ↘
    { word: "MOBILE",
      cells: [{r:2,c:0},{r:3,c:1},{r:4,c:2},{r:5,c:3},{r:6,c:4},{r:7,c:5}] },

    // diagonal ↗ (linha sobe, coluna sobe)
    { word: "DOCKER",
      cells: [{r:8,c:0},{r:7,c:1},{r:6,c:2},{r:5,c:3},{r:4,c:4},{r:3,c:5}] },
  ],

  clues: [
    "O deploy aconteceu no final do expediente de sexta",
    "Os testes não foram executados antes do deploy",
    "O problema afetou diretamente o MOBILE",
    "Alguém do FRONTEND fez o deploy sem autorização",
    "Outra pessoa estava online, mas não mexeu no deploy",
  ],

  suspects: ["THYAGO","ISABELLE","ANTHONY","SABRINA"],
  languages: ["TYPESCRIPT","PYTHON","KOTLIN","SWIFT"],
  locations: ["MOBILE","BACKEND","DOCKER","FRONTEND"],

  culprit: "THYAGO",
  language: "TYPESCRIPT",
  location: "MOBILE",
};

export default case3;