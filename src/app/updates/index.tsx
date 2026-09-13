import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { listUpdates, type UpdateFeedRow } from '@/db/repos/updates';
import { SectionListEmpty } from '@/components/empty-state';
import { UpdateStatusBadge, UPDATE_KIND_LABEL } from '@/components/update-status';
import type { UpdateStatus } from '@/types';

type Tab = 'recent' | 'inbox';

const TABS: { key: Tab; label: string; status?: UpdateStatus }[] = [
  { key: 'recent', label: 'Recent Updates' },
  { key: 'inbox', label: 'Editorial Inbox' },
];

export default function UpdatesIndexScreen() {
  const db = useDatabase();
  const [tab, setTab] = useState<Tab>('recent');
  const [rows, setRows] = useState<UpdateFeedRow[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const feed = await listUpdates(db, {
          status: tab === 'inbox' ? undefined : 'published',
          excludeRejected: tab === 'recent',
        });
        if (mounted) {
          setRows(feed);
          setLoading(false);
        }
      })();
      return () => {
        mounted = false;
      };
    }, [db, tab]),
  );

  return (
    <View style={styles.root}>
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Pressable
            key={t.key}
            onPress={() => setTab(t.key)}
            style={[styles.tab, tab === t.key && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={rows}
        keyExtractor={(r) => r.id.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.disclaimer}>
            Updates trace back to official sources (e-Gazette, India Code). Nothing is published
            without editorial review. Pending-review items are labelled and excluded from the live
            statute library.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/updates/${item.id}`)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <View style={styles.cardHead}>
              <UpdateStatusBadge status={item.status} />
              <Text style={styles.kind}>
                {UPDATE_KIND_LABEL[item.update_kind]}
                {item.section_number ? ` · § ${item.section_number}` : ''}
              </Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            {item.act_short_title ? (
              <Text style={styles.act}>{item.act_short_title}</Text>
            ) : null}
            {!!item.summary && <Text style={styles.body} numberOfLines={3}>{item.summary}</Text>}
            <Text style={styles.meta}>
              {item.published_at ?? item.under_review_at ?? item.detected_at}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          loading ? (
            <SectionListEmpty title="Loading…" />
          ) : (
            <SectionListEmpty
              title={tab === 'inbox' ? 'Inbox is clear' : 'No updates yet'}
              hint="Run the editorial workflow to publish your first update."
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    backgroundColor: colors.navy800,
    borderColor: colors.navy700,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingVertical: 7,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: colors.gold },
  tabText: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '700' },
  tabTextActive: { color: colors.navy950 },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pressed: { opacity: 0.75 },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  kind: { color: colors.textMuted, fontSize: 11.5, fontWeight: '600' },
  title: { color: colors.text, fontSize: 15.5, fontWeight: '800', lineHeight: 21 },
  act: { color: colors.gold, fontSize: 12.5, fontWeight: '700' },
  body: { color: colors.textSecondary, fontSize: 13, lineHeight: 18 },
  meta: { color: colors.textMuted, fontSize: 11.5 },
});