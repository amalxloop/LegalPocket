import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/theme/colors';
import type { UpdateKind, UpdateStatus } from '@/types';

export const UPDATE_KIND_LABEL: Record<UpdateKind, string> = {
  amendment: 'Amendment',
  commencement: 'Commencement',
  repeal: 'Repeal',
  new_act: 'New Act',
  bill_introduced: 'Bill introduced',
  bill_passed: 'Bill passed',
  assent: 'Presidential assent',
};

export const UPDATE_STATUS_LABEL: Record<UpdateStatus, string> = {
  detected: 'Detected',
  under_review: 'Pending review',
  approved: 'Approved — awaiting publish',
  rejected: 'Rejected',
  published: 'Reviewed & published',
};

const STATUS_COLOR: Record<UpdateStatus, string> = {
  detected: colors.info,
  under_review: colors.gold,
  approved: colors.info,
  rejected: colors.danger,
  published: colors.success,
};

const STATUS_BG: Record<UpdateStatus, string> = {
  detected: colors.infoBg,
  under_review: colors.dangerBg,
  approved: colors.infoBg,
  rejected: colors.dangerBg,
  published: colors.successBg,
};

export function UpdateStatusBadge({ status }: { status: UpdateStatus }) {
  return (
    <View style={[styles.pill, { backgroundColor: STATUS_BG[status] }]}>
      <Text style={[styles.pillText, { color: STATUS_COLOR[status] }]}>
        {UPDATE_STATUS_LABEL[status]}
      </Text>
    </View>
  );
}

export function UpdateKindBadge({ kind }: { kind: UpdateKind }) {
  return (
    <View style={styles.kindPill}>
      <Text style={styles.kindText}>{UPDATE_KIND_LABEL[kind]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  pillText: { fontSize: 11.5, fontWeight: '700' },
  kindPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.navy800,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  kindText: { color: colors.textSecondary, fontSize: 11.5, fontWeight: '700', letterSpacing: 0.3 },
});