import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { getArticle } from '@/db/repos/constitution';
import type { ArticleRow, PartRow } from '@/types';
import { BookmarkButton } from '@/components/bookmark-button';

export default function ArticleReaderScreen() {
  const db = useDatabase();
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  const [article, setArticle] = useState<ArticleRow | null>(null);
  const [part, setPart] = useState<PartRow | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const a = await getArticle(db, Number(articleId));
      if (!mounted) return;
      if (!a) return;
      setArticle(a);
      const p = await db.getFirstAsync<PartRow>(
        `SELECT * FROM parts WHERE id = ?`,
        a.part_id,
      );
      if (mounted) setPart(p);
    })();
    return () => {
      mounted = false;
    };
  }, [db, articleId]);

  if (!article) return null;
  const pending = article.body.startsWith('[Content pending');

  return (
    <>
      <Stack.Screen options={{ title: `Article ${article.number}` }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        {part && (
          <Pressable onPress={() => router.push(`/constitution/${part.id}`)} style={({ pressed }) => [styles.partLink, pressed && styles.pressed]}>
            <Text style={styles.partLinkText}>📜 {part.display_title} — {part.title}</Text>
          </Pressable>
        )}

        <View style={styles.heading}>
          <Text style={styles.articleNumber}>Article {article.number}</Text>
          <BookmarkButton db={db} itemType="article" itemId={article.id} size={30} />
        </View>
        {!!article.title && <Text style={styles.title}>{article.title}</Text>}

        <View style={styles.bodyBox}>
          <Text style={[styles.body, pending && styles.bodyPending]}>{article.body}</Text>
          {pending && (
            <View style={styles.pendingPill}>
              <Text style={styles.pendingText}>Content pending official India Code verification</Text>
            </View>
          )}
        </View>

        {!!article.summary && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryHeading}>📘 Plain-language note</Text>
            <Text style={styles.summaryText}>{article.summary}</Text>
          </View>
        )}

        <Text style={styles.disclaimer}>
          Informational reference only — not legal advice. The Constitution of
          India, as amended. Full official text verified against India Code before
          publication.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  partLink: {},
  partLinkText: { color: colors.gold, fontSize: 13, fontWeight: '600' },
  pressed: { opacity: 0.7 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  articleNumber: { color: colors.gold, fontSize: 26, fontWeight: '800' },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', lineHeight: 24 },
  bodyBox: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  body: { color: colors.text, fontSize: 15, lineHeight: 23 },
  bodyPending: { color: colors.textMuted, fontStyle: 'italic' },
  pendingPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.navy800,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pendingText: { color: colors.goldDim, fontSize: 11.5, fontWeight: '600' },
  summaryBox: {
    backgroundColor: colors.successBg,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryHeading: { color: colors.success, fontSize: 13, fontWeight: '700' },
  summaryText: { color: colors.success, fontSize: 13.5, lineHeight: 19 },
  disclaimer: { color: colors.textMuted, fontSize: 11.5, lineHeight: 16, textAlign: 'center' },
});