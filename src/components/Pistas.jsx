import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function ClueList({ clues }) {
  return (
    <View style={s.panel}>
      <Text style={s.title}>▶ PISTAS DO CASO</Text>
      {clues.map((clue, i) => (
        <View key={i} style={s.row}>
          <Text style={s.num}>#{i + 1}</Text>
          <Text style={s.txt}>{clue}</Text>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  panel: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 14, marginBottom: 12 },
  title: { fontFamily: fonts.bold, fontSize: 9, color: colors.accent, letterSpacing: 3, marginBottom: 10 },
  row:   { flexDirection: 'row', marginBottom: 8 },
  num:   { fontFamily: fonts.bold, fontSize: 10, color: colors.accent, marginRight: 8, width: 24 },
  txt:   { fontFamily: fonts.mono, fontSize: 11, color: colors.text, flex: 1, lineHeight: 18 },
});