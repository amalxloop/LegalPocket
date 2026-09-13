import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { unifiedSearch, SEARCHABLE_TYPES, type SearchType } from '@/db/repos/search';
import type { SearchResult } from '@/types';
import { SectionListEmpty } from '@/components/empty-state';

const QUICK_PROMPTS = ['FIR', 'Section 138', 'fundamental rights', 'bail', 'defamation', 'RTI'];

export default function SearchScreen() {
  const db = useDatabase();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<SearchType>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const trimmed = query.trim();

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      setSearching(false);
    } else {
      setSearching(true);
    }
  };

  useEffect(() => {
    if (!trimmed) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const r = await unifiedSearch(db, trimmed, type);
        if (!cancelled) {
          setResults(r);
          setSearching(false);
        }
      } catch {
        if (!cancelled) setSearching(false);
      }
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [db, trimmed, type]);

  const counts = useMemo(() => {
    return {
      section: results.filter((r) => r.type === 'section').length,
      article: results.filter((r) => r.type === 'article').length,
      act: results.filter((r) => r.type === 'act').length,
      all: results.length,
    };
  }, [results]);

  return (
    <View style={styles.root}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={query}
          onChangeText={handleChangeText}
          placeholder="Search statutes, sections, articles…"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          returnKeyType="search"
        />
        {!!trimmed && (
          <Pressable onPress={() => handleChangeText('')} hitSlop={8} accessibilityLabel="Clear search">
            <Text style={styles.clear}>✕</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {SEARCHABLE_TYPES.map((t) => (
          <Pressable
            key={t}
            onPress={() => setType(t)}
            style={[styles.chip, type === t && styles.chipActive]}
          >
            <Text style={[styles.chipText, type === t && styles.chipTextActive]}>
              {t === 'all' ? `All (${counts.all})` : `${t} (${counts[t]})`}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={results}
        keyExtractor={(r) => `${r.type}-${r.type === 'section' ? r.section.id : r.type === 'article' ? r.article.id : r.act.id}`}
        renderItem={({ item }) => <ResultRow result={item} />}
        contentContainerStyle={styles.results}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          trimmed ? (
            searching ? (
              <SectionListEmpty title="Searching…" />
            ) : (
              <SectionListEmpty
                title="No matches found"
                hint="Check the spelling, try a synonym (e.g. “cheque bounce” for “dishonour of cheque”), or a section number."
              />
            )
          ) : (
            <View style={styles.prompts}>
              <Text style={styles.promptHeading}>Try a quick search</Text>
              <View style={styles.promptRow}>
                {QUICK_PROMPTS.map((p) => (
                  <Pressable key={p} style={styles.prompt} onPress={() => handleChangeText(p)}>
                    <Text style={styles.promptText}>{p}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.note}>
                United Legal Search queries the Constitution, Bare Acts, and your
                Saved Library at once — fully offline.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

function ResultRow({ result }: { result: SearchResult }) {
  const onPress = () => {
    if (result.type === 'section') router.push(`/sections/${result.section.id}`);
    else if (result.type === 'article') router.push(`/articles/${result.article.id}`);
    else router.push(`/acts/${result.act.id}`);
  };

  const kindIcon = result.type === 'section' ? '§' : result.type === 'article' ? 'ART' : 'ACT';
  const kindColor =
    result.type === 'section'
      ? colors.info
      : result.type === 'article'
        ? colors.success
        : colors.gold;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.result, pressed && styles.pressed]}>
      <View style={[styles.kind, { backgroundColor: kindColor + '22' }]}>
        <Text style={[styles.kindText, { color: kindColor }]}>{kindIcon}</Text>
      </View>
      <View style={styles.resultBody}>
        <Text style={styles.resultTitle}>
          {result.type === 'section'
            ? `Section ${result.section.number}`
            : result.type === 'article'
              ? `Article ${result.article.number}`
              : result.act.short_title}
        </Text>
        <Text style={styles.resultSubtitle} numberOfLines={1}>
          {result.type === 'section'
            ? result.actTitle
            : result.type === 'article'
              ? result.partTitle
              : `${result.act.year} · ${result.act.category}`}
        </Text>
        {!!result.highlight && result.type !== 'act' && (
          <Text style={styles.resultHighlight} numberOfLines={3}>
            {result.highlight}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    margin: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.navy800,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
    borderWidth: 1,
    borderColor: colors.navy700,
  },
  searchIcon: { fontSize: 16 },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  clear: { color: colors.textMuted, fontSize: 16, padding: 4 },
  chips: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.sm },
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
  results: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.sm },
  result: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
  },
  pressed: { opacity: 0.75 },
  kind: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kindText: { fontWeight: '800', fontSize: 14 },
  resultBody: { flex: 1 },
  resultTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  resultSubtitle: { color: colors.textSecondary, fontSize: 12.5, marginTop: 1 },
  resultHighlight: { color: colors.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },
  input2: {},
  prompts: { paddingTop: spacing.lg },
  promptHeading: { color: colors.textSecondary, fontSize: 14, fontWeight: '600', marginBottom: spacing.md },
  promptRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  prompt: {
    backgroundColor: colors.navy800,
    borderColor: colors.navy700,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promptText: { color: colors.text, fontSize: 13.5 },
  note: {
    color: colors.textMuted,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: spacing.xl,
  },
});