import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { getCompareSet, listMappings, type CompareSetWithActs } from '@/db/repos/compare';
import type { CompareMappingRow } from '@/types';
import { SectionListEmpty } from '@/components/empty-state';

export default function CompareDetailScreen() {
  const db = useDatabase();
  const { setId } = useLocalSearchParams<{ setId: string }>();
  const [set, setSet] = useState<CompareSetWithActs | null>(null);
  const [mappings, setMappings] = useState<CompareMappingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await getCompareSet(db, Number(setId));
      if (!mounted) return;
      if (!s) {
        setLoading(false);
        return;
      }
      setSet(s);
      const m = await listMappings(db, s.id);
      if (mounted) {
        setMappings(m);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [db, setId]);

  const filtered = query.trim()
    ? mappings.filter((m) =>
        `${m.old_section} ${m.new_section ?? ''} ${m.description ?? ''}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      )
    : mappings;

  if (!set && !loading) return <SectionListEmpty title="Comparison not found" />;

  return (
    <>
      <Stack.Screen options={{ title: set?.name ?? 'Comparison' }} />
      <View style={styles.root}>
        <Header set={set} />
        {mappings.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.searchRow}>
            <SearchBox value={query} onChange={setQuery} />
          </ScrollView>
        )}
        <FlatList
          data={filtered}
          keyExtractor={(m) => m.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <MappingRow m={item} />}
          ListEmptyComponent={
            loading ? (
              <SectionListEmpty title="Loading…" />
            ) : (
              <SectionListEmpty
                title={query.trim() ? 'No mapping matches' : 'No mappings yet'}
                hint="Search by old or new section number."
              />
            )
          }
        />
      </View>
    </>
  );
}

function Header({ set }: { set: CompareSetWithActs | null }) {
  if (!set) return null;
  return (
    <View style={styles.header}>
      <Text style={styles.headerSub}>OLD LAW</Text>
      <Text style={styles.headerAct}>{set.old_act.short_title}</Text>
      <Text style={styles.headerArrow}>↓ ↔ ↓</Text>
      <Text style={styles.headerSub}>NEW LAW</Text>
      <Text style={styles.headerAct}>{set.new_act.short_title}</Text>
      {!!set.relevance && <Text style={styles.headerNote}>{set.relevance}</Text>}
    </View>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Filter by section number…"
      placeholderTextColor={colors.textMuted}
      style={styles.searchInput}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

function MappingRow({ m }: { m: CompareMappingRow }) {
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        <Text style={styles.sideLabel}>OLD</Text>
        <Text style={styles.sectionNum}>§ {m.old_section}</Text>
      </View>
      <View style={styles.arrowCol}>
        <Text style={styles.arrow}>→</Text>
        {m.status === 'pending_verification' && <Text style={styles.dot}>•</Text>}
      </View>
      <View style={styles.side}>
        <Text style={styles.sideLabelNew}>NEW</Text>
        <Text style={styles.sectionNumNew}>{m.new_section ? `§ ${m.new_section}` : '—'}</Text>
      </View>
      {!!m.description && (
        <View style={styles.noteWrap}>
          <Text style={styles.note}>{m.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.navy900,
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.navy800,
  },
  headerSub: { color: colors.textMuted, fontSize: 10.5, fontWeight: '800', letterSpacing: 1.5 },
  headerAct: { color: colors.text, fontSize: 15.5, fontWeight: '800' },
  headerArrow: { color: colors.gold, fontSize: 16, fontWeight: '800', marginVertical: 2 },
  headerNote: { color: colors.textSecondary, fontSize: 12, marginTop: 6, lineHeight: 17 },
  searchRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  searchInput: {
    backgroundColor: colors.navy800,
    borderColor: colors.navy700,
    borderWidth: 1,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: spacing.md,
    height: 38,
    minWidth: 220,
  },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  row: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  side: { minWidth: 90, flex: 1 },
  sideLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  sideLabelNew: { color: colors.success, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  sectionNum: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 2 },
  sectionNumNew: { color: colors.gold, fontSize: 20, fontWeight: '800', marginTop: 2 },
  arrowCol: { alignItems: 'center', justifyContent: 'center' },
  arrow: { color: colors.textMuted, fontSize: 18 },
  dot: { color: colors.gold, fontSize: 10 },
  noteWrap: { flexBasis: '100%' },
  note: { color: colors.textSecondary, fontSize: 12.5, lineHeight: 18 },
});