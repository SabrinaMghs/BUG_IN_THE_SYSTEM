const case4 = {
  id: 4,
  difficulty: "DIFÍCIL",
  diffColor: "#ff2d55",
  title: "A Brecha de Segurança",
  subtitle: "Dados de 50.000 usuários foram expostos. Encontre o responsável.",
  grid: [
    ["G","R","A","P","H","Q","L","W","B","Y"],
    ["K","U","B","E","R","N","E","T","E","S"],
    ["E","M","I","L","Y","N","A","D","I","A"],
    ["R","E","D","I","S","C","A","C","H","E"],
    ["K","A","F","K","A","S","T","R","E","A"],
  ],
  wordList: [
    { word: "GRAPHQL",    cells: [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5},{r:0,c:6}] },
    { word: "KUBERNETES", cells: [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:1,c:6},{r:1,c:7},{r:1,c:8},{r:1,c:9}] },
    { word: "REDIS",      cells: [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4}] },
    { word: "KAFKA",      cells: [{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},{r:4,c:4}] },
    { word: "EMILY",      cells: [{r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4}] },
  ],
  clues: [
    "A brecha foi aberta via uma query não sanitizada",
    "O serviço de orquestração de containers foi comprometido",
    "Um cache sem TTL deixou dados sensíveis expostos por horas",
    "O acesso veio de dentro da própria infraestrutura da empresa",
  ],
  suspects:  ["EMILY","NADIA","RODRIGO","HASSAN"],
  languages: ["GRAPHQL","PYTHON","RUST","GO"],
  locations: ["KUBERNETES","REDIS","KAFKA","DATABASE"],
  culprit:  "EMILY",
  language: "GRAPHQL",
  location: "KUBERNETES",
};

export default case4;