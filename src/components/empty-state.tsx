import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export function SectionListEmpty({ title, hint }: { title: string; hint?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚖️</Text>
      <Text style={styles.title}>{title}</Text>
      {!!hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
    gap: 8,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
});