import { useEffect, useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { colors, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { getAct, getActBySlug, listChapters, listSections } from '@/db/repos/acts';
import type { ActRow, ChapterRow, SectionRow } from '@/types';
import { Badge } from '@/components/badge';
import { BookmarkButton } from '@/components/bookmark-button';
import { SectionListEmpty } from '@/components/empty-state';

interface SectionGroup {
  title: string;
  data: SectionRow[];
}

function groupSections(chapters: ChapterRow[], sections: SectionRow[]): SectionGroup[] {
  const chapterById = new Map(chapters.map((c) => [c.id, c]));
  const map = new Map<number, SectionGroup>();
  const ungrouped: SectionRow[] = [];
  for (const s of sections) {
    if (s.chapter_id != null && chapterById.has(s.chapter_id)) {
      const c = chapterById.get(s.chapter_id)!;
      if (!map.has(c.id)) {
        map.set(c.id, { title: `${c.display_title}: ${c.title}`, data: [] });
      }
      map.get(c.id)!.data.push(s);
    } else {
      ungrouped.push(s);
    }
  }
  const groups: SectionGroup[] = [];
  for (const c of chapters) {
    const g = map.get(c.id);
    if (g) groups.push(g);
  }
  if (ungrouped.length) groups.push({ title: 'Sections', data: ungrouped });
  return groups;
}

export default function ActDetailScreen() {
  const db = useDatabase();
  const { actId } = useLocalSearchParams<{ actId: string }>();
  const [act, setAct] = useState<ActRow | null>(null);
  const [groups, setGroups] = useState<SectionGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const numeric = /^\d+$/.test(actId);
      const row = numeric ? await getAct(db, Number(actId)) : await getActBySlug(db, actId);
      if (!mounted) return;
      if (!row) {
        setLoading(false);
        return;
      }
      setAct(row);
      const [chapters, sections] = await Promise.all([listChapters(db, row.id), listSections(db, row.id)]);
      if (mounted) {
        setGroups(groupSections(chapters, sections));
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [db, actId]);

  const count = useMemo(() => groups.reduce((n, g) => n + g.data.length, 0), [groups]);

  if (!act && !loading) {
    return <SectionListEmpty title="Act not found" hint="It may have been removed or the link is invalid." />;
  }

  return (
    <>
      <Stack.Screen options={{ title: act?.short_title ?? 'Act' }} />
      <SectionList
        style={styles.root}
        sections={groups}
        keyExtractor={(s) => String(s.id)}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.sectionRow, pressed && styles.pressed]}
            onPress={() => router.push(`/sections/${item.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`Section ${item.number}`}
          >
            <Text style={styles.sectionNumber}>§ {item.number}</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionTitle} numberOfLines={1}>
                {item.title ?? '—'}
              </Text>
              {!!item.last_amended && (
                <Text style={styles.sectionAmended}>as amended {item.last_amended}</Text>
              )}
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          act ? (
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={styles.actTitle}>{act.short_title}</Text>
                <BookmarkButton db={db} itemType="act" itemId={act.id} size={30} />
              </View>
              <View style={styles.badges}>
                <Badge
                  text={act.status === 'active' ? 'In force' : act.status === 'repealed' ? 'Repealed' : 'Not yet in force'}
                  tone={act.status === 'active' ? 'active' : act.status === 'repealed' ? 'repealed' : 'pending'}
                />
                <Badge text={act.category} tone="info" />
                <Badge text={act.jurisdiction} tone="neutral" />
              </View>
              <Text style={styles.meta}>
                Act {act.act_number ?? '—'} · {act.year}
                {act.last_updated ? ` · last updated ${act.last_updated}` : ''}
              </Text>
              {!!act.description && <Text style={styles.description}>{act.description}</Text>}
              {count > 0 && (
                <Pressable onPress={() => router.push('/compare')} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
                  <Text style={styles.linkText}>🔄 Compare old vs new law</Text>
                </Pressable>
              )}
            </View>
          ) : null
        }
        ListEmptyComponent={
          loading ? <SectionListEmpty title="Loading…" /> : <SectionListEmpty title="No sections yet" />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  content: { paddingBottom: spacing.xxl },
  header: { padding: spacing.lg, gap: spacing.sm },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  actTitle: { color: colors.text, fontSize: 19, fontWeight: '800', flex: 1, lineHeight: 25 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  meta: { color: colors.textMuted, fontSize: 12.5 },
  description: { color: colors.textSecondary, fontSize: 13.5, lineHeight: 19 },
  link: { marginTop: 2 },
  linkText: { color: colors.gold, fontSize: 13.5, fontWeight: '600' },
  pressed: { opacity: 0.7 },
  sectionHeader: {
    backgroundColor: colors.navy900,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  sectionHeaderText: { color: colors.gold, fontSize: 12.5, fontWeight: '700', letterSpacing: 0.3 },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.navy800,
  },
  sectionNumber: { color: colors.goldDim, fontSize: 13.5, fontWeight: '800', width: 60 },
  sectionBody: { flex: 1 },
  sectionTitle: { color: colors.text, fontSize: 14.5 },
  sectionAmended: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
});