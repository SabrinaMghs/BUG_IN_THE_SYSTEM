# 🔍 BugSearch — Caça-Palavras de Mistério em TI

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Rode em modo desenvolvimento
npm run dev

# 3. Acesse no navegador
http://localhost:5173
```

## Estrutura do projeto

```
bugsearch/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                  # Roteamento entre telas
    ├── main.jsx                 # Entry point
    ├── styles/
    │   └── global.css           # Estilos globais
    ├── data/
    │   ├── index.js             # Exporta todos os casos
    │   ├── case1.js             # Caso 1 — Fácil
    │   ├── case2.js             # Caso 2 — Intermediário
    │   ├── case3.js             # Caso 3 — Intermediário
    │   └── case4.js             # Caso 4 — Difícil
    ├── hooks/
    │   └── useGame.js           # Lógica do jogo (drag, match)
    ├── components/
    │   ├── WordGrid.jsx         # Grade interativa
    │   ├── ProgressBar.jsx      # Barra de progresso
    │   ├── WordChips.jsx        # Chips de palavras a encontrar
    │   ├── ClueList.jsx         # Lista de pistas
    │   └── VerdictForm.jsx      # Formulário de veredicto
    └── screens/
        ├── IntroScreen.jsx      # Tela inicial com seleção de casos
        ├── GameScreen.jsx       # Tela do jogo
        └── ResultScreen.jsx     # Tela de resultado
```

## Como adicionar novos casos

Crie um novo arquivo em `src/data/case5.js` seguindo o mesmo padrão dos outros casos e importe-o em `src/data/index.js`.

## Como jogar

1. Escolha um caso na tela inicial
2. Clique e arraste na grade para marcar palavras (horizontal, vertical ou diagonal)
3. Encontre todas as palavras da lista
4. Use as pistas para deduzir o culpado, a linguagem e o local
5. Submeta o veredicto para fechar o caso!
