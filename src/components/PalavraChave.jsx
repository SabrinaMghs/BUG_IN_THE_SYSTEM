import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function WordChips({ wordList, foundWords, allFound }) {
  return (
    <View style={s.wrap}>
      <Text style={s.title}>▶ ENCONTRE</Text>
      <View style={s.chips}>
        {wordList.map(e => (
          <View key={e.word} style={[s.chip, foundWords.includes(e.word) && s.chipFound]}>
            <Text style={[s.chipTxt, foundWords.includes(e.word) && s.chipTxtFound]}>{e.word}</Text>
          </View>
        ))}
      </View>
      {allFound && <Text style={s.ok}>✓ TODAS ENCONTRADAS — DEDUZA O CULPADO</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  wrap:         { marginTop: 12 },
  title:        { fontFamily: fonts.bold, fontSize: 9, color: colors.accent, letterSpacing: 3, marginBottom: 8 },
  chips:        { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip:         { borderWidth: 1, borderColor: colors.border, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  chipFound:    { backgroundColor: colors.found + '22', borderColor: colors.found },
  chipTxt:      { fontFamily: fonts.mono, fontSize: 9, color: colors.textDim, letterSpacing: 1 },
  chipTxtFound: { color: colors.found },
  ok:           { fontFamily: fonts.bold, fontSize: 9, color: colors.success, letterSpacing: 2, marginTop: 10, textAlign: 'center' },
}); 