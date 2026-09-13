import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/theme/colors';

export type BadgeTone = 'active' | 'repealed' | 'pending' | 'info' | 'gold' | 'neutral';

const TONES: Record<BadgeTone, { bg: string; fg: string }> = {
  active: { bg: colors.successBg, fg: colors.success },
  repealed: { bg: colors.dangerBg, fg: colors.danger },
  pending: { bg: '#3A2E16', fg: colors.gold },
  info: { bg: colors.infoBg, fg: colors.info },
  gold: { bg: '#3A2E16', fg: colors.gold },
  neutral: { bg: colors.navy700, fg: colors.textSecondary },
};

export function Badge({ text, tone = 'neutral' }: { text: string; tone?: BadgeTone }) {
  const t = TONES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      <Text style={[styles.text, { color: t.fg }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});