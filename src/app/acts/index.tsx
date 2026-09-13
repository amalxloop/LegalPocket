import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { listActs, listCategories } from '@/db/repos/acts';
import type { ActWithCount } from '@/types';
import { Badge } from '@/components/badge';
import { SectionListEmpty } from '@/components/empty-state';

export default function ActsIndexScreen() {
  const db = useDatabase();
  const [acts, setActs] = useState<ActWithCount[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const cats = await listCategories(db);
        if (mounted) setCategories(cats);
        const rows = await listActs(db, { category, search: query.trim() });
        if (mounted) {
          setActs(rows);
          setLoading(false);
        }
      })();
      return () => {
        mounted = false;
      };
    }, [db, category, query]),
  );

  const totalSections = useMemo(
    () => acts.reduce((acc, a) => acc + a.section_count, 0),
    [acts],
  );

  return (
    <View style={styles.root}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Acts by name…"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="words"
          style={styles.input}
        />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        data={['All', ...categories]}
        keyExtractor={(c) => c}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setCategory(item)}
            style={[styles.chip, category === item && styles.chipActive]}
          >
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>
              {item}
            </Text>
          </Pressable>
        )}
      />

      <FlatList
        data={acts}
        keyExtractor={(a) => String(a.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/acts/${item.id}`)}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            <View style={styles.rowTop}>
              <Text style={styles.rowTitle}>{item.short_title}</Text>
              <Badge
                text={item.status === 'active' ? 'In force' : item.status === 'repealed' ? 'Repealed' : 'Not in force'}
                tone={item.status === 'active' ? 'active' : item.status === 'repealed' ? 'repealed' : 'pending'}
              />
            </View>
            <Text style={styles.rowYear}>
              {item.year}
              {item.act_number ? ` · Act ${item.act_number}` : ''} · {item.category}
            </Text>
            {!!item.description && (
              <Text style={styles.rowDesc} numberOfLines={2}>
                {item.description}
              </Text>
            )}
            <Text style={styles.rowMeta}>
              {item.section_count} sections · {item.jurisdiction}
              {item.last_updated ? ` · last updated ${item.last_updated}` : ''}
            </Text>
          </Pressable>
        )}
        ListHeaderComponent={
          acts.length > 0 ? (
            <Text style={styles.count}>
              {acts.length} Acts · {totalSections} sections loaded
            </Text>
          ) : null
        }
        ListEmptyComponent={
          loading ? (
            <SectionListEmpty title="Loading…" />
          ) : (
            <SectionListEmpty title="No Acts found" hint="Try clearing the search or changing the category filter." />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.navy800,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 42,
    borderWidth: 1,
    borderColor: colors.navy700,
  },
  searchIcon: { fontSize: 14 },
  input: { flex: 1, color: colors.text, fontSize: 15 },
  chips: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingVertical: spacing.md },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.navy800,
    borderWidth: 1,
    borderColor: colors.navy700,
  },
  chipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: colors.navy950 },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  count: { color: colors.textMuted, fontSize: 12.5 },
  row: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  pressed: { opacity: 0.75 },
  rowTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  rowTitle: { color: colors.text, fontSize: 15.5, fontWeight: '700', flex: 1 },
  rowYear: { color: colors.gold, fontSize: 12.5, marginTop: 4, fontWeight: '600' },
  rowDesc: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 18 },
  rowMeta: { color: colors.textMuted, fontSize: 11.5, marginTop: 6 },
});