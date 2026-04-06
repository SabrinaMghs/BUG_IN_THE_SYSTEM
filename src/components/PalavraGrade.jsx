import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { cellKey } from '../hooks/useGame';
import { colors, fonts } from '../theme';
import { useRef } from 'react';

const CELL_SIZE = 36;

export default function WordGrid({ puzzle, foundSet, dragSet, flash, startDrag, moveDrag, endDrag }) {
  const layoutRef = useRef({ x: 0, y: 0 });

  const flashCells = flash
    ? new Set((puzzle.wordList.find(e => e.word === flash)?.cells ?? []).map(({ r, c }) => cellKey(r, c)))
    : new Set();

  function cellFromPoint(x, y) {
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (row >= 0 && row < puzzle.grid.length && col >= 0 && col < puzzle.grid[0].length) {
      return { r: row, c: col };
    }
    return null;
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      const cell = cellFromPoint(e.x, e.y);
      if (cell) startDrag(cell.r, cell.c);
    })
    .onUpdate((e) => {
      const cell = cellFromPoint(e.x, e.y);
      if (cell) moveDrag(cell.r, cell.c);
    })
    .onEnd(() => endDrag())
    .onFinalize(() => endDrag());

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <View style={s.grid}>
          {puzzle.grid.map((row, r) => (
            <View key={r} style={s.row}>
              {row.map((letter, c) => {
                const k = cellKey(r, c);
                const isFound = foundSet.has(k);
                const isSel   = dragSet.has(k) && !isFound;
                const isFlash = flashCells.has(k);
                return (
                  <View
                    key={k}
                    style={[
                      s.cell,
                      isFound && s.cellFound,
                      isSel   && s.cellSel,
                      isFlash && s.cellFlash,
                    ]}
                  >
                    <Text style={[s.letter, (isFound || isSel || isFlash) && s.letterActive]}>
                      {letter}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({
  grid:        { alignSelf: 'flex-start' },
  row:         { flexDirection: 'row' },
  cell:        { width: CELL_SIZE, height: CELL_SIZE, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1a3050', margin: 1, borderRadius: 4, backgroundColor: '#0d1e30' },
  cellFound:   { backgroundColor: colors.found + '22', borderColor: colors.found },
  cellSel:     { backgroundColor: colors.sel + '33', borderColor: colors.sel },
  cellFlash:   { backgroundColor: colors.flash + '44', borderColor: colors.flash },
  letter:      { fontFamily: fonts.bold, fontSize: 13, color: colors.textDim },
  letterActive:{ color: colors.white },
});