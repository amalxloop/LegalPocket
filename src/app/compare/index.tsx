import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { listCompareSets, type CompareSetWithActs } from '@/db/repos/compare';
import { SectionListEmpty } from '@/components/empty-state';

export default function CompareIndexScreen() {
  const db = useDatabase();
  const [sets, setSets] = useState<CompareSetWithActs[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      listCompareSets(db).then((rows) => {
        if (mounted) {
          setSets(rows);
          setLoading(false);
        }
      });
      return () => {
        mounted = false;
      };
    }, [db]),
  );

  return (
    <FlatList
      style={styles.root}
      data={sets}
      keyExtractor={(s) => s.id.toString()}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Side-by-side comparison of repealed laws and their 2023 replacements.
            Effective 1 July 2024, India’s criminal justice statutes were recast —
            old and new sections are mapped here for transition and study.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/compare/${item.id}`)}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardActs}>
            {item.old_act.short_title} ↔ {item.new_act.short_title}
          </Text>
          <Text style={styles.cardRelevance}>{item.relevance}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>Mappings pending official review</Text>
            </View>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        loading ? (
          <SectionListEmpty title="Loading…" />
        ) : (
          <SectionListEmpty title="No comparisons yet" />
        )
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
    marginBottom: spacing.sm,
  },
  introText: { color: colors.info, fontSize: 13, lineHeight: 19 },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pressed: { opacity: 0.75 },
  cardName: { color: colors.text, fontSize: 17, fontWeight: '800' },
  cardActs: { color: colors.gold, fontSize: 13, fontWeight: '600' },
  cardRelevance: { color: colors.textSecondary, fontSize: 12.5, lineHeight: 18 },
  badgeRow: { flexDirection: 'row' },
  pendingBadge: {
    backgroundColor: colors.navy800,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pendingText: { color: colors.gold, fontSize: 11, fontWeight: '600' },
});