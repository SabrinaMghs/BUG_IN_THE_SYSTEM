const case1 = {
  id: 1,
  difficulty: "FÁCIL",
  diffColor: "#32ad0d",
  title: "A Brecha de Segurança",
  subtitle: "50.000 usuários expostos… mas alguém tentou esconder os rastros.",
  // 0 1 2 3 4 5 6 7 8 9
  grid: [
    ["J", "A", "V", "A", "F", "G", "Z", "Q", "W", "U"], // r0
    ["Z", "Q", "B", "I", "Y", "W", "I", "R", "K", "S"], // r1
    ["X", "M", "X", "O", "P", "Q", "R", "T", "H", "E"], // r2
    ["A", "N", "I", "R", "B", "A", "S", "Y", "V", "R"], // r3
    ["G", "O", "K", "C", "A", "B", "M", "N", "E", "O"], // r4
    ["H", "Q", "W", "J", "L", "T", "Y", "Z", "D", "P"], // r5
    ["P", "R", "O", "D", "U", "C", "T", "I", "O", "N"], // r6
    ["L", "O", "G", "I", "N", "Q", "X", "Y", "Z", "A"], // r7
    ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], // r8
    ["G", "N", "I", "T", "S", "E", "T", "K", "L", "M"], // r9
  ],
  wordList: [
    {
      word: "JAVA",
      dir: "→",
      label: "horizontal →",
      cells: [
        { r: 0, c: 0 },
        { r: 0, c: 1 },
        { r: 0, c: 2 },
        { r: 0, c: 3 },
      ],
    },
    {
      word: "PRODUCTION",
      dir: "→",
      label: "horizontal →",
      cells: [
        { r: 6, c: 0 },
        { r: 6, c: 1 },
        { r: 6, c: 2 },
        { r: 6, c: 3 },
        { r: 6, c: 4 },
        { r: 6, c: 5 },
        { r: 6, c: 6 },
        { r: 6, c: 7 },
        { r: 6, c: 8 },
        { r: 6, c: 9 },
      ],
    },
    {
      word: "LOGIN",
      dir: "→",
      label: "horizontal →",
      cells: [
        { r: 7, c: 0 },
        { r: 7, c: 1 },
        { r: 7, c: 2 },
        { r: 7, c: 3 },
        { r: 7, c: 4 },
      ],
    },
    {
      word: "SABRINA",
      dir: "←",
      label: "horizontal ←",
      cells: [
        { r: 3, c: 6 },
        { r: 3, c: 5 },
        { r: 3, c: 4 },
        { r: 3, c: 3 },
        { r: 3, c: 2 },
        { r: 3, c: 1 },
        { r: 3, c: 0 },
      ],
    },
    {
      word: "BACK",
      dir: "←",
      label: "horizontal ←",
      cells: [
        { r: 4, c: 5 },
        { r: 4, c: 4 },
        { r: 4, c: 3 },
        { r: 4, c: 2 },
      ],
    },
    {
      word: "TESTING",
      dir: "←",
      label: "horizontal ←",
      cells: [
        { r: 9, c: 6 },
        { r: 9, c: 5 },
        { r: 9, c: 4 },
        { r: 9, c: 3 },
        { r: 9, c: 2 },
        { r: 9, c: 1 },
        { r: 9, c: 0 },
      ],
    },
    {
      word: "USER",
      dir: "↓",
      label: "vertical ↓",
      cells: [
        { r: 0, c: 9 },
        { r: 1, c: 9 },
        { r: 2, c: 9 },
        { r: 3, c: 9 },
      ],
    },
    {
      word: "DEV",
      dir: "↑",
      label: "vertical ↑",
      cells: [
        { r: 5, c: 8 },
        { r: 4, c: 8 },
        { r: 3, c: 8 },
      ],
    },
    {
      word: "GIT",
      dir: "↘",
      label: "diagonal ↘",
      cells: [
        { r: 0, c: 5 },
        { r: 1, c: 6 },
        { r: 2, c: 7 },
      ],
    },

    {
      word: "FIX",
      dir: "↙",
      label: "diagonal ↙",
      cells: [
        { r: 0, c: 4 },
        { r: 1, c: 3 },
        { r: 2, c: 2 },
      ],
    },
  ],
  clues: [
    "O erro aconteceu na tela de login",
    "O problema está no BACK",
    "Duas pessoas estavam trabalhando juntas",
    "O commit foi feito em ambiente de produção",
  ],
  suspects: ["ANTHONY", "SABRINA", "ISABELLE", "EMERSON"],
  languages: ["JAVA", "PYTHON", "GO", "RUST"],
  locations: ["BACK", "FRONT", "MOBILE", "DATABASE"],
  culprit: "SABRINA",
  language: "JAVA",
  location: "BACK",


  hiddenAnswer: "SABOTAGEM",
  narrative:
    "Sabrina aproveitou acesso ao ambiente de PRODUÇÃO para fazer um commit de JAVA não autorizado no módulo de BACK. A falha de TESTING adequado no ambiente certo permitiu que 50.000 usuários tivessem seus dados expostos pela brecha no sistema de LOGIN. O histórico no GIT revelou o DEV real — mas Sabrina tentou apagar os rastros deletando o log de acesso.",
  culprit: "SABRINA",
  language: "JAVA",
  location: "BACK",
};

export default case1;
