import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { colors, radius, spacing } from '@/theme/colors';
import { useDatabase } from '@/hooks/use-database';
import { getUpdate, sectionVersionHistory, publishUpdate, type UpdateWithAct } from '@/db/repos/updates';
import type { SectionVersion } from '@/types';
import { SectionListEmpty } from '@/components/empty-state';
import { UpdateStatusBadge, UpdateKindBadge, UPDATE_KIND_LABEL } from '@/components/update-status';

export default function UpdateDetailScreen() {
  const db = useDatabase();
  const { updateId } = useLocalSearchParams<{ updateId: string }>();
  const [update, setUpdate] = useState<UpdateWithAct | null>(null);
  const [versions, setVersions] = useState<SectionVersion[]>([]);
  const [busy, setBusy] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUpdate(db, Number(updateId));
      if (!mounted || !u) return;
      setUpdate(u);
      if (u.ref_type === 'section' && u.act_id && u.section_number) {
        const sec = await db.getFirstAsync<{ id: number }>(
          `SELECT id FROM sections WHERE act_id = ? AND number = ?`,
          u.act_id,
          u.section_number,
        );
        if (sec) setVersions(await sectionVersionHistory(db, sec.id));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [db, updateId]);

  if (!update) return <SectionListEmpty title="Update not found" />;

  const canPublish = update.status === 'approved' && !busy && !published;

  const onPublish = async () => {
    setBusy(true);
    try {
      await publishUpdate(db, update.id);
      setPublished(true);
      const u = await getUpdate(db, update.id);
      if (u) setUpdate(u);
    } finally {
      setBusy(false);
    }
  };

  const openSource = async () => {
    if (update.official_url) await WebBrowser.openBrowserAsync(update.official_url);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Update' }} />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <View style={styles.headRow}>
          <UpdateKindBadge kind={update.update_kind} />
          <Text style={styles.actName}>{update.act?.short_title ?? 'Constitution / Bill'}</Text>
        </View>

        <Text style={styles.title}>{update.title}</Text>
        <UpdateStatusBadge status={update.status} />

        {!!update.summary && (
          <View style={styles.box}>
            <Text style={styles.boxText}>{update.summary}</Text>
          </View>
        )}

        <View style={styles.box}>
          {update.section_number ? (
            <Text style={styles.metaRow}>Provision: {UPDATE_KIND_LABEL[update.update_kind]} · § {update.section_number}</Text>
          ) : null}
          {update.gazette_id ? <Text style={styles.metaRow}>Gazette: {update.gazette_id}</Text> : null}
          <Text style={styles.metaRow}>Detected: {update.detected_at}</Text>
          {update.under_review_at ? <Text style={styles.metaRow}>Under review: {update.under_review_at}</Text> : null}
          {update.reviewed_at ? <Text style={styles.metaRow}>Reviewed: {update.reviewed_at}</Text> : null}
          {update.published_at ? <Text style={styles.metaRow}>Published: {update.published_at}</Text> : null}
          {update.reviewer_note ? <Text style={styles.metaRow}>Note: {update.reviewer_note}</Text> : null}
        </View>

        {update.official_url ? (
          <Pressable onPress={openSource} style={({ pressed }) => [styles.linkBtn, pressed && styles.pressed]}>
            <Text style={styles.linkText}>⧉ Open official source (e-Gazette / India Code)</Text>
          </Pressable>
        ) : null}

        {canPublish && (
          <Pressable onPress={onPublish} style={({ pressed }) => [styles.publishBtn, pressed && styles.pressed]}>
            <Text style={styles.publishText}>{busy ? 'Publishing…' : 'Approve & Publish'}</Text>
          </Pressable>
        )}
        {published && <Text style={styles.publishedNote}>This update is now published and the audit trail below reflects the change.</Text>}

        {versions.length > 0 && (
          <View style={styles.versions}>
            <Text style={styles.sectionTitle}>Version history</Text>
            {versions.map((v) => (
              <View key={v.id} style={styles.versionCard}>
                <Text style={styles.versionHead}>Version {v.version_no} · {v.effective_from ?? ''}</Text>
                <Text style={styles.versionLabel}>Before</Text>
                <Text style={styles.versionBody}>{v.old_body}</Text>
                <Text style={styles.versionLabel}>After</Text>
                <Text style={styles.versionBody}>{v.new_body}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footnote}>
          Per the update pipeline, statutory text is only shown after editorial review, with a
          visible audit trail (old text, new text, effective date, gazette reference).
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy950 },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  actName: { color: colors.gold, fontSize: 13, fontWeight: '700', flex: 1 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800', lineHeight: 27 },
  box: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  boxText: { color: colors.textSecondary, fontSize: 13.5, lineHeight: 20 },
  metaRow: { color: colors.textMuted, fontSize: 12.5, lineHeight: 18 },
  linkBtn: {
    backgroundColor: colors.infoBg,
    borderColor: colors.navy700,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  linkText: { color: colors.info, fontSize: 13.5, fontWeight: '700' },
  publishBtn: {
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  publishText: { color: colors.navy950, fontSize: 15, fontWeight: '800' },
  publishedNote: { color: colors.success, fontSize: 13, textAlign: 'center' },
  pressed: { opacity: 0.75 },
  versions: { gap: spacing.md },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  versionCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  versionHead: { color: colors.gold, fontSize: 12.5, fontWeight: '800' },
  versionLabel: { color: colors.textMuted, fontSize: 10.5, fontWeight: '700', marginTop: spacing.sm, letterSpacing: 0.5 },
  versionBody: { color: colors.textSecondary, fontSize: 13.5, lineHeight: 19, fontStyle: 'italic' },
  footnote: { color: colors.textMuted, fontSize: 11.5, lineHeight: 16, textAlign: 'center' },
});