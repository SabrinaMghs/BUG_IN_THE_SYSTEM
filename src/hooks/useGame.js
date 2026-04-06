export function cellKey(r, c) {
  return `${r},${c}`;
}

export function getLineCells(r0, c0, r1, c1) {
  const dr = r1 - r0, dc = c1 - c0;
  if (dr === 0 && dc === 0) return [{ r: r0, c: c0 }];
  const absDr = Math.abs(dr), absDc = Math.abs(dc);
  if (dr !== 0 && dc !== 0 && absDr !== absDc) return [{ r: r0, c: c0 }];
  const steps = Math.max(absDr, absDc);
  const sr = Math.sign(dr), sc = Math.sign(dc);
  const cells = [];
  for (let i = 0; i <= steps; i++) cells.push({ r: r0 + i * sr, c: c0 + i * sc });
  return cells;
}

export default function useGame(puzzle) {
  const [foundWords, setFoundWords] = useState([]);
  const [dragCells, setDragCells]   = useState([]);
  const [dragging, setDragging]     = useState(false);
  const [flash, setFlash]           = useState(null);
  const startCell = useRef(null);

  // Reset when puzzle changes
  useEffect(() => {
    setFoundWords([]);
    setDragCells([]);
    setDragging(false);
    setFlash(null);
    startCell.current = null;
  }, [puzzle?.id]);

  const foundSet = new Set(
    foundWords.flatMap((w) => {
      const e = puzzle?.wordList.find((x) => x.word === w);
      return e ? e.cells.map(({ r, c }) => cellKey(r, c)) : [];
    })
  );
  const dragSet  = new Set(dragCells.map(({ r, c }) => cellKey(r, c)));
  const allFound = puzzle?.wordList.every((e) => foundWords.includes(e.word)) ?? false;

  
}