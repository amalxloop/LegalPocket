import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { getPart, listArticlesInPart } from '@/db/repos/constitution';
import type { ArticleRow, PartRow } from '@/types';
import { SectionListEmpty } from '@/components/empty-state';

export default function PartScreen() {
  const db = useDatabase();
  const { partId } = useLocalSearchParams<{ partId: string }>();
  const [part, setPart] = useState<PartRow | null>(null);
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const id = Number(partId);
      const p = await getPart(db, id);
      if (!mounted) return;
      if (p) {
        setPart(p);
        const arts = await listArticlesInPart(db, id);
        if (mounted) {
          setArticles(arts);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [db, partId]);

  if (!part && !loading) {
    return <SectionListEmpty title="Part not found" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: part?.display_title ?? 'Part' }} />
      <FlatList
        style={styles.root}
        data={articles}
        keyExtractor={(a) => a.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/articles/${item.id}`)}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <View style={styles.articleNo}>
              <Text style={styles.articleNoText}>{index + 1}</Text>
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.articleNumber}>Article {item.number}</Text>
              {!!item.title && <Text style={styles.articleTitle}>{item.title}</Text>}
              <Text style={[styles.preview, item.body.startsWith('[Content pending') && styles.pending]}>
                {item.body.startsWith('[Content pending')
                  ? 'Full text pending official sourcing · structure available'
                  : preview(item.body)}
              </Text>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          part ? (
            <View style={styles.header}>
              <Text style={styles.partTitle}>
                {part.display_title} — {part.title}
              </Text>
              <Text style={styles.count}>{articles.length} articles</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          loading ? <SectionListEmpty title="Loading…" /> : <SectionListEmpty title="No articles" />
        }
      />
    </>
  );
}

function preview(body: string): string {
  return body.replace(/\s+/g, ' ').trim();
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  header: { paddingTop: spacing.lg, gap: spacing.xs },
  partTitle: { color: colors.text, fontSize: 17, fontWeight: '800', lineHeight: 23 },
  count: { color: colors.textMuted, fontSize: 12.5, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  pressed: { opacity: 0.75 },
  articleNo: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.navy800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleNoText: { color: colors.gold, fontSize: 12, fontWeight: '700' },
  rowBody: { flex: 1 },
  articleNumber: { color: colors.gold, fontSize: 13, fontWeight: '700' },
  articleTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 1 },
  preview: { color: colors.textMuted, fontSize: 12.5, marginTop: 3, lineHeight: 17 },
  pending: { color: colors.goldDim, fontStyle: 'italic' },
});