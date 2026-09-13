import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import {
  listUpdates,
  setUnderReview,
  approveUpdate,
  publishUpdate,
  rejectUpdate,
  type UpdateFeedRow,
} from '@/db/repos/updates';
import { SectionListEmpty } from '@/components/empty-state';
import { UpdateStatusBadge, UPDATE_KIND_LABEL } from '@/components/update-status';

export default function EditorialInboxScreen() {
  const db = useDatabase();
  const [rows, setRows] = useState<UpdateFeedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    const feed = await listUpdates(db, { excludeRejected: false });
    setRows(feed);
    setLoading(false);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const act = async (id: number, fn: () => Promise<void>) => {
    setBusyId(id);
    try {
      await fn();
      await refresh();
    } finally {
      setBusyId(null);
    }
  };

  const btn = (label: string, onPress: () => void, style: 'gold' | 'success' | 'danger', disabled?: boolean) => (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        styles[style],
        (pressed || disabled) && styles.pressed,
      ]}
    >
      <Text style={styles.btnText}>{label}</Text>
    </Pressable>
  );

  return (
    <FlatList
      style={styles.root}
      data={rows}
      keyExtractor={(r) => r.id.toString()}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Internal review tool — enforces the “never publish without review” rule.
            Detected items are triaged here; section amendments record a version,
            and Act status/date badges are updated on publish.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.head}>
            <UpdateStatusBadge status={item.status} />
            <Text style={styles.kind}>
              {UPDATE_KIND_LABEL[item.update_kind]}
              {item.section_number ? ` · § ${item.section_number}` : ''}
            </Text>
          </View>
          <Pressable onPress={() => router.push(`/updates/${item.id}`)}>
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
          {item.act_short_title ? <Text style={styles.act}>{item.act_short_title}</Text> : null}
          {item.status !== 'rejected' && (
            <View style={styles.actions}>
              {item.status === 'detected' &&
                btn('Begin review', () => act(item.id, () => setUnderReview(db, item.id)), 'gold', busyId !== null)}
              {item.status === 'under_review' &&
                btn('Approve', () => act(item.id, () => approveUpdate(db, item.id)), 'gold', busyId !== null)}
              {item.status === 'approved' &&
                btn('Publish', () => act(item.id, () => publishUpdate(db, item.id)), 'success', busyId !== null)}
              {item.status !== 'published' &&
                btn('Reject', () => act(item.id, () => rejectUpdate(db, item.id, 'Rejected by editor.')), 'danger', busyId !== null)}
            </View>
          )}
          {item.reviewer_note ? <Text style={styles.note}>{item.reviewer_note}</Text> : null}
        </View>
      )}
      ListEmptyComponent={
        loading ? <SectionListEmpty title="Loading…" /> : <SectionListEmpty title="Inbox is clear" />
      }
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  intro: {
    backgroundColor: colors.infoBg,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  introText: { color: colors.info, fontSize: 12.5, lineHeight: 18 },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  kind: { color: colors.textMuted, fontSize: 11.5, fontWeight: '600' },
  title: { color: colors.text, fontSize: 15, fontWeight: '800', lineHeight: 21 },
  act: { color: colors.gold, fontSize: 12.5, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' },
  btn: { borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 8 },
  gold: { backgroundColor: colors.gold },
  success: { backgroundColor: colors.success },
  danger: { backgroundColor: colors.danger },
  pressed: { opacity: 0.6 },
  btnText: { color: colors.navy950, fontSize: 12.5, fontWeight: '800' },
  note: { color: colors.danger, fontSize: 12 },
});