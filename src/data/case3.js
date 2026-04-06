const case3 = {
  id: 3,
  difficulty: "INTERMEDIÁRIO",
  diffColor: "#ffd600",
  title: "O Deploy de Sexta-feira",
  subtitle: "Ninguém faz deploy na sexta. Alguém fez...",
  grid: [
    ["T","Y","P","E","S","C","R","I","P","T"],
    ["F","R","O","N","T","E","N","D","X","Z"],
    ["A","M","O","B","I","L","E","Q","W","K"],
    ["J","U","L","I","A","N","V","B","C","D"],
    ["D","O","C","K","E","R","Y","P","R","S"],
  ],
  wordList: [
    { word: "TYPESCRIPT", cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5},{r:0,c:6},{r:0,c:7},{r:0,c:8},{r:0,c:9}] },
    { word: "FRONTEND",   cells: [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:1,c:6},{r:1,c:7}] },
    { word: "MOBILE",     cells: [{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5},{r:2,c:6}] },
    { word: "DOCKER",     cells: [{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},{r:4,c:4},{r:4,c:5}] },
    { word: "JULIAN",     cells: [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},{r:3,c:5}] },
  ],
  clues: [
    "O deploy aconteceu às 17h50 de uma sexta-feira",
    "A versão foi empacotada sem rodar os testes automatizados",
    "O crash apareceu somente em dispositivos móveis",
  ],
  suspects:  ["JULIAN","BEATRIZ","IGOR","NADIA"],
  languages: ["TYPESCRIPT","PYTHON","KOTLIN","SWIFT"],
  locations: ["MOBILE","BACKEND","DOCKER","DATABASE"],
  culprit:  "JULIAN",
  language: "TYPESCRIPT",
  location: "MOBILE",
};

export default case3;