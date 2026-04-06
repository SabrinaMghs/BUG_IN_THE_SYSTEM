import { useRef } from "react";
import { cellKey } from "../hooks/useGame";

export default function PalavraGrade({ puzzle, foundSet, dragSet, flash, startDrag, moveDrag, endDrag }) {
  const gridRef = useRef(null);

  function cellFromPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return null;
    const r = parseInt(el.dataset.r);
    const c = parseInt(el.dataset.c);
    if (isNaN(r) || isNaN(c)) return null;
    return { r, c };
  }

  function onTouchStart(e) {
    const t = e.touches[0];
    const cell = cellFromPoint(t.clientX, t.clientY);
    if (cell) startDrag(cell.r, cell.c);
  }

  function onTouchMove(e) {
    e.preventDefault();
    const t = e.touches[0];
    const cell = cellFromPoint(t.clientX, t.clientY);
    if (cell) moveDrag(cell.r, cell.c);
  }

  const flashCells = flash
    ? new Set((puzzle.wordList.find((e) => e.word === flash)?.cells ?? []).map(({ r, c }) => cellKey(r, c)))
    : new Set();


}
