import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { colors, fonts } from '../theme';

function Picker({ label, options, value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={s.pickerWrap}>
      <Text style={s.lbl}>{label}</Text>
      <TouchableOpacity
        style={[s.picker, disabled && s.pickerDisabled]}
        onPress={() => !disabled && setOpen(true)}
      >
        <Text style={[s.pickerTxt, !value && s.pickerPlaceholder]}>
          {value || '— selecione —'}
        </Text>
        <Text style={s.arrow}>▼</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={s.overlay} onPress={() => setOpen(false)}>
          <View style={s.modal}>
            <FlatList
              data={options}
              keyExtractor={x => x}
              renderItem={({ item }) => (
                <TouchableOpacity style={s.option} onPress={() => { onChange(item); setOpen(false); }}>
                  <Text style={[s.optTxt, item === value && s.optSelected]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default function VerdictForm({ puzzle, answer, setAnswer, allFound, wrongAns, onSubmit }) {
  const ready = allFound && answer.culprit && answer.language && answer.location;
  return (
    <View style={s.panel}>
      <Text style={s.title}>▶ VEREDICTO FINAL</Text>
      <Picker label="👤 CULPADO"      options={puzzle.suspects}  value={answer.culprit}  onChange={v => setAnswer(a => ({ ...a, culprit: v }))} />
      <Picker label="💻 LINGUAGEM"    options={puzzle.languages} value={answer.language} onChange={v => setAnswer(a => ({ ...a, language: v }))} />
      <Picker label="📍 LOCAL DO BUG" options={puzzle.locations} value={answer.location} onChange={v => setAnswer(a => ({ ...a, location: v }))} />

      <TouchableOpacity
        style={[s.btn, ready ? s.btnSuccess : s.btnDanger, !ready && s.btnDisabled]}
        onPress={onSubmit}
        disabled={!ready}
      >
        <Text style={s.btnTxt}>{allFound ? '▶ FECHAR CASO' : '▶ SUBMETER VEREDICTO'}</Text>
      </TouchableOpacity>

      {wrongAns && <Text style={s.err}>✗ RESPOSTA INCORRETA — INVESTIGUE MAIS</Text>}
      {!allFound && <Text style={s.warn}>Encontre todas as palavras para liberar o veredicto</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  panel:           { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 14, marginBottom: 12 },
  title:           { fontFamily: fonts.bold, fontSize: 9, color: colors.accent, letterSpacing: 3, marginBottom: 12 },
  pickerWrap:      { marginBottom: 10 },
  lbl:             { fontFamily: fonts.mono, fontSize: 9, color: colors.textDim, letterSpacing: 2, marginBottom: 4 },
  picker:          { flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, borderRadius: 6, padding: 10, backgroundColor: '#0a1628' },
  pickerDisabled:  { opacity: 0.4 },
  pickerTxt:       { fontFamily: fonts.mono, fontSize: 11, color: colors.text },
  pickerPlaceholder:{ color: colors.textDim },
  arrow:           { fontFamily: fonts.mono, fontSize: 10, color: colors.accent },
  overlay:         { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', padding: 40 },
  modal:           { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 8, maxHeight: 200 },
  option:          { padding: 14, borderBottomWidth: 1, borderColor: colors.border },
  optTxt:          { fontFamily: fonts.mono, fontSize: 13, color: colors.text },
  optSelected:     { color: colors.accent },
  btn:             { borderRadius: 6, padding: 14, alignItems: 'center', marginTop: 8 },
  btnSuccess:      { backgroundColor: colors.success },
  btnDanger:       { backgroundColor: colors.danger },
  btnDisabled:     { opacity: 0.4 },
  btnTxt:          { fontFamily: fonts.bold, fontSize: 11, color: colors.bg, letterSpacing: 2 },
  err:             { fontFamily: fonts.bold, fontSize: 10, color: colors.danger, textAlign: 'center', marginTop: 8 },
  warn:            { fontFamily: fonts.mono, fontSize: 10, color: colors.textDim, textAlign: 'center', marginTop: 8 },
});