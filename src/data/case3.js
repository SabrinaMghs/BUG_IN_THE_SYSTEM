const case3 = {
  id: 3,
  difficulty: "INTERMEDIÁRIO",
  diffColor: "#ffd600",
  title: "O Deploy de Sexta-feira",
  subtitle: "Ninguém faz deploy na sexta. Alguém fez...",

  grid: [
    ["T","Y","P","E","S","C","R","I","P","T","X","Z"],
    ["F","R","O","N","T","E","N","D","A","B","C","D"],
    ["M","O","B","I","L","E","Q","W","E","R","T","Y"],
    ["T","H","Y","A","G","O","N","M","K","L","P","O"],
    ["I","S","A","B","E","L","L","E","X","Y","Z","Q"],
    ["D","O","C","K","E","R","A","S","D","F","G","H"],
    ["T","E","S","T","S","X","Q","W","E","R","T","Y"],
    ["D","E","P","L","O","Y","Z","X","C","V","B","N"],
    ["A","P","P","C","R","A","S","H","J","K","L","M"],
    ["B","U","I","L","D","E","R","T","Y","U","I","O"],
    ["C","O","D","E","X","A","B","C","D","E","F","G"],
    ["L","O","G","S","M","O","B","I","L","E","H","J"],
  ],

  wordList: [
    { word: "TYPESCRIPT", cells: [
      {r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},
      {r:0,c:5},{r:0,c:6},{r:0,c:7},{r:0,c:8},{r:0,c:9}
    ]},

    { word: "FRONTEND", cells: [
      {r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},
      {r:1,c:4},{r:1,c:5},{r:1,c:6},{r:1,c:7}
    ]},

    { word: "MOBILE", cells: [
      {r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5}
    ]},

    { word: "DOCKER", cells: [
      {r:5,c:0},{r:5,c:1},{r:5,c:2},{r:5,c:3},{r:5,c:4},{r:5,c:5}
    ]},

    { word: "THYAGO", cells: [
      {r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},{r:3,c:5}
    ]},

    { word: "ISABELLE", cells: [
      {r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},{r:4,c:4},{r:4,c:5},{r:4,c:6},{r:4,c:7}
    ]},

    { word: "DEPLOY", cells: [
      {r:7,c:0},{r:7,c:1},{r:7,c:2},{r:7,c:3},{r:7,c:4},{r:7,c:5}
    ]},

    { word: "CRASH", cells: [
      {r:8,c:3},{r:8,c:4},{r:8,c:5},{r:8,c:6},{r:8,c:7}
    ]},

    { word: "TESTS", cells: [
      {r:6,c:0},{r:6,c:1},{r:6,c:2},{r:6,c:3},{r:6,c:4}
    ]},
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