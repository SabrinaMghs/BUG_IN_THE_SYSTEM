import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function ProgressBar({ found, total }) {
  const pct = total > 0 ? (found / total) * 100 : 0;
  return (
    <View style={s.wrap}>
      <View style={s.row}>
        <Text style={s.label}>PROGRESSO</Text>
        <Text style={s.count}>{found}/{total}</Text>
      </View>
      <View style={s.track}>
        <View style={[s.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { marginTop: 10 },
  row:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontFamily: fonts.bold, fontSize: 8, color: colors.accent, letterSpacing: 3 },
  count: { fontFamily: fonts.mono, fontSize: 8, color: colors.accent },
  track: { height: 4, backgroundColor: '#1a3050', borderRadius: 2 },
  fill:  { height: 4, backgroundColor: colors.accent, borderRadius: 2 },
});