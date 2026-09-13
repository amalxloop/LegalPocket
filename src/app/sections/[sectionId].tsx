import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { getSection, getAct } from '@/db/repos/acts';
import { crossReferencesForSection } from '@/db/repos/compare';
import type { ActRow, SectionRow } from '@/types';
import { BookmarkButton } from '@/components/bookmark-button';
import { Badge } from '@/components/badge';

export default function SectionReaderScreen() {
  const db = useDatabase();
  const { sectionId } = useLocalSearchParams<{ sectionId: string }>();
  const [section, setSection] = useState<SectionRow | null>(null);
  const [act, setAct] = useState<ActRow | null>(null);
  const [crossRefs, setCrossRefs] = useState<Awaited<ReturnType<typeof crossReferencesForSection>>>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const id = Number(sectionId);
      const s = await getSection(db, id);
      if (!mounted) return;
      if (!s) return;
      setSection(s);
      const a = await getAct(db, s.act_id);
      if (mounted) setAct(a);
      const cross = await crossReferencesForSection(db, s.act_id, s.number);
      if (mounted) setCrossRefs(cross);
    })();
    return () => {
      mounted = false;
    };
  }, [db, sectionId]);

  if (!section) return null;

  return (
    <>
      <Stack.Screen options={{ title: `Section ${section.number}` }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        {act && (
          <Pressable onPress={() => router.push(`/acts/${act.id}`)} style={({ pressed }) => [styles.actLink, pressed && styles.pressed]}>
            <Text style={styles.actLinkText}>📚 {act.short_title}</Text>
            {!!section.last_amended && <Badge text={`amended ${section.last_amended}`} tone="info" />}
          </Pressable>
        )}

        <View style={styles.heading}>
          <Text style={styles.sectionNumber}>§ {section.number}</Text>
          <BookmarkButton db={db} itemType="section" itemId={section.id} size={30} />
        </View>
        {!!section.title && <Text style={styles.title}>{section.title}</Text>}

        <View style={styles.bodyBox}>
          <Text style={styles.body}>{section.body}</Text>
        </View>

        {crossRefs.length > 0 && (
          <View style={styles.crossBox}>
            <Text style={styles.crossHeading}>🔁 Related old-new comparison</Text>
            {crossRefs.map((c, i) => (
              <View key={i} style={styles.crossRow}>
                <Text style={styles.crossText}>
                  {c.isNew
                    ? `This section corresponds to ${c.setOldAct?.short_title ?? 'old law'} § ${c.mapping.old_section}`
                    : `Old law § ${c.mapping.old_section} now corresponds to ${c.setNewAct?.short_title ?? 'new law'}${c.mapping.new_section ? ` § ${c.mapping.new_section}` : ''}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {!!section.summary && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryHeading}>📘 Plain-language note</Text>
            <Text style={styles.summaryText}>{section.summary}</Text>
          </View>
        )}

        <Text style={styles.disclaimer}>
          Informational reference only — not legal advice. Full official text
          verified against India Code before publication.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  actLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  actLinkText: { color: colors.gold, fontSize: 13.5, fontWeight: '700', flex: 1 },
  pressed: { opacity: 0.7 },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionNumber: { color: colors.gold, fontSize: 28, fontWeight: '800' },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', lineHeight: 24 },
  bodyBox: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  body: { color: colors.text, fontSize: 15, lineHeight: 23 },
  crossBox: {
    backgroundColor: colors.infoBg,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  crossHeading: { color: colors.info, fontSize: 13, fontWeight: '700' },
  crossRow: {},
  crossText: { color: colors.info, fontSize: 13, lineHeight: 18 },
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