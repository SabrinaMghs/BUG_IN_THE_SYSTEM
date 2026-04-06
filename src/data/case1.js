const case1 = {
  id: 1,
  difficulty: "FÁCIL",
  diffColor: "#39ff14",
  title: "O Bug do Estagiário",
  subtitle: "O sistema caiu na primeira semana do novo estagiário...",

  grid: [
    ["J","A","V","A","X","K","L","P","Q","R"],
    ["U","S","E","R","Z","Q","B","T","Y","U"],
    ["A","N","T","H","O","N","Y","M","N","O"],
    ["S","A","B","R","I","N","A","X","Y","Z"],
    ["G","O","B","A","C","K","L","M","N","O"],
    ["D","E","V","X","Q","W","E","R","T","Y"],
    ["P","R","O","D","U","C","T","I","O","N"],
    ["L","O","G","I","N","S","E","R","V","R"],
    ["C","O","D","E","X","A","B","C","D","E"],
    ["T","E","S","T","I","N","G","H","I","J"],
  ],

  wordList: [
    { word: "JAVA", cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3}] },
    { word: "USER", cells: [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3}] },
    { word: "BACK", cells: [{r:4,c:2},{r:4,c:3},{r:4,c:4},{r:4,c:5}] },
    { word: "ANTHONY", cells: [{r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5},{r:2,c:6}] },
    { word: "SABRINA", cells: [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},{r:3,c:5},{r:3,c:6}] },
    { word: "LOGIN", cells: [{r:7,c:0},{r:7,c:1},{r:7,c:2},{r:7,c:3},{r:7,c:4}] },
    { word: "DEV", cells: [{r:5,c:0},{r:5,c:1},{r:5,c:2}] },
  ],

  clues: [
    "O erro aconteceu na tela de login",
    "O problema está no BACK",
    "Duas pessoas estavam trabalhando juntas",
    "O commit foi feito em ambiente de produção",
  ],

  suspects: ["ANTHONY","SABRINA","ISABELLE","EMERSON"],
  languages: ["JAVA","PYTHON","GO","RUST"],
  locations: ["BACK","FRONT","MOBILE","DATABASE"],

  culprit: ["ANTHONY","SABRINA"],
  language: "JAVA",
  location: "BACK",
};

export default case1;