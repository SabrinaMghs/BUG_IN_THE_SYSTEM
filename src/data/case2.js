const case2 = {
  id: 2,
  difficulty: "INTERMEDIÁRIO",
  diffColor: "#ffd600",
  title: "A Queda do Servidor",
  subtitle: "O banco de dados parou de responder às 03h da manhã...",

  grid: [
    ["P","Y","T","H","O","N","Z","K","L","M"],
    ["B","A","C","K","E","N","D","Q","W","E"],
    ["E","M","E","R","S","O","N","X","T","R"],
    ["T","H","Y","A","G","O","B","C","Y","U"],
    ["T","O","K","E","N","R","Y","Z","I","O"],
    ["S","E","R","V","E","R","A","P","I","S"],
    ["D","A","T","A","B","A","S","E","X","C"],
    ["Q","U","E","R","Y","L","O","G","S","D"],
    ["A","U","T","H","X","J","W","K","L","P"],
    ["D","E","B","U","G","M","N","B","V","C"],
    ["C","A","C","H","E","Z","X","C","V","B"],
    ["S","E","S","S","I","O","N","A","S","D"],
  ],

  wordList: [
    { word: "PYTHON",  cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5}] },
    { word: "BACKEND", cells: [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:1,c:6}] },
    { word: "EMERSON", cells: [{r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5},{r:2,c:6}] },
    { word: "THYAGO",  cells: [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},{r:3,c:5}] },
    { word: "TOKEN",   cells: [{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},{r:4,c:4}] },
    { word: "SERVER",  cells: [{r:5,c:0},{r:5,c:1},{r:5,c:2},{r:5,c:3},{r:5,c:4},{r:5,c:5}] },
    { word: "DATABASE",cells: [{r:6,c:0},{r:6,c:1},{r:6,c:2},{r:6,c:3},{r:6,c:4},{r:6,c:5},{r:6,c:6},{r:6,c:7}] },
    { word: "QUERY",   cells: [{r:7,c:0},{r:7,c:1},{r:7,c:2},{r:7,c:3},{r:7,c:4}] },
    { word: "CACHE",   cells: [{r:10,c:0},{r:10,c:1},{r:10,c:2},{r:10,c:3},{r:10,c:4}] },
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