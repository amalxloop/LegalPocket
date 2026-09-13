import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { listParts, getPreamble } from '@/db/repos/constitution';
import { SectionListEmpty } from '@/components/empty-state';

interface Row {
  kind: 'preamble' | 'part' | 'schedules';
  id: number;
  number: string;
  title: string;
  subtitle: string;
}

export default function ConstitutionIndexScreen() {
  const db = useDatabase();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const parts = await listParts(db);
      const preamble = await getPreamble(db);
      if (!mounted) return;
      const sorted = [...parts].sort(
        (a, b) => (a.number === 'PRE' ? 0 : 1) - (b.number === 'PRE' ? 0 : 1),
      );
      const built: Row[] = [];
      if (preamble) {
        built.push({
          kind: 'preamble',
          id: preamble.id,
          number: '—',
          title: 'Preamble',
          subtitle: '"We, the People of India…"',
        });
      }
      for (const p of sorted) {
        if (p.number === 'PRE') continue;
        built.push({
          kind: 'part',
          id: p.id,
          number: p.display_title,
          title: p.title,
          subtitle: `${p.article_count} articles`,
        });
      }
      built.push({
        kind: 'schedules',
        id: 0,
        number: '—',
        title: 'Schedules',
        subtitle: '12 Schedules — Union List, languages, anti-defection & more',
      });
      setRows(built);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [db]);

  const onPress = (row: Row) => {
    if (row.kind === 'preamble') router.push(`/articles/${row.id}`);
    else if (row.kind === 'part') router.push(`/constitution/${row.id}`);
    else router.push('/constitution/schedules');
  };

  return (
    <FlatList
      style={styles.root}
      data={rows}
      keyExtractor={(r) => `${r.kind}-${r.id}`}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPress(item)}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <View style={styles.numberBox}>
            <Text style={styles.number}>{item.number}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      )}
      ListEmptyComponent={
        loading ? <SectionListEmpty title="Loading…" /> : <SectionListEmpty title="No content" />
      }
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  pressed: { opacity: 0.75 },
  numberBox: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.navy800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { color: colors.gold, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  body: { flex: 1 },
  title: { color: colors.text, fontSize: 15.5, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 12.5, marginTop: 2, lineHeight: 17 },
  chevron: { color: colors.textMuted, fontSize: 22 },
});