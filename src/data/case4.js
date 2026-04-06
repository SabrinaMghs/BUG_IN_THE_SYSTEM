// ─── case4.js ───────────────────────────────────────────────
//
// Direções usadas (todas as 6):
//   GRAPHQL    → r0, c0..6
//   KUBERNETES ← r1, c9..0   (horizontal invertido)
//   EMERSON    ↓ col 0, r2..8
//   NADIA      ↑ col 11, r5..1  (vertical invertido)
//   REDIS      ↘ diagonal r3c0, r4c1, r5c2, r6c3, r7c4
//   KAFKA      ↗ diagonal r8c0, r7c1, r6c2, r5c3, r4c4
//
const case4 = {
  id: 4,
  difficulty: "DIFÍCIL",
  diffColor: "#ff2d55",
  title: "A Brecha de Segurança",
  subtitle: "Dados de 50.000 usuários foram expostos. Encontre o responsável.",

  //         0    1    2    3    4    5    6    7    8    9   10   11
  grid: [
    // r0: GRAPHQL → c0..6
    ["G","R","A","P","H","Q","L","X","T","O","K","A"],
    // r1: KUBERNETES ← c9..0 → grid = S,E,T,E,N,R,E,B,U,K + extras
    ["S","E","T","E","N","R","E","B","U","K","N","I"],
    // r2: EMERSON ↓ col0: E=r2, M=r3, E=r4, R=r5, S=r6, O=r7, N=r8
    //     col0 fixada para EMERSON; resto é ruído
    ["E","Z","Q","W","E","R","T","Y","U","I","O","D"],
    // r3: col0=M; REDIS ↘ começa r3c0... conflito com M de EMERSON → REDIS começa r3c1
    ["M","R","X","Q","W","R","T","Y","U","O","P","I"],
    // r4: col0=E; REDIS r4c2; KAFKA ↗ r4c4
    ["E","X","E","Q","A","T","Y","U","I","O","P","A"],
    // r5: col0=R; REDIS r5c3; KAFKA r5c3 conflito → KAFKA ↗ r5c3=K (compartilha?)
    //     KAFKA: r8c0,r7c1,r6c2,r5c3,r4c4 → r5c3=K; REDIS r5c3=I → conflito
    //     Solução: REDIS ↘ r3c2..r7c6; KAFKA ↗ r7c0..r3c4
    ["R","Q","R","W","A","T","Y","U","O","P","X","N"],
    // r6: col0=S; REDIS r6c4; KAFKA r6c2
    ["S","W","A","X","D","T","Y","U","I","O","P","A"],
    // r7: col0=O; REDIS r7c5; KAFKA r7c1
    ["O","K","X","Q","W","S","T","Y","U","I","O","D"],
    // r8: col0=N; KAFKA starts r8c0=K
    ["N","X","Q","W","E","R","T","Y","U","I","O","I"],
    // NADIA ↑ col11: r5=N,r4=A,r3=D,r2=I,r1=A → col11 r1..r5 = A,I,D,A,N
    // r1c11=A (já I acima, corrigir); r2c11=I; r3c11=D; r4c11=A; r5c11=N
    // Ajustando col 11 nas linhas acima:
    // r1c11=A, r2c11=I, r3c11=D, r4c11=A, r5c11=N  ← NADIA de baixo pra cima
    ["Q","W","E","R","T","Y","U","I","O","P","X","C"],
    ["A","S","D","F","G","H","J","K","L","Z","X","V"],
    ["Q","W","E","R","T","Z","X","C","V","B","N","M"],
  ],

  // ── Grid definitivo (construído letra por letra) ──────────
  // Reconstruído para garantir consistência de todas as palavras:
  //
  //  GRAPHQL →      r0 c0..6: G R A P H Q L
  //  KUBERNETES ←   r1 c9..0: K U B E R N E T E S (grid r1 = S E T E N R E B U K)
  //  EMERSON ↓      c0 r2..8: E M E R S O N
  //  NADIA ↑        c11 r5..1: lendo r5→r1 = N A D I A
  //                 → no grid: r1c11=A, r2c11=I, r3c11=D, r4c11=A, r5c11=N
  //  REDIS ↘        r3c2,r4c3,r5c4,r6c5,r7c6: R E D I S
  //  KAFKA ↗        r7c0,r6c1,r5c2,r4c3,r3c4: K A F K A
  //                 ⚠ r4c3 compartilhado: REDIS r4c3=I, KAFKA r4c3=K → conflito
  //  Nova posição KAFKA ↗: r8c1,r7c2,r6c3,r5c4,r4c5
  //                 r5c4=F? REDIS r5c4=I... conflito ainda.
  //  Posição final KAFKA ↗: r9c0,r8c1,r7c2,r6c3,r5c4,r4c5
  //                 KAFKA tem 5 letras: K A F K A
  //                 r9c0=K, r8c1=A, r7c2=F, r6c3=K, r5c4=A
  //                 REDIS r5c4=I → conflito em r5c4. Ajustar REDIS:
  //  REDIS ↘ final: r2c2,r3c3,r4c4,r5c5,r6c6: R E D I S
  //                 KAFKA ↗: r9c0,r8c1,r7c2,r6c3,r5c4,r4c5 → sem conflito ✓

  // Grid final (12 linhas × 12 colunas):
  // (as letras de ruído são aleatórias)

  wordList: [
    // horizontal →
    { word: "GRAPHQL",
      cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5},{r:0,c:6}] },

    // horizontal ← (KUBERNETES escrito de trás pra frente no grid)
    { word: "KUBERNETES",
      cells: [{r:1,c:9},{r:1,c:8},{r:1,c:7},{r:1,c:6},{r:1,c:5},
               {r:1,c:4},{r:1,c:3},{r:1,c:2},{r:1,c:1},{r:1,c:0}] },

    // vertical ↓
    { word: "EMERSON",
      cells: [{r:2,c:0},{r:3,c:0},{r:4,c:0},{r:5,c:0},{r:6,c:0},{r:7,c:0},{r:8,c:0}] },

    // vertical ↑ (NADIA: selecionamos de r5→r1 na col 11)
    { word: "NADIA",
      cells: [{r:5,c:11},{r:4,c:11},{r:3,c:11},{r:2,c:11},{r:1,c:11}] },

    // diagonal ↘
    { word: "REDIS",
      cells: [{r:2,c:2},{r:3,c:3},{r:4,c:4},{r:5,c:5},{r:6,c:6}] },

    // diagonal ↗ (linha diminui, coluna aumenta)
    { word: "KAFKA",
      cells: [{r:9,c:0},{r:8,c:1},{r:7,c:2},{r:6,c:3},{r:5,c:4}] },
  ],

  // Grid com todas as letras corretas posicionadas:
  //   col:  0    1    2    3    4    5    6    7    8    9   10   11
  grid: [
    /*r0*/ ["G","R","A","P","H","Q","L","X","T","O","K","Z"],
    /*r1*/ ["S","E","T","E","N","R","E","B","U","K","X","A"],  // KUBERNETES← c9→0; c11=A (NADIA[4])
    /*r2*/ ["E","X","R","Q","W","E","R","T","Y","U","I","I"],  // EMERSON c0=E; REDIS c2=R; c11=I (NADIA[3])
    /*r3*/ ["M","Z","Q","E","W","R","T","Y","U","O","P","D"],  // EMERSON c0=M; REDIS c3=E; c11=D (NADIA[2])
    /*r4*/ ["E","X","Q","W","D","Z","T","Y","U","O","P","A"],  // EMERSON c0=E; REDIS c4=D; c11=A (NADIA[1])
    /*r5*/ ["R","Q","W","X","A","I","V","U","O","P","X","N"],  // EMERSON c0=R; KAFKA c4=A; REDIS c5=I; c11=N (NADIA[0])
    /*r6*/ ["S","W","X","K","Q","S","S","U","I","O","P","Z"],  // EMERSON c0=S; KAFKA c3=K; REDIS c6=S
    /*r7*/ ["O","X","F","Q","W","R","T","Y","U","I","O","X"],  // EMERSON c0=O; KAFKA c2=F
    /*r8*/ ["N","A","Q","W","E","R","T","Y","U","I","O","Z"],  // EMERSON c0=N; KAFKA c1=A
    /*r9*/ ["K","X","Q","W","E","R","T","Y","U","I","O","P"],  // KAFKA c0=K
    /*r10*/["A","S","D","F","G","H","J","K","L","Z","X","V"],
    /*r11*/["Q","W","E","R","T","Z","X","C","V","B","N","M"],
  ],

  clues: [
    "A brecha foi aberta via uma query não sanitizada",
    "O serviço de containers foi comprometido",
    "Um cache sem TTL expôs dados por horas",
    "Existe uma pista escondida no próprio grid",
  ],

  suspects: ["EMERSON","NADIA","ANTHONY","SABRINA"],
  languages: ["GRAPHQL","PYTHON","RUST","GO"],
  locations: ["KUBERNETES","REDIS","KAFKA","DATABASE"],

  culprit: "EMERSON",
  language: "GRAPHQL",
  location: "KUBERNETES",

  hiddenClue: "TOKENVAZADO",
};

export default case4;